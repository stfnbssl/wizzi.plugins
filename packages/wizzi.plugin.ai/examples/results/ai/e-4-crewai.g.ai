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

# import display types
from IPython.display import Markdown

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

docs_scrape_tool_url = "https://logbot.cloud/iot-for-monitoring-and-predictive-maintenance/"
docs_scrape_tool = ScrapeWebsiteTool(website_url=docs_scrape_tool_url)

support_agent = Agent(
    role="Senior Support Representative",
    goal="Be the most friendly and helpful support representative in your "
           "team",
    backstory="You work at Logbot (https://logbot.cloud) and are now working "
                "on providing support to {customer}, a super important customer "
                "for your company. "
                "You need to make sure that you provide the best support! Make "
                "sure to provide full complete answers, and make no assumptions.",
    tools=[],
    verbose=True
)

support_quality_assurance_agent = Agent(
    role="Support Quality Assurance Specialist",
    goal="Get recognition for providing the best support quality assurance "
           "in your team",
    backstory="You work at Logbot (https://logbot.cloud) and are now working "
                "with your team on a request from {customer} ensuring that the "
                "support representative is providing the best support possible.\n "
                "You need to make sure that the support representative is providing "
                "full complete answers, and make no assumptions.",
    tools=[]
)

inquiry_resolution = Task(
    description="{customer} just reached out with a super important ask:\n {inquiry}\n\n "
                  "{person} from {customer} is the one that reached out. "
                  "Make sure to use everything you know to provide the best support "
                  "possible. "
                  "You must strive to provide a complete and accurate response "
                  "to the customer's inquiry.",
    expected_output="A detailed, informative response to the customer's inquiry that "
                      "addresses all aspects of their question.\n The response should "
                      "include references to everything you used to find the answer, "
                      "including external data or solutions. "
                      "Ensure the answer is complete, leaving no questions unanswered, "
                      "and maintain a helpful and friendly tone throughout.",
    agent=support_agent
)

quality_assurance_review = Task(
    description="Review the response drafted by the Senior Support Representative "
                  "for {customer}'s inquiry. "
                  "Ensure that the answer is comprehensive, accurate, and adheres "
                  "to the high-quality standards expected for customer support.\n "
                  "Verify that all parts of the customer's inquiry have been addressed "
                  "thoroughly, with a helpful and friendly tone.\n Check for references "
                  "and sources used to find the information, ensuring the response "
                  "is well-supported and leaves no questions unanswered.",
    expected_output="A final, detailed, and informative response ready to be sent "
                      "to the customer.\n This response should fully address the customer's "
                      "inquiry, incorporating all relevant feedback and improvements.\n "
                      "Don't be too formal, we are a chill and cool company but maintain "
                      "a professional and friendly tone throughout.",
    agent=support_quality_assurance_agent
)

event_management_crew = Crew(
    agents=[support_agent,
            support_quality_assurance_agent],
    tasks=[inquiry_resolution,
           quality_assurance_review],
    verbose=True,
    memory=True
)

# execution
event_management_crew_result = event_management_crew.kickoff(
    inputs={
        "customer": "DeepLearningAI",
        "person": "Andrew Ng",
        "inquiry": "I need help with setting up my IoTs, specifically how can I improve my devices' performance? Can you provide guidance?"
    }
);
Markdown(event_management_crew_result)