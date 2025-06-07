import os

# Warning control
import warnings
warnings.filterwarnings('ignore')

# import crew types
from crewai import Agent, Task, Crew

# import dotenv
from dotenv import load_dotenv, find_dotenv

# import tool types
from crewai_tools import ScrapeWebsiteTool
from crewai_tools import SerperDevTool

# import model types
from pydantic import BaseModel

# import display types
from pprint import pprint
import json
from IPython.display import Markdown

# set environment variables
# these expect to find a .env file at the directory above.
# the format for that file is (without the comment)
# API_KEYNAME=AStringThatIsTheLongAPIKeyFromSomeService

def load_env():
    _ = load_dotenv(find_dotenv())

def get_serper_api_key():
    load_env()
    serper_api_key = os.getenv("SERPER_API_KEY")
    return serper_api_key

def get_openai_api_key():
    load_env()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    return openai_api_key

# OpenAI
openai_api_key = get_openai_api_key()
os.environ["OPENAI_MODEL_NAME"] = 'gpt-3.5-turbo'

# SerperDevTool
os.environ["SERPER_API_KEY"] = get_serper_api_key()

# tools definitions

scrape_tool = ScrapeWebsiteTool()
search_tool = SerperDevTool()

# Define a Pydantic model for VenueDetails
class VenueDetails(BaseModel):
    name: str
    address: str
    capacity: int
    booking_status: str

venue_coordinator = Agent(
    role="Venue Coordinator",
    goal="Identify and book an appropriate venue based on event requirements",
    backstory="With a keen sense of space and understanding of event logistics, "
                "you excel at finding and securing the perfect venue that fits "
                "the event's theme, size, and budget constraints.",
    tools=[search_tool,scrape_tool],
    verbose=True
)

logistics_manager = Agent(
    role="Logistics Manager",
    goal="Manage all logistics for the event including catering and equipmen",
    backstory="Organized and detail-oriented, you ensure that every logistical "
                "aspect of the event from catering to equipment setup is flawlessly "
                "executed to create a seamless experience.",
    tools=[search_tool,scrape_tool],
    verbose=True
)

marketing_communications_agent = Agent(
    role="Marketing and Communications Agent",
    goal="Effectively market the event and communicate with participants",
    backstory="Creative and communicative you craft compelling messages and "
                "engage with potential attendees to maximize event exposure and "
                "participation.",
    tools=[search_tool,scrape_tool],
    verbose=True
)

venue_task = Task(
    description="Find a venue in {event_city} that meets criteria for {event_topic}.",
    expected_output="All the details of a specifically chosen venue you found to accommodate "
                      "the event.",
    output_json=VenueDetails,
    output_file="venue_details.json",
    human_input=True,
    agent=venue_coordinator,
    tools=[]
)

logistics_task = Task(
    description="Coordinate catering and equipment for an event with {expected_participants} "
                  "participants on {tentative_date}.",
    expected_output="Confirmation of all logistics arrangements including catering "
                      "and equipment setup.",
    async_execution=True,
    human_input=True,
    agent=logistics_manager,
    tools=[]
)

marketing_task = Task(
    description="Promote the {event_topic} aiming to engage at least {expected_participants} "
                  "potential attendees.",
    expected_output="Report on marketing activities and attendee engagement formatted "
                      "as markdown.",
    async_execution=True,
    output_file="marketing_report.md",
    agent=marketing_communications_agent,
    tools=[]
)

event_management_crew = Crew(
    agents=[venue_coordinator,
            logistics_manager,
            marketing_communications_agent],
    tasks=[venue_task,
           logistics_task,
           marketing_task],
    verbose=True
)

# execution
event_management_crew_result = event_management_crew.kickoff(
    inputs={
        "event_topic": "Tech Innovation Conference",
        "event_description": "A gathering of tech innovators and industry leaders to explore future technologies.",
        "event_city": "San Francisco",
        "tentative_date": "2024-12-15",
        "expected_participants": 100,
        "budget": 10000,
        "venue_type": "Conference Hall"
    }
);
with open('venue_details.json') as f:
    data = json.load(f)
pprint(data)
Markdown("marketing_report.md")ok