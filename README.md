<div align="center">

# 💬 Reyaansh's Chat App

### Remastered Edition

**A modern, real-time chat application with a Material 3-inspired interface, dynamic theming, responsive layouts, and a lightweight Node.js backend.**

<br>

<a href="https://github.com/reyaansh72/Reyaansh-Chat-Remastered">
  <img src="https://img.shields.io/badge/Repository-Reyaansh--Chat--Remastered-5865F2?style=for-the-badge&logo=github&logoColor=white" alt="Repository">
</a>
<a href="https://github.com/reyaansh72/Reyaansh-Chat-Remastered/stargazers">
  <img src="https://img.shields.io/github/stars/reyaansh72/Reyaansh-Chat-Remastered?style=for-the-badge&logo=github&logoColor=white" alt="Stars">
</a>
<a href="https://github.com/reyaansh72/Reyaansh-Chat-Remastered/issues">
  <img src="https://img.shields.io/github/issues/reyaansh72/Reyaansh-Chat-Remastered?style=for-the-badge&logo=github&logoColor=white" alt="Issues">
</a>
<a href="https://github.com/reyaansh72/Reyaansh-Chat-Remastered/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/reyaansh72/Reyaansh-Chat-Remastered?style=for-the-badge" alt="License">
</a>

<br><br>

<img src="https://skillicons.dev/icons?i=html,css,js,nodejs,express,npm" alt="Technology Stack">

<br><br>

> 💬 **Fast. Expressive. Responsive. Real-time.**
>
> Built with web technologies and designed to feel like a modern native chat application.

</div>

---

## 📸 Preview

<div align="center">

<!-- Replace these with actual screenshots when available -->

|          🖥️ Desktop          |           📱 Mobile          |
| :---------------------------: | :--------------------------: |
| `Add desktop screenshot here` | `Add mobile screenshot here` |

</div>

---

# ✨ Features

Reyaansh's Chat App is designed around a simple idea:

> **Take the flexibility of the web and give it the feel of a modern messaging application.**

---

## 🎨 Material 3-Inspired UI

The interface follows the visual language of **Material Design 3 / Material You**, with expressive shapes, dynamic colors, elevated surfaces, and responsive components.

### 🌈 Dynamic Color Engine

Generate an application-wide color system from a seed color.

**Features include:**

* 🎨 Custom HEX color input
* 🖌️ Color picker
* 🌈 Dynamic tonal palette generation
* 🔵 Primary colors
* 🟣 Secondary colors
* 🟢 Tertiary colors
* ⚪ Surface colors
* 📦 Surface containers
* 🔴 Error colors
* 🔍 Live tonal inspection
* 📋 HEX value display

### 🎨 Built-in Presets

Quickly switch between predefined palettes:

| Palette         | Style              |
| --------------- | ------------------ |
| 🔵 Deep Indigo  | Cool blue / purple |
| 🟢 Teal Emerald | Teal / green       |
| 🌹 Rose Wood    | Warm red / pink    |
| 🟠 Terracotta   | Warm orange        |
| 🔷 Google Blue  | Classic blue       |
| 🫒 Olive Green  | Natural green      |

---

# 🌓 Theme System

The application supports multiple display modes.

| Mode       | Description                               |
| ---------- | ----------------------------------------- |
| ☀️ Light   | Bright Material-inspired interface        |
| 🌙 Dark    | Dark interface for low-light environments |
| 🖥️ System | Automatically follows the OS preference   |
| 🖤 AMOLED  | Uses true `#000000` backgrounds           |

The AMOLED theme is particularly useful on OLED displays where black pixels can be turned off.

---

# 💊 Expressive UI Geometry

The interface uses modern rounded components throughout the application.

* 💊 Pill-shaped buttons
* 🫧 Rounded inputs
* 💬 Modern message bubbles
* 🪟 Rounded containers
* 🎛️ Floating controls
* 📦 Material-style cards
* 🔘 Capsule controls

The goal is to make the interface feel expressive without requiring a large frontend framework.

---

# ⚡ Real-Time Messaging

Powered by **Socket.IO**, messages are delivered between connected clients in real time.

<div align="center">

<img src="https://skillicons.dev/icons?i=nodejs" width="70" alt="Node.js">
<img src="https://skillicons.dev/icons?i=express" width="70" alt="Express">

</div>

### 💬 Messaging Features

* ⚡ Instant message delivery
* 🔄 Real-time synchronization
* 👥 Multi-user conversations
* 🕐 Message timestamps
* 🔌 Automatic connection handling
* 🛡️ Duplicate connection protection
* 🔄 Persistent sessions

---

# ❤️ Message Reactions

React to messages using quick emoji reactions:

**👍 ❤️ 😂 😮 😢 🔥**

Reactions support both desktop and touch interactions.

### 🖱️ Desktop

Double-click a message.

### 📱 Mobile

Long-press a message.

---

# ↩️ Message Replies

Keep conversations organized by replying directly to individual messages.

A reply contains a visual reference to the original message so conversations remain easy to follow.

---

# ✏️ Message Editing

Made a typo?

Edit your own messages directly inside the conversation.

Edited messages display an:

```text
(edited)
```

indicator.

---

# 🗑️ Message Deletion

Users can delete their own messages through a Material-style confirmation dialog.

---

# 📌 Message Pinning

Important messages can be pinned for the entire chat room.

Pinned messages are tracked with a visible pinned-message counter.

Perfect for:

* 📢 Announcements
* 🔗 Important links
* 📋 Instructions
* 📅 Events
* ⭐ Important messages

---

# 🖼️ Image Sharing

Send images directly inside conversations.

### Supported behavior

* 🖼️ Image uploads
* ⚡ Instant client-side preview
* 📱 Mobile-friendly selection
* 💾 Up to **6 MB per image**

---

# 🔎 Instant Message Search

Search through available chat history using the built-in search overlay.

The search system operates in memory for fast interaction without requiring a separate search service.

---

# ✍️ Typing Indicators

See when another user is typing in real time.

Typing states automatically clean themselves up so stale indicators don't remain visible.

---

# 🟢 User Presence

The application supports live presence indicators.

| Status    | Meaning                      |
| --------- | ---------------------------- |
| 🟢 Online | User is active               |
| 🟡 Away   | User is temporarily inactive |
| 🔴 Busy   | User is unavailable          |

Presence updates happen in real time.

---

# 🔊 Audio Feedback

The application includes lightweight notification sounds generated directly through the browser.

Powered by:

<img src="https://skillicons.dev/icons?i=js" width="55" alt="JavaScript">

**Web Audio API**

No external audio files are required for the built-in send/receive chimes.

---

# 📱 Responsive Design

The application is designed to work across desktop and mobile devices.

## 🖥️ Desktop — `> 768px`

Desktop layouts provide:

* 📂 Docked `300px` sidebar
* 💬 Larger conversation area
* 📏 Balanced message widths
* 🖱️ Desktop-friendly interactions
* ⚡ Productivity-focused navigation

---

## 📱 Mobile — `≤ 768px`

Mobile layouts provide:

* 📱 Edge-to-edge conversations
* 📂 Slide-in navigation drawer
* 🌫️ Frosted backdrop
* 👆 Touch-friendly controls
* ⌨️ Keyboard-aware spacing
* 📐 Responsive message bubbles
* 🖐️ Touch gesture support

The same codebase adapts automatically.

---

# 🧩 Architecture

The application intentionally keeps its architecture lightweight.

```text
                         ┌─────────────────────┐
                         │      Web Browser    │
                         │                     │
                         │  HTML / CSS / JS    │
                         └──────────┬──────────┘
                                    │
                         HTTP + WebSocket
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Node.js       │
                         │                     │
                         │ Express + Socket.IO │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Local Data      │
                         │                     │
                         │    accounts.json    │
                         └─────────────────────┘
```

---

# 🛠️ Technology Stack

<div align="center">

### Frontend

<img src="https://skillicons.dev/icons?i=html,css,js" alt="Frontend technologies">

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,express" alt="Backend technologies">

### Development

<img src="https://skillicons.dev/icons?i=npm,git,github" alt="Development technologies">

</div>

---

## 🌐 Frontend

| Technology                                                               | Purpose                         |
| ------------------------------------------------------------------------ | ------------------------------- |
| <img src="https://cdn.simpleicons.org/html5" width="18"> HTML5           | Application structure           |
| <img src="https://cdn.simpleicons.org/css" width="18"> CSS3              | UI, themes & responsive layouts |
| <img src="https://cdn.simpleicons.org/javascript" width="18"> JavaScript | Application logic               |
| Web Audio API                                                            | Notification sounds             |

### No frontend framework required

This project intentionally uses:

* ❌ React
* ❌ Vue
* ❌ Angular
* ❌ Tailwind
* ❌ Large UI frameworks
* ❌ Required frontend build pipeline

Instead, it uses standard browser technologies.

---

## 🖥️ Backend

