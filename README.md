# 3D AI Portfolio

An immersive 3D Portfolio website featuring an interactive 3D Avatar, AI-powered Chat (Local RAG + Gemini 2.5), and Voice interaction.

## 🚀 Key Features
- **3D Interactive Avatar**: Immersive experience built with Three.js.
- **Local RAG Pipeline**: Lightning-fast document retrieval using `FastEmbed` and local vector storage (no Docker/Milvus required).
- **Gemini 2.5 Flash**: State-of-the-art AI for intelligent, context-aware responses.
- **Voice Interaction**: Integrated Text-to-Speech (TTS) for a human-like assistant feel.
- **Deployment Ready**: Optimized to run on low-resource environments (under 512MB RAM).

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Three.js** / **React Three Fiber** (3D Rendering)
- **TailwindCSS** (Styling)

### Backend
- **FastAPI** (Python)
- **Google Gemini 2.5 Flash** (AI Model)
- **FastEmbed** (Vector Embeddings)
- **NumPy** (Local Vector Search)
- **TikTok TTS** (Text to Speech)

## 🏁 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+
- Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/))

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/junaid11P/portfolio.git
   cd portfolio
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Environment Setup:**
   - In the `backend/` folder, copy `.env.example` to `.env`.
   - Add your API key:
     ```env
     GEMINI_API_KEY=your_actual_key_here
     ```

4. **Prepare Vector Data (Ingestion):**
   - Run the ingestion script to process your resume/data into local vector storage:
     ```bash
     cd rag
     python ingest_data.py
     cd ..
     ```

5. **Run Backend:**
   ```bash
   python main.py
   ```

6. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## ☁️ Deployment for Render

This project is optimized for [Render](https://render.com) using the `render.yaml` blueprint.

1. Push your code to GitHub (ensure `.env` and `.pkl` files are ignored).
2. Create a "New Blueprint Instance" on Render.
3. Select this repository.
4. **Environment Variables**: Add `GEMINI_API_KEY` in the Render dashboard for the backend service.
5. **Memory Management**: The system is designed to run within Render's free tier (512MB RAM).

## 📄 License
MIT
