import os

# Warning control
import warnings
warnings.filterwarnings('ignore')

# import crew types
from crewai import Agent, Task, Crew

# import dotenv
from dotenv import load_dotenv, find_dotenv

# import tool types
from crewai_tools import FileReadTool

# import model types
from pydantic import BaseModel

# set environment variables
# these expect to find a .env file at the directory above.
# the format for that file is (without the comment)
# API_KEYNAME=AStringThatIsTheLongAPIKeyFromSomeService

def load_env():
    _ = load_dotenv(find_dotenv())

def get_openai_api_key():
    load_env()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    return openai_api_key

# OpenAI
openai_api_key = get_openai_api_key()
os.environ["OPENAI_MODEL_NAME"] = 'gpt-3.5-turbo'

# tools definitions

toolMdx1_path = "C:/My/3dparty/python/Anna/Obesi/IAIA/Documenti/Caselli.md"
toolMdx2_path = "C:/My/3dparty/python/Anna/Obesi/IAIA/Documenti/Davoli.md"
toolMdx1 = FileReadTool(file_path=toolMdx1_path)
toolMdx2 = FileReadTool(file_path=toolMdx2_path)

# Define a Pydantic model for ObesityItems
class ObesityItems(BaseModel):
    item: str
    argomento: str
    fascia_età: str

extractor = Agent(
    role="Estrattore di contenuti",
    goal="Estrarre e classificare contenuti riguardanti l'obesità infantile",
    backstory="Stai lavorando ad un progetto di produzione di schede informative "
                "per il management dell'obesità infantile per fasce di età. "
                "Vari specialisti hanno prodotto schede per i pediatri in vari "
                "documenti. "
                "Dovranno essere prodotte schede anche per i genitori, usando "
                "un linguaggio più semplice. "
                "Dovranno inoltre essere fornite istruzioni ai pediatri su come "
                "presentare ai genitori le schede loro rivolte. "
                "Il tuo lavoro è estrarre dai documenti prodotti dagli specialisti "
                "i vari consigli per i pediatri classificandoli per argomento "
                "e fascia d'età, questi saranno poi passati al Mediatore dei contenuti "
                "genitoriali per adattarli all'uso da parte dei genitori.",
    tools=[toolMdx1,toolMdx2],
    verbose=True
)

adapterForParents = Agent(
    role="Mediatore dei contenuti genitoriali",
    goal="Riformulare contenuti specialistici pediatrici per esporli a "
           "genitori di cultura medio bassa",
    backstory="Comunicare ai genitori consigli riguardanti l'obesità del loro "
                "figlio è compito molto delicato. "
                "Si deve evitare un linguaggio troppo specialistico e occorre "
                "prestare attenzione a non urtare la suscettibilità e a non rinforzare "
                "lo stigma che questa patologia porta con se. "
                "Gli item estratti dall'Estrattore di contenuti dovranno essere "
                "riformulati con queste avvertenze.",
    tools=[],
    verbose=True
)

extractTopics = Task(
    description="1. "
                  "Estrai i vari consigli sul management dell'obesità infantile "
                  "formulati dagli specialisti e riportati su documenti markdown. "
                  "2. "
                  "Classifica i vari consigli, che chiamiamo item, per argomento "
                  "e fascia d'età.",
    expected_output="Un documento JSON con gli item classificati per argomento ed "
                      "fascia d'età.",
    output_json=ObesityItems,
    output_file="obesity_items.json",
    agent=extractor
)

adaptTopicsToParents = Task(
    description="1. "
                  "Esamina i consigli contenuti nella proprietà `item` dell'input "
                  "e adattali alla comprensione di genitori di cultura medio bassa. "
                  "2. "
                  "Gli item sono classificati per argomento ed età ed all'interno "
                  "di una stessa età e di uno stesso argomento puoi considerare "
                  "gli item anche nel loro insieme.",
    expected_output="Un documento in formato markdown con i consigli per i genitori "
                      "raggruppati per età e all'interno dell'età per argomento.",
    agent=adapterForParents
)

event_management_crew = Crew(
    agents=[extractor,
            adapterForParents],
    tasks=[extractTopics,
           adaptTopicsToParents],
    verbose=True
)

# execution
event_management_crew_result = event_management_crew.kickoff();