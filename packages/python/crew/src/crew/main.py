#!/usr/bin/env python
from crew.crew import CrewCrew


def run():
    # Replace with your inputs, it will automatically interpolate any tasks and agents information
    inputs = {
        'topic': 'AI LLMs'
    }
    CrewCrew().crew().kickoff(inputs=inputs)