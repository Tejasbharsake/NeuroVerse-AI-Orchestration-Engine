from typing import List, Dict, Any
import json
from pydantic import BaseModel
from loguru import logger
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

from app.core.config import settings

class Plan(BaseModel):
    goal: str
    tasks: List[Dict[str, Any]]

from langchain_community.chat_models import ChatOllama

class PlanningEngine:
    def __init__(self, model_name: str = "llama3-70b-8192"):
        if settings.USE_LOCAL_LLM:
            self.llm = ChatOllama(model="llama3")
            logger.info("Using local Ollama for planning.")
        elif settings.GROQ_API_KEY:
            self.llm = ChatGroq(
                groq_api_key=settings.GROQ_API_KEY,
                model_name=model_name,
                temperature=0.1
            )
        else:
            self.llm = None
            logger.warning("No LLM provider configured (Groq/Ollama). Using mock responses.")

    async def generate_plan(self, goal: str) -> Plan:
        """Decomposes a goal into executable tasks using Groq LLM."""
        logger.info(f"Generating plan for goal: {goal}")
        
        if not self.llm:
            return self._generate_mock_plan(goal)

        prompt = ChatPromptTemplate.from_template("""
        You are an AI Orchestration Planner. Your goal is to break down a user's high-level goal into a sequence of executable tasks.
        
        User Goal: {goal}
        
        Output the plan strictly as a JSON object with the following structure:
        {{
            "goal": "{goal}",
            "tasks": [
                {{
                    "name": "Task Name",
                    "description": "Task Description",
                    "input_data": {{"key": "value"}}
                }}
            ]
        }}
        
        Ensure the tasks are logical and in sequential order.
        """)

        chain = prompt | self.llm | JsonOutputParser()
        
        try:
            result = await chain.ainvoke({"goal": goal})
            return Plan(**result)
        except Exception as e:
            logger.error(f"Failed to generate plan using LLM: {str(e)}")
            return self._generate_mock_plan(goal)

    def _generate_mock_plan(self, goal: str) -> Plan:
        mock_tasks = [
            {
                "name": "Research Task",
                "description": f"Researching details for: {goal}",
                "input_data": {"query": goal}
            },
            {
                "name": "Final Output Task",
                "description": "Generating final response",
                "input_data": {"action": "summarize"}
            }
        ]
        return Plan(goal=goal, tasks=mock_tasks)
