import os
from dotenv import load_dotenv, find_dotenv

# these expect to find a .env file at the directory above the lesson.
# the format for that file is (without the comment)
# API_KEYNAME=AStringThatIsTheLongAPIKeyFromSomeService

def load_env():
    _ = load_dotenv(find_dotenv())

def get_openai_api_key():
    load_env()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    print("openai_api_key:", openai_api_key)
    return openai_api_key

def load_documents_from_directory(directory):
    documents = []
    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as f:
                documents.append(f.read())
                print("loaded", filename)
    return documents

# Esempio
directory = "./documenti"
document = None
if True:
    documents = load_documents_from_directory(directory)
else:
    documents = [
        "La capitale dell'Italia è Roma.",
        "Il Colosseo è un antico anfiteatro romano.",
        "La pizza è originaria di Napoli.",
        # Aggiungi altri documenti qui
    ]
from sentence_transformers import SentenceTransformer
import numpy as np

# Carica il modello per gli embedding
model = SentenceTransformer('all-MiniLM-L6-v2')

# Crea gli embedding per i documenti
document_embeddings = model.encode(documents, convert_to_tensor=False)
document_embeddings = np.array(document_embeddings)

import faiss

# Crea un indice FAISS
dimension = document_embeddings.shape[1]  # Dimensione degli embedding
index = faiss.IndexFlatL2(dimension)  # Usa la distanza L2 (euclidea)
index.add(document_embeddings)  # Aggiungi gli embedding all'indice

from openai import OpenAI

# Inizializza il client OpenAI
client = OpenAI(api_key=get_openai_api_key())

def query_chatgpt(prompt, model="gpt-4o-mini"):
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "Sei un assistente utile e accurato."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.7
    )
    return response.choices[0].message.content.strip()

def rag_query(query, k=2):
    # Crea l'embedding della query
    query_embedding = model.encode([query], convert_to_tensor=False)
    query_embedding = np.array(query_embedding)

    # Cerca i k documenti più simili
    distances, indices = index.search(query_embedding, k)
    relevant_docs = [documents[idx] for idx in indices[0]]

    # Costruisci il prompt per ChatGPT
    context = "\n".join(relevant_docs)
    prompt = f"""
    Basandoti sul seguente contesto, rispondi alla domanda in modo chiaro e preciso:
    
    **Contesto**:
    {context}
    
    **Domanda**:
    {query}
    """

    # Interroga ChatGPT
    response = query_chatgpt(prompt)
    return response, relevant_docs

query = "Genera in formato ITTF con schema JSON un elenco di 5 città italiane con 3 luoghi da visitare ciascuna"
response, retrieved_docs = rag_query(query)

print("Domanda:", query)
print("Documenti recuperati:", retrieved_docs)
print("Risposta:", response)