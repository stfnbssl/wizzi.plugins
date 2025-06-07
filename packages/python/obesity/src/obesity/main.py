#!/usr/bin/env python
from obesity.crew import ObesityCrew


def run():
    # Replace with your inputs, it will automatically interpolate any tasks and agents information
    inputs = {
        'topic': 'AI LLMs'
    }
    ObesityCrew().crew().kickoff(inputs=inputs)