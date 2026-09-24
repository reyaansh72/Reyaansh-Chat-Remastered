const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 6e6, // 6 MB max buffer size for socket uploads
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ACCOUNTS_FILE = path.join(DATA_DIR, 'accounts.json');

// Initialize Data Directory and Accounts File
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(ACCOUNTS_FILE)) {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify({}), 'utf8');
}

function getAccounts() {
  try {
    return JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
  } catch (err) {
    return {};
  }
}

function saveAccounts(accounts) {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), 'utf8');
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

app.use(express.json());
app.use(express.static('public'));

// --- HTTP API ROUTES ---

app.post('/api/register', (req, res) => {
  const { username, password, profileIcon, avatarColor } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return res.status(400).json({ error: 'Invalid username format' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }

  const accounts = getAccounts();
  if (accounts[username]) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  accounts[username] = {
    passwordHash: hashPassword(password),
    profileIcon: profileIcon || 'person',
    avatarColor: avatarColor || '#6750A4',
    createdAt: new Date().toISOString()
  };
  saveAccounts(accounts);
  res.status(201).json({ success: true, avatarColor: accounts[username].avatarColor });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const accounts = getAccounts();
  const user = accounts[username];
  
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.status(200).json({ 
    username, 
    profileIcon: user.profileIcon || 'person',
    avatarColor: user.avatarColor || '#6750A4'
  });
});

app.get('/api/check-user/:username', (req, res) => {
  const accounts = getAccounts();
  res.json({ exists: !!accounts[req.params.username] });
});

// --- IN-MEMORY STATE ---

const connectedUsers = new Map(); // socket.id -> { username, profileIcon, avatarColor, status }
let messages = []; // Array of message objects
const typingUsers = new Set();
const typingTimeouts = new Map();

function getUniqueUsers() {
  const userMap = new Map();
  for (const user of connectedUsers.values()) {
    if (user && user.username) {
      const key = user.username.toLowerCase();
      if (!userMap.has(key)) {
        userMap.set(key, {
          username: user.username,
          profileIcon: user.profileIcon || 'person',
          avatarColor: user.avatarColor || '#6750A4',
          status: user.status || 'online'
        });
      }
    }
  }
  return Array.from(userMap.values());
}

// --- SOCKET.IO HANDLERS ---

io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] New connection: ${socket.id}`);
  
  // Send chat history on connect
  socket.emit('messages:history', messages);

  socket.on('user:join', (userData) => {
    const { username, profileIcon, avatarColor } = userData;
    if (!username) return;

    // Disconnect and remove any stale/prior socket for this same user
    for (const [sId, existingUser] of connectedUsers.entries()) {
      if (existingUser.username.toLowerCase() === username.toLowerCase() && sId !== socket.id) {
        connectedUsers.delete(sId);
        const oldSock = io.sockets.sockets.get(sId);
        if (oldSock) oldSock.disconnect(true);
      }
    }

    const wasAlreadyOnline = Array.from(connectedUsers.values()).some(
      u => u.username.toLowerCase() === username.toLowerCase()
    );

    const user = { username, profileIcon, avatarColor, status: 'online' };
    connectedUsers.set(socket.id, user);
    
    // Broadcast deduplicated users list to all clients
    io.emit('users:update', getUniqueUsers());
    
    if (!wasAlreadyOnline) {
      socket.broadcast.emit('user:joined', username);
    }
    console.log(`[${new Date().toISOString()}] User joined: ${username} (${socket.id})`);
  });

  socket.on('user:status', ({ status }) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.status = status;
      for (const u of connectedUsers.values()) {
        if (u.username.toLowerCase() === user.username.toLowerCase()) {
          u.status = status;
        }
      }
      io.emit('users:update', getUniqueUsers());
    }
  });

  socket.on('message:send', ({ text, replyTo }) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    let replyData = null;
    if (replyTo) {
      const origMsg = messages.find(m => m.id === replyTo);
      if (origMsg) {
        replyData = {
          id: origMsg.id,
          text: origMsg.text ? origMsg.text.substring(0, 50) : '...',
          sender: origMsg.sender
        };
      }
    }

    const newMessage = {
      id: uuidv4(),
      type: 'text',
      text,
      sender: user.username,
      senderColor: user.avatarColor,
      senderIcon: user.profileIcon,
      timestamp: new Date().toISOString(),
      reactions: {},
      edited: false,
      pinned: false,
      replyTo: replyData
    };

    messages.push(newMessage);
    if (messages.length > 200) {
      messages.shift();
    }

    io.emit('message:new', newMessage);
  });

  socket.on('message:image', ({ dataUrl, caption }) => {
    const user = connectedUsers.get(socket.id);
    if (!user || !dataUrl.startsWith('data:image/')) return;

    const newMessage = {
      id: uuidv4(),
      type: 'image',
      imageUrl: dataUrl,
      text: caption || '',
      sender: user.username,
      senderColor: user.avatarColor,
      senderIcon: user.profileIcon,
      timestamp: new Date().toISOString(),
      reactions: {},
      edited: false,
      pinned: false,
      replyTo: null
    };

    messages.push(newMessage);
    if (messages.length > 200) {
      messages.shift();
    }

    io.emit('message:new', newMessage);
  });

  socket.on('message:delete', ({ messageId }) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    const msgIndex = messages.findIndex(m => m.id === messageId);
    if (msgIndex !== -1 && messages[msgIndex].sender === user.username) {
      messages.splice(msgIndex, 1);
      io.emit('message:deleted', { messageId });
    }
  });

  socket.on('message:edit', ({ messageId, newText }) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    const msg = messages.find(m => m.id === messageId);
    if (msg && msg.sender === user.username) {
      msg.text = newText;
      msg.edited = true;
      io.emit('message:edited', { messageId, newText, edited: true });
    }
  });

  socket.on('message:react', ({ messageId, emoji }) => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    const msg = messages.find(m => m.id === messageId);
    if (msg) {
      if (!msg.reactions[emoji]) {
        msg.reactions[emoji] = [];
      }
      
      const userIndex = msg.reactions[emoji].indexOf(user.username);
      if (userIndex > -1) {
        msg.reactions[emoji].splice(userIndex, 1);
        if (msg.reactions[emoji].length === 0) {
          delete msg.reactions[emoji];
        }
      } else {
        msg.reactions[emoji].push(user.username);
      }
      
      io.emit('message:reaction', { messageId, reactions: msg.reactions });
    }
  });

  socket.on('message:pin', ({ messageId }) => {
    const msg = messages.find(m => m.id === messageId);
    if (msg) {
      msg.pinned = !msg.pinned;
      io.emit('message:pinned', { messageId, pinned: msg.pinned });
    }
  });

  socket.on('messages:search', ({ query }) => {
    if (!query) return;
    const lowerQuery = query.toLowerCase();
    const results = messages.filter(m => 
      m.text && m.text.toLowerCase().includes(lowerQuery)
    ).slice(-20);
    socket.emit('messages:search:results', results);
  });

  socket.on('messages:clear', () => {
    messages = [];
    io.emit('messages:cleared');
  });

  socket.on('typing:start', () => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    typingUsers.add(user.username);
    io.emit('typing:update', Array.from(typingUsers));

    if (typingTimeouts.has(user.username)) {
      clearTimeout(typingTimeouts.get(user.username));
    }
    
    const timeout = setTimeout(() => {
      typingUsers.delete(user.username);
      typingTimeouts.delete(user.username);
      io.emit('typing:update', Array.from(typingUsers));
    }, 3000);
    
    typingTimeouts.set(user.username, timeout);
  });

  socket.on('typing:stop', () => {
    const user = connectedUsers.get(socket.id);
    if (!user) return;

    typingUsers.delete(user.username);
    if (typingTimeouts.has(user.username)) {
      clearTimeout(typingTimeouts.get(user.username));
      typingTimeouts.delete(user.username);
    }
    io.emit('typing:update', Array.from(typingUsers));
  });

  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      connectedUsers.delete(socket.id);
      
      const isStillOnline = Array.from(connectedUsers.values()).some(
        u => u.username.toLowerCase() === user.username.toLowerCase()
      );

      if (!isStillOnline) {
        typingUsers.delete(user.username);
        if (typingTimeouts.has(user.username)) {
          clearTimeout(typingTimeouts.get(user.username));
          typingTimeouts.delete(user.username);
        }
        io.emit('typing:update', Array.from(typingUsers));
        io.emit('user:left', user.username);
      }
      
      io.emit('users:update', getUniqueUsers());
      console.log(`[${new Date().toISOString()}] Disconnected: ${socket.id} (${user.username})`);
    }
  });
});

server.listen(PORT, () => {
  console.log('====================================');
  console.log(`🚀 Chat Server running on port ${PORT} 🚀`);
  console.log('====================================');
});
