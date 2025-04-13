# 🧠 MindFree.AI — Frontend

MindFree.AI is a secure AI-powered mental wellness platform. This is the frontend built with **Next.js**, offering a smooth and responsive UI for users to:

- Detect and log emotions via webcam (with face-api.js)
- View emotion trends and analytics
- Receive therapeutic chat support via GPT-3.5
- Get personalized meditation music from Gemini
- View their blockchain-anchored logs from the Midnight network

---

## 🚀 Getting Started

### 🧾 Prerequisites

- Node.js `>=18.x`
- npm or yarn
- MongoDB Atlas backend (shared with FastAPI + Node.js)
- FastAPI server running on `http://localhost:8000`
- Node.js blockchain anchor server on `http://localhost:6300`

### 📦 Install Dependencies

```bash
npm install
# or
yarn install

### ▶️ Run the Development Server
```bash
npm run dev
# or
yarn dev


Visit: http://localhost:3000

🧠 Backend Services
| Service              | URL                    | Description                                           |
|----------------------|------------------------|-------------------------------------------------------|
| **FastAPI Server**   | http://localhost:8000  | Handles emotion detection, chat AI, and meditation AI |
| **Node.js Server**   | http://localhost:6300  | Anchors emotion hashes to Midnight blockchain         |
| **Midnight Node**    | http://localhost:9999  | zk Devnet Node (runs via Docker)                      |
| **Next.js Frontend** | http://localhost:3000  | UI to interact with emotion detection and anchoring   |


📦 NPM Packages Used
| Package Name                | Purpose                                                                 |
|----------------------------|-------------------------------------------------------------------------|
| express                    | Web framework for building Node.js servers                              |
| cors                       | Enables Cross-Origin Resource Sharing                                   |
| dotenv                     | Loads environment variables from `.env` files                           |
| mongodb                    | MongoDB driver for interacting with Atlas database                      |
| @midnight-ntwrk/wallet     | Midnight SDK to generate wallets and manage blockchain interactions     |
| @midnight-ntwrk/zswap      | Handles network ID and other Midnight-related blockchain configs         |
| @midnight-ntwrk/wallet-sdk-hd | Generates secure HD wallet seed phrases                             |
| node-fetch (or axios)      | Makes HTTP requests between servers                                     |
| chart.js                   | Used in frontend to visualize emotion trends                            |
| react-chartjs-2            | React wrapper for Chart.js                                              |
| next                       | React framework for frontend                                            |
| react                      | JavaScript library for building user interfaces                         |
| tailwindcss                | Utility-first CSS framework for custom styling                          |
| framer-motion              | Smooth UI animations for components                                     |
| lucide-react               | Icon set used in UI                                                      |
