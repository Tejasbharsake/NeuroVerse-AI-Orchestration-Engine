from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from uuid import UUID
from typing import List, Dict, Any

from app.models.workflow import Workflow, WorkflowStatus
from app.engine.workflow_runtime import WorkflowRuntimeEngine
from app.engine.state_manager import StateManager
from app.engine.execution import ExecutionEngine
from app.engine.planning import PlanningEngine

router = APIRouter()

# Dependency injection placeholders
def get_state_manager():
    return StateManager()

def get_execution_engine():
    return ExecutionEngine()

def get_workflow_engine(
    state_manager: StateManager = Depends(get_state_manager),
    execution_engine: ExecutionEngine = Depends(get_execution_engine)
):
    return WorkflowRuntimeEngine(state_manager, execution_engine)

@router.post("/execute", response_model=Dict[str, Any])
async def execute_goal(
    goal_data: Dict[str, Any],
    background_tasks: BackgroundTasks,
    workflow_engine: WorkflowRuntimeEngine = Depends(get_workflow_engine),
    planning_engine: PlanningEngine = Depends(lambda: PlanningEngine())
):
    """
    Endpoint to receive a high-level goal, plan it, and execute it.
    """
    goal = goal_data.get("goal")
    if not goal:
        raise HTTPException(status_code=400, detail="Goal is required")
    
    # 1. Plan the goal
    plan = await planning_engine.generate_plan(goal)
    
    # 2. Initialize workflow
    workflow = await workflow_engine.initialize_workflow({
        "name": f"Workflow for: {goal[:50]}",
        "description": goal,
        "status": WorkflowStatus.PENDING
    })
    
    # 3. Add tasks to workflow (simplified)
    # In a real scenario, tasks would be linked to the workflow in the DB
    
    # 4. Execute in background
    background_tasks.add_task(workflow_engine.execute_workflow, workflow.id)
    
    return {
        "workflow_id": workflow.id,
        "status": "started",
        "plan": plan.dict()
    }

@router.get("/{workflow_id}", response_model=Dict[str, Any])
async def get_workflow_status(
    workflow_id: UUID,
    state_manager: StateManager = Depends(get_state_manager)
):
    workflow = await state_manager.get_workflow(workflow_id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    return {
        "id": workflow.id,
        "status": workflow.status,
        "created_at": workflow.created_at,
        "updated_at": workflow.updated_at
    }
