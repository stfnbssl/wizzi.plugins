import os
from crewai import Crew, Agent, Task
from crewai_tools import PDFSearchTool, DOCXSearchTool
from openai import ChatCompletion
from utils import get_openai_api_key #, get_serper_api_key
openai_api_key = get_openai_api_key()
os.environ["OPENAI_MODEL_NAME"] = 'gpt-3.5-turbo'
# os.environ["SERPER_API_KEY"] = get_serper_api_key()

# Initialize the OpenAI GPT-4 model
openai_model = ChatCompletion(model="gpt-4")

# Define the PDF and DOCX Analyzer Agent
class PDF_DOCX_Analyzer_Agent(Agent):
    def setup(self):
        # self.pdf_tool = PDFSearchTool()
        self.docx1_tool = DOCXSearchTool()
        self.docx2_tool = DOCXSearchTool()

    def analyze_documents(self, docx1_path, docx2_path):
        # pdf_content = self.pdf_tool.extract_topics(pdf_path, keywords=['child obesity', 'treatments'])
        docx1_content = self.docx1_tool.extract_topics(docx1_path, keywords=['child obesity', 'treatments'])
        docx2_content = self.docx2_tool.extract_topics(docx2_path, keywords=['child obesity', 'treatments'])
        return docx1_content + docx2_content 

# Define the Parent Adaptation Agent
class Parent_Adaptation_Agent(Agent):
    def adapt_for_parents(self, topics):
        prompt = f"Adapt the following topics for parents: {topics}"
        response = openai_model.create(prompt=prompt)
        return response['choices'][0]['text']

# Define the Presentation Suggestion Agent
class Presentation_Suggestion_Agent(Agent):
    def suggest_presentation(self, topics):
        prompt = f"Suggest how a pediatrician can present these topics to parents: {topics}"
        response = openai_model.create(prompt=prompt)
        return response['choices'][0]['text']

# Create the Crew
crew = Crew()

# Add agents to the crew
crew.add_agent(PDF_DOCX_Analyzer_Agent(name="Analyzer"))
crew.add_agent(Parent_Adaptation_Agent(name="Adaptation"))
crew.add_agent(Presentation_Suggestion_Agent(name="Suggestion"))

# Define the task
class DocumentAnalysisTask(Task):
    def run(self, pdf_path, docx_path):
        # Step 1: Analyze documents
        topics = self.crew.get_agent("Analyzer").analyze_documents(pdf_path, docx_path)
        
        # Step 2: Adapt topics for parents
        adapted_topics = self.crew.get_agent("Adaptation").adapt_for_parents(topics)
        
        # Step 3: Suggest presentation methods
        presentation_suggestions = self.crew.get_agent("Suggestion").suggest_presentation(topics)
        
        return {
            "extracted_topics": topics,
            "adapted_topics": adapted_topics,
            "presentation_suggestions": presentation_suggestions
        }

# Add the task to the crew
crew.add_task(DocumentAnalysisTask(name="Analyze and Adapt"))

# Example usage
if __name__ == "__main__":
    docx1_path = "./Documenti/Caselli -COPIA schede management obesità x fasce d'età REVISIONE 1.docx"
    docx2_path = "./Documenti/Davoli - Integrazione a schede Menagment ob di Iaia- Azioni.docx"
    
    results = crew.run_task("Analyze and Adapt", docx1_path=docx1_path, docx2_path=docx2_path)
    print("Extracted Topics:", results["extracted_topics"])
    print("Adapted Topics for Parents:", results["adapted_topics"])
    print("Presentation Suggestions:", results["presentation_suggestions"])