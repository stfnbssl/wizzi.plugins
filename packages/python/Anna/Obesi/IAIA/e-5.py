import os

# Warning control
import warnings
warnings.filterwarnings('ignore')

# import crew types
from crewai import Agent, Task, Crew

# import dotenv
from dotenv import load_dotenv, find_dotenv

# import tool types
from crewai_tools import DirectoryReadTool
from crewai_tools import FileReadTool
from crewai_tools import SerperDevTool
from crewai_tools import BaseTool

# import display types
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

directory_read_tool_path = "./instructions"
class SentimentAnalysisTool(BaseTool):
    name: str = "Sentiment Analysis Tool"
    description: str = "Analyzes the sentiment of text to ensure positive and engaging communication."
    def _run(self, text: str) -> str:
        return "positive"
directory_read_tool = DirectoryReadTool(directory=directory_read_tool_path)
file_read_tool = FileReadTool()
search_tool = SerperDevTool()
sentiment_analysis_tool = SentimentAnalysisTool()

sales_rep_agent = Agent(
    role="Sales Representative",
    goal="Identify high-value leads that match our ideal customer profile",
    backstory="As a part of the dynamic sales team at CrewAI, your mission is "
                "to scour the digital landscape for potential leads. "
                "Armed with cutting-edge tools and a strategic mindset, you analyze "
                "data, trends, and interactions to unearth opportunities that "
                "others might overlook. "
                "Your work is crucial in paving the way for meaningful engagements "
                "and driving the company's growth.",
    tools=[],
    verbose=True
)

lead_sales_rep_agent = Agent(
    role="Lead Sales Representative",
    goal="Nurture leads with personalized, compelling communications",
    backstory="Within the vibrant ecosystem of CrewAI's sales department, you "
                "stand out as the bridge between potential clients and the solutions "
                "they need. "
                "By creating engaging, personalized messages, you not only inform "
                "leads about our offerings but also make them feel seen and heard. "
                "Your role is pivotal in converting interest into action, guiding "
                "leads through the journey from curiosity to commitment.",
    tools=[],
    verbose=True
)

lead_profiling_task = Task(
    description="Conduct an in-depth analysis of {lead_name}, a company in the "
                  "{industry} sector that recently showed interest in our solutions. "
                  "Utilize all available data sources to compile a detailed profile, "
                  "focusing on key decision-makers, recent business developments, "
                  "and potential needs that align with our offerings. "
                  "This task is crucial for tailoring our engagement strategy effectively.\n "
                  "Don't make assumptions and only use information you absolutely "
                  "sure about.",
    expected_output="A comprehensive report on {lead_name}, including company background, "
                      "key personnel, recent milestones, and identified needs. "
                      "Highlight potential areas where our solutions can provide value, "
                      "and suggest personalized engagement strategies.",
    agent=sales_rep_agent,
    tools=[directory_read_tool,file_read_tool,search_tool]
)

personalized_outreach_task = Task(
    description="Using the insights gathered from the lead profiling report on "
                  "{lead_name}, craft a personalized outreach campaign aimed at "
                  "{key_decision_maker}, the {position} of {lead_name}. "
                  "The campaign should address their recent {milestone} and how "
                  "our solutions can support their goals. "
                  "Your communication must resonate with {lead_name}'s company "
                  "culture and values, demonstrating a deep understanding of their "
                  "business and needs.\n Don't make assumptions and only use information "
                  "you absolutely sure about.",
    expected_output="A series of personalized email drafts tailored to {lead_name}, "
                      "specifically targeting {key_decision_maker}. "
                      "Each draft should include a compelling narrative that connects "
                      "our solutions with their recent achievements and future goals. "
                      "Ensure the tone is engaging, professional, and aligned with "
                      "{lead_name}'s corporate identity.",
    agent=lead_sales_rep_agent,
    tools=[sentiment_analysis_tool,search_tool]
)

crew = Crew(
    agents=[sales_rep_agent,
            lead_sales_rep_agent],
    tasks=[lead_profiling_task,
           personalized_outreach_task],
    verbose=True,
    memory=True
)

# execution
crew_result = crew.kickoff(
    inputs={
        "lead_name": "DeepLearningAI",
        "industry": "Online Learning Platform",
        "key_decision_maker": "Andrew Ng",
        "position": "CEO",
        "milestone": "product launch"
    }
);
Markdown(crew_result)