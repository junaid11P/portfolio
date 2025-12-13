# 3D AI Portfolio

An immersive 3D Portfolio website featuring an interactive 3D Avatar, AI-powered Chat (RAG + Gemini), and Voice interaction.

## Tech Stack

### Frontend
- **React** (Vite)
- **Three.js** / **React Three Fiber** (3D Rendering)
- **TailwindCSS** (Styling)

### Backend
- **FastAPI** (Python)
- **MongoDB** (Database / Knowledge Base)
- **Google Gemini** (AI Model)
- **TikTok TTS** (Text to Speech)

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+
- MongoDB Atlas Account
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/junaid11P/portfolio.git
   cd portfolio
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Create .env file
   # Add: MONGODB_URI=... and GEMINI_API_KEY=...
   
   python main.py
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment for Render

This project includes a `render.yaml` blueprint for easy deployment.

1. Push code to GitHub.
2. Log in to [Render](https://render.com).
3. Click "New +" -> "Blueprint".
4. Select this repository.
5. Accept the default configuration.
6. **Important:** Go to the **Backend Service** dashboard on Render and add your Environment Variables (`MONGODB_URI`, `GEMINI_API_KEY`).

## License
MIT
