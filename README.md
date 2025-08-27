# 🚀 CodeHelper

> A fullstack collaborative coding platform for real-time code editing, sharing, and execution. Built with React, Vite, Tailwind CSS (frontend) and Express, Node.js, MongoDB, Yjs (backend).

---

## ✨ Features
- 📝 Real-time collaborative code editor (Yjs + y-webrtc)
- 🌐 Multi-language support: JavaScript, Python, Go, C, C++, Java, Rust
- 🏠 Room-based collaboration: create, join, share, and delete rooms
- 🔒 User authentication (JWT, cookies)
- 🛡️ Permission management for room access
- ⚡ Code execution via OneCompiler API
- 🔐 HTTPS support for secure communication
- ⚙️ Modular environment configuration via `.env`

---

## 🛠️ Tech Stack
- **Frontend:** React ⚛️, Vite ⚡, Tailwind CSS 💨, CodeMirror 🖊️, Yjs 🔗, y-webrtc 🌍
- **Backend:** Express 🚂, Node.js 🟩, MongoDB 🍃, Yjs 🔗
- **Signaling Server:** y-webrtc 🌍

---

## 🏁 Setup
### 📦 Prerequisites
- Node.js & npm 🟩
- MongoDB 🍃

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rafool05/codeHelper.git
cd codeHelper
```

### 2️⃣ Install dependencies
```bash
cd codeHelper-frontend
npm install
cd ../codehelper-backend
npm install
```

### 3️⃣ Environment variables
- Copy `.env.example` to `.env` in both frontend and backend folders
- Edit host, port, URLs, and credentials as needed

### 5️⃣ Start servers
```bash
# In codehelper-backend
npm run dev
# In codeHelper-frontend
npm run dev
# In codeHelper-frontend, separate terminal
npm run socket
```

---

## 🎮 Usage
- 👤 Sign up or sign in
- 🏠 Create or join a room
- 🤝 Collaborate in real time
- 🏃‍♂️ Run code in supported languages
- 🛡️ Manage room permissions and share room ID

---

## 💡 Use Cases
- 👨‍💻 **Pair Programming:** Collaborate with a partner in real time to solve coding problems or build projects together.
- 🏫 **Teaching & Learning:** Instructors can create rooms for students to follow along, share code, and get instant feedback.
- 🧑‍🔬 **Interview Practice:** Simulate technical interviews with collaborative coding and code execution.
- 🛠️ **Project Prototyping:** Quickly prototype and test code with teammates before integrating into larger projects.
- 🌍 **Remote Teamwork:** Work with distributed teams on code, share ideas, and manage permissions for secure collaboration.
- 📝 **Code Review:** Share code with peers for review, suggestions, and improvements in a live environment.

---

## 📁 Folder Structure
```
codeHelper/
├── codeHelper-frontend/
│   └── src/
│       └── components/
│       └── utils/
│       └── ui/
├── codehelper-backend/
│   └── src/
│       └── db/
│       └── middleware/
│       └── validation/
```

---

## 📜 License
MIT

---
For questions or contributions, open an issue or pull request on GitHub! 💬

---

## 🎬 Demo
[Watch the demo video here!](https://drive.google.com/file/d/1UBzKHSNfq4PgXYQXZSdwLfKODSRfsAm_/view?usp=sharing)
