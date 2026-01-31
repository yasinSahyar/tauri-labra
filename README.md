# Tauri + React + Typescript

# FaceVote 👋🗳️

FaceVote is a desktop application built with **Tauri + Vite + React** that uses  
**MediaPipe Gesture Recognition** to detect hand gestures in real time via camera.

## 🚀 Features
- Hand gesture recognition
- Real-time camera input
- Lightweight and fast Tauri desktop app
- Modern frontend with Vite + React

## 🛠️ Tech Stack
- **Tauri**
- **Vite**
- **React**
- **MediaPipe Tasks Vision**
- **TypeScript**

## ▶️ How to Run

### 1️⃣ Install dependencies

npm install

2️⃣ Run in development mode
npm run tauri dev


The application will start and detect hand gestures using your camera.

📁 Project Structure (Overview)
src/
 ├─ hooks/
 │   └─ GestureHooks.ts
 └─ main.tsx
src-tauri/

⚠️ Notes

Camera permission is required

MediaPipe uses WebAssembly

First build may take a bit longer


## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
# tauri-labra-26
