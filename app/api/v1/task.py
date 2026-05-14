from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

@router.get("/")
async def list_tasks():
    return {"tasks": []}