| Technology                                                           | Purpose                  |
| -------------------------------------------------------------------- | ------------------------ |
| <img src="https://cdn.simpleicons.org/nodedotjs" width="18"> Node.js | Runtime                  |
| <img src="https://cdn.simpleicons.org/express" width="18"> Express   | HTTP server              |
| Socket.IO                                                            | Real-time communication  |
| UUID                                                                 | Unique identifiers       |
| Node Crypto                                                          | Cryptographic operations |

---

# 📁 Project Structure

```text
Reyaansh-Chat-Remastered/
│
├── 📂 data/
│   └── 📄 accounts.json
│       └── File-based account storage
│
├── 📂 public/
│   ├── 📄 index.html
│   │   └── Main application
│   │
│   └── 📂 assets/
│       └── Static images and icons
│
├── 📄 server.js
│   └── Express + Socket.IO server
│
├── 📄 package.json
│   └── Dependencies and project metadata
│
└── 📄 README.md
    └── Project documentation
```

---

# 🚀 Quick Start

## 📋 Requirements

You need:

<img src="https://skillicons.dev/icons?i=nodejs,npm" alt="Node.js and npm">

* **Node.js 16+**
* **npm**

npm is included with Node.js.

---

## 1️⃣ Clone

```bash
git clone https://github.com/reyaansh72/Reyaansh-Chat-Remastered.git
cd Reyaansh-Chat-Remastered
```

---

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Start the server

```bash
npm start
```

Or:

```bash
node server.js
```

---

## 4️⃣ Open the application

Visit:

```text
http://localhost:3000
```

🎉 **You're ready to chat.**

---

# 🔐 Accounts & Data

The current application uses a lightweight file-based account system.

Account information is stored in:

```text
data/accounts.json
```

Passwords are handled using cryptographic hashing rather than plain-text storage.

### ⚠️ Production deployment

This project is currently designed primarily for development and self-hosting.

For a public production deployment, consider adding:

* 🔒 HTTPS
* 🗄️ A production database
* 🚦 Rate limiting
* 🛡️ Stronger authentication
* 🔍 Input validation
* 🧹 Security headers
* 🔐 Secure session management
* 📊 Monitoring and logging
* 💾 Automated backups

---

# 🧪 Development

Start the development server:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

Frontend changes can generally be tested by refreshing the browser.

---

# 🗺️ Roadmap

The project can continue evolving into a more complete messaging platform.

### 💬 Messaging

* [ ] Direct messages
* [ ] Multiple chat rooms
* [ ] Message forwarding
* [ ] Better message threading
* [ ] Voice messages
* [ ] File attachments

### 👤 Profiles

* [ ] User avatars
* [ ] User profiles
* [ ] Custom status messages
* [ ] Profile customization

### 🔔 Notifications

* [ ] Browser notifications
* [ ] Push notifications
* [ ] Notification preferences
* [ ] Per-room notification settings

### 🛡️ Administration

* [ ] Moderation tools
* [ ] User management
* [ ] Room administration
* [ ] Reporting system
* [ ] Permission system

### 📱 Platform

* [ ] PWA support
* [ ] Offline support
* [ ] Android WebView wrapper
* [ ] Optional desktop application
* [ ] Improved accessibility

### 🗄️ Backend

* [ ] Database-backed messages
* [ ] Better session management
* [ ] Horizontal scaling
* [ ] Redis/socket scaling
* [ ] Production deployment tooling

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

```bash
git clone https://github.com/reyaansh72/Reyaansh-Chat-Remastered.git

cd Reyaansh-Chat-Remastered

npm install

npm start
```

Then:

1. Create a branch
2. Make your changes
3. Test the application
4. Commit your changes
5. Open a Pull Request

Bug reports and feature suggestions are also welcome through GitHub Issues.

---

# ⭐ Support the Project

If you find the project interesting, you can support it by:

⭐ Starring the repository
🐛 Reporting bugs
💡 Suggesting features
🔧 Contributing code
📖 Improving documentation

<a href="https://github.com/reyaansh72/Reyaansh-Chat-Remastered">
  <img src="https://img.shields.io/badge/⭐%20Star%20the%20Repository-5865F2?style=for-the-badge&logo=github&logoColor=white" alt="Star repository">
</a>

---

# 📜 License

This project is released under the **MIT License**.

---

<div align="center">

## 💬 Reyaansh's Chat App

### Remastered Edition

**Built with ❤️ using HTML, CSS, JavaScript, Node.js & Socket.IO**

<br>

<img src="https://skillicons.dev/icons?i=html,css,js,nodejs,express,socketio,github" alt="Project technologies">

<br><br>

**Simple stack. Modern UI. Real-time communication.**

<br>

© Reyaansh — MIT License

</div>
