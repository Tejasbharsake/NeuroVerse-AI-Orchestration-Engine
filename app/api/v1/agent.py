from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

@router.get("/")
async def list_agents():
    return {"agents": []}

@router.post("/register")
async def register_agent(agent_data: Dict[str, Any]):
    return {"status": "success", "agent_id": "dummy-id"}
