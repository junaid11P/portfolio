import os
import requests
import json
import base64
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from pymongo import MongoClient

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

# MongoDB Connection
MONGO_URI = os.getenv("MONGODB_URI")
client = None
db = None
resume_collection = None

try:
    if MONGO_URI:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        # Force connection check
        client.admin.command('ping')
        print("MongoDB Connected")
        db = client.get_database() # Uses default db in URI
        resume_collection = db["resume"]
    else:
        print("Warning: MONGODB_URI not found in .env")
except Exception as e:
    print(f"MongoDB Connection Error: {e}")

# Seed Data
# Load Knowledge Base from JSON
def load_knowledge_base():
    try:
        with open('data.json', 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading data.json: {e}")
        return []

INITIAL_KNOWLEDGE_BASE = load_knowledge_base()

def seed_database():
    if resume_collection is not None:
        try:
            # Check if we have data to seed
            if not INITIAL_KNOWLEDGE_BASE:
                print("No data to seed.")
                return

            # Optional: Clear existing data to ensure updates are applied
            # For a personal portfolio, this is usually strictly better than "only if empty"
            existing_count = resume_collection.count_documents({})
            if existing_count > 0:
                print(f"Clearing {existing_count} existing documents to update knowledge base...")
                resume_collection.delete_many({})
            
            resume_collection.insert_many(INITIAL_KNOWLEDGE_BASE)
            print("Database seeded/updated with data.json content.")
            
        except Exception as e:
            print(f"Seeding Error: {e}")

# Run seed on startup (if connected)
if client:
    seed_database()

# Models
class ChatRequest(BaseModel):
    message: str

# Helper: Find Best Match
def find_best_match(query: str):
    # In-Memory Search (Ultra Fast)
    if not INITIAL_KNOWLEDGE_BASE:
         return "I cannot access my memory right now (Knowledge Base Empty)."
    
    lower_query = query.lower()
    try:
        # Search directly in the loaded list
        scores = []
        for doc in INITIAL_KNOWLEDGE_BASE:
            score = 0
            # Keyword match
            for keyword in doc.get("keywords", []):
                if keyword in lower_query:
                    score += 1
            # Content match
            if lower_query in doc.get("content", "").lower():
                score += 0.5
            
            scores.append({"content": doc.get("content", ""), "score": score})
        
        scores.sort(key=lambda x: x["score"], reverse=True)
        
        if scores and scores[0]["score"] > 0:
            # RAG: Return the retrieval result directly
            return scores[0]["content"]
        return "I checked my database but couldn't find specific info on that. I can tell you about Juned's Experience, Projects, or Skills!"
    except Exception as e:
        print(f"RAG Error: {e}")
        return "I having trouble recalling that."

@app.post("/api/chat")
async def chat(request: ChatRequest):
    message = request.message
    
    # 1. Retrieval (Your Custom Model Logic)
    # The "model" is now your data.json content + this matching algorithm
    text = find_best_match(message)
    
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
