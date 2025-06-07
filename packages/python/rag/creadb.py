from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader

# Caricare i documenti
documents = TextLoader("mydocs.txt").load()
embeddings = OpenAIEmbeddings()
db = Chroma.from_documents(documents, embeddings)
