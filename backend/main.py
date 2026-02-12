import os
import requests
import json
import base64
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from pymongo import MongoClient
import google.generativeai as genai
from rag.rag_answer import generate_rag_answer

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    message = request.message
    
    # Use the RAG pipeline for all queries
    print(f"Using RAG pipeline for query: {message}")
    text = generate_rag_answer(message)
    
    try:
        # 2. Generate Audio (TTS)
        audio_base64 = None
        try:
            tts_url = "https://tiktok-tts.weilnet.workers.dev/api/generation"
            r = requests.post(tts_url, json={
                "text": text,
                "voice": "en_us_006"
            })
            
            if r.status_code == 200:
                data = r.json()
                # API returns base64 content in data['data']
                raw_audio = data.get("data")
                if raw_audio:
                    audio_base64 = f"data:audio/mp3;base64,{raw_audio}"
        except Exception as e:
            print(f"TTS Error: {e}")
            
        return {"text": text, "audio": audio_base64}
        
    except Exception as e:
        print(f"Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "FastAPI Backend Running"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5001))
    uvicorn.run(app, host="0.0.0.0", port=port)
