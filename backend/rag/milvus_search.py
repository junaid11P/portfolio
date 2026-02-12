import os
import pickle
import numpy as np
from fastembed import TextEmbedding as FastEmbedEmbeddings

# Get the directory of the current script
base_dir = os.path.dirname(os.path.abspath(__file__))
vector_storage_path = os.path.join(base_dir, "vector_data.pkl")

# Load model for query embedding
model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2.T)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2, axis=1)
    return dot_product / (norm_v1 * norm_v2)

def search(query, top_k=3):
    if not os.path.exists(vector_storage_path):
        print(f"Error: {vector_storage_path} not found. Please run ingest_data.py first.")
        return []

    with open(vector_storage_path, "rb") as f:
        data = pickle.load(f)
    
    embeddings = data["embeddings"]
    chunks = data["chunks"]

    # Embed query
    query_embedding = list(model.embed([query]))[0]
    
    # Calculate similarities
    similarities = cosine_similarity(query_embedding, embeddings)
    
    # Get top_k indices
    top_indices = np.argsort(similarities)[::-1][:top_k]
    
    results = []
    for idx in top_indices:
        # Mimic Milvus result structure for compatibility
        results.append({
            "score": float(similarities[idx]),
            "text": chunks[idx]
        })
    
    return results

if __name__ == "__main__":
    q = input("Enter query to search locally: ")
    results = search(q)
    print("\n--- Local Search Results ---")
    for hit in results:
        print(f"Score: {hit['score']:.4f}")
        print(f"Content: {hit['text']}")
        print("-" * 20)
