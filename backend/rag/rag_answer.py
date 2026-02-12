import os
import sys
import google.generativeai as genai
from dotenv import load_dotenv

# Add current directory to path for imports
base_dir = os.path.dirname(os.path.abspath(__file__))
if base_dir not in sys.path:
    sys.path.append(base_dir)

from milvus_search import search

# Load environment variables
load_dotenv()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def generate_rag_answer(question):
    print(f"Searching local vectors for: {question}...")
    results = search(question, top_k=3)
    
    if not results:
        return "I couldn't find any relevant information in my database."

    # Extract context
    context = "\n\n".join([hit["text"] for hit in results])
    
    # Create the prompt for Gemini
    prompt = f"""
    You are an AI assistant helping with a query about Juned's portfolio and experience. 
    Use the Context provided below to answer the Question accurately. 
    If the answer is not in the context, say "I don't have that information in my database."
    Keep the answer concise and professional.

    Context:
    {context}

    Question: {question}
    """

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error using Gemini: {str(e)}"

if __name__ == "__main__":
    print("Portfolio AI Assistant (Local RAG)")
    while True:
        user_q = input("\nAsk a question: ")
        if user_q.lower() in ['exit', 'quit', 'q']:
            break
        print("\n--- AI ANSWER ---")
        print(generate_rag_answer(user_q))
