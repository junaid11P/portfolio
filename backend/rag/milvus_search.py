import os
import pickle
import numpy as np
from fastembed import TextEmbedding as FastEmbedEmbeddings

# Get the directory of the current script
base_dir = os.path.dirname(os.path.abspath(__file__))
vector_storage_path = os.path.join(base_dir, "vector_data.pkl")

# Load model once at module level
model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2", threads=1)

# Cache vector data in memory at startup
cached_data = None
if os.path.exists(vector_storage_path):
    try:
        with open(vector_storage_path, "rb") as f:
            cached_data = pickle.load(f)
        print(f"Loaded {len(cached_data['chunks'])} vectors into memory.")
    except Exception as e:
        print(f"Error loading cache: {e}")

def cosine_similarity(query_vec, doc_vecs):
    # vectorized cosine similarity using numpy
    dot_product = np.dot(doc_vecs, query_vec)
    norm_query = np.linalg.norm(query_vec)
    norm_docs = np.linalg.norm(doc_vecs, axis=1)
    return dot_product / (norm_query * norm_docs)

def search(query, top_k=3):
    global cached_data
    
    if not cached_data:
        # Final fallback if not loaded at startup
        if os.path.exists(vector_storage_path):
             with open(vector_storage_path, "rb") as f:
                cached_data = pickle.load(f)
        else:
            print("Error: Vector storage not found.")
            return []

    embeddings = cached_data["embeddings"]
    chunks = cached_data["chunks"]

    # Embed query (fastembed is fast)
    query_embedding = list(model.embed([query]))[0]
    
    # Calculate similarities efficiently
    similarities = cosine_similarity(query_embedding, embeddings)
    
    # Get top_k indices
    top_indices = np.argsort(similarities)[::-1][:top_k]
    
    return [{"score": float(similarities[idx]), "text": chunks[idx]} for idx in top_indices]

if __name__ == "__main__":
    q = input("Enter query to search locally: ")
    results = search(q)
    print("\n--- Local Search Results ---")
    for hit in results:
        print(f"Score: {hit['score']:.4f}")
        print(f"Content: {hit['text']}")
        print("-" * 20)
