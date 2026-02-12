import os
import pickle
import numpy as np
import read
from chunk import manual_chunk_text
from fastembed import TextEmbedding as FastEmbedEmbeddings

# Get the directory of the current script
base_dir = os.path.dirname(os.path.abspath(__file__))
vector_storage_path = os.path.join(base_dir, "vector_data.pkl")

# 1. Process Data (Chunking & Embedding)
print("Starting text chunking...")
chunks = manual_chunk_text(read.text, chunk_size=512, chunk_overlap=50)
print(f"Created {len(chunks)} chunks.")

print("Loading FastEmbed model...")
model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

print("Generating embeddings...")
embeddings = [e.tolist() for e in model.embed(chunks)]

# 2. Save Data Locally
print(f"Saving {len(chunks)} vectors to {vector_storage_path}...")
data = {
    "embeddings": np.array(embeddings, dtype=np.float32),
    "chunks": chunks
}

with open(vector_storage_path, "wb") as f:
    pickle.dump(data, f)

print("Ingestion complete. Data saved locally.")