# Warning control
import warnings
warnings.filterwarnings('ignore')
#
from crewai import Agent, Task, Crew
from crewai_tools import PDFSearchTool, DOCXSearchTool
#
from pydantic import BaseModel
#
import os
from utils import get_openai_api_key
openai_api_key = get_openai_api_key()
# os.environ["OPENAI_MODEL_NAME"] = 'gpt-4o'
os.environ["OPENAI_MODEL_NAME"] = 'gpt-3.5-turbo'
#
docx1_path = "C:/My/3dparty/python/Anna/Obesi/IAIA/Documenti/Caselli.docx"
docx2_path = "C:/My/3dparty/python/Anna/Obesi/IAIA/Documenti/Davoli.docx"
#
toolDocx1 = DOCXSearchTool(docx=docx1_path, search_query="*")
toolDocx2 = DOCXSearchTool(docx=docx2_path, search_query="*")
#
extractor = Agent(
    role="Estrattore dei contenuti",
    goal="Estrarre e classificare contenuti riguardanti l'obesità infantile",
    backstory="Stai lavorando ad un progetto di produzione di schede informative "
              "per il management dell'obesità infantile per fasce di età."
              "Vari specialisti hanno prodotto schede per i pediatri in vari documenti. "
              "Dovranno essere prodotte schede anche per i genitori, usando un linguaggio più semplice."
              "Dovranno inoltre essere fornite istruzioni ai pediatri su come presentare ai genitori le schede loro rivolte. "
              "Il tuo lavoro è estrarre dai documenti prodotti dagli specialisti i vari consigli per i pediatri "
              "classificandoli per argomento e fascia d'età, "
              "questi saranno poi passati al Mediatore dei contenuti genitoriali per adattarli all'uso da parte dei genitori.",
    tools = [toolDocx1, toolDocx2],
    allow_delegation=False,
	verbose=True
)
#
adapterForParents = Agent(
    role="Mediatore dei contenuti genitoriali",
    goal="Adattare contenuti specialistici pediatrici all'uso da parte di genitori di cultura medio bassa",
    backstory="Comunicare ai genitori consigli riguardanti l'obesità del loro figlio è compito molto delicato. "
              "Va evitato un linguaggio troppo specialistico ma occorre anche prestare attenzione a non "
              "urtare la loro suscettibilità e a non rinforzare lo stigma che questa patologia rischia di portare con se "
              "aggravando al contempo il quadro psicologico e la patologia."
              "Gli item estratti dall'Estrattore di contenuti dovranno essere riformulati con queste avvertenze. ",
    tools = [toolDocx1, toolDocx2],
    allow_delegation=False,
	verbose=True
)

# Define a Pydantic model for obesity items
class ObesityItems(BaseModel):
    item: str
    argomento: str
    età: int
#
extractTopics = Task(
    description=(
        "1. Estrai i vari consigli sul management dell'obesità infantile formulati dagli specialisti e riportati su documenti word.\n"
        "2. Classifica i vari consigli, che chiamiamo item, per argomento ed età.\n"
    ),
    expected_output="Un documento JSON con gli item classificati per argomento ed età.",
    output_json=ObesityItems,
    output_file="obesity_items.json",      
    agent=extractor,
)

adaptTopicsToParents = Task(
    description=(
        "1. Esamina i consigli contenuti nella proprietà `item` dell'input e adattali alla comprensione di genitori di cultura medio bassa.\n"
        "2. Gli item sono classificati per argomento ed età ed all'interno di una stessa età e di uno stesso argomento puoi "
        " considerare gli item anche nel loro insieme .\n"
    ),
    expected_output="Un documento in formato mark down con i consigli per i genitori raggruppati per età e all'interno dell'età per argomento.",
    agent=adapterForParents,
)

# Define the crew with agents and tasks
event_management_crew = Crew(
    agents=[extractor, 
            adapterForParents],
    
    tasks=[extractTopics, 
           adaptTopicsToParents], 
    verbose=True
)

result = event_management_crew.kickoff();