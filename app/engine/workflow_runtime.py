import asyncio
from typing import List, Dict, Any
from uuid import UUID
from datetime import datetime
from loguru import logger

from app.models.workflow import Workflow, Task, WorkflowStatus, TaskStatus
from app.engine.execution import ExecutionEngine
from app.engine.state_manager import StateManager

class WorkflowRuntimeEngine:
    def __init__(self, state_manager: StateManager, execution_engine: ExecutionEngine):
        self.state_manager = state_manager
        self.execution_engine = execution_engine

    async def initialize_workflow(self, workflow_data: Dict[str, Any]) -> Workflow:
        """Starts a new workflow execution."""
        workflow = await self.state_manager.create_workflow(workflow_data)
        logger.info(f"Initialized workflow: {workflow.id}")
        return workflow

    async def execute_workflow(self, workflow_id: UUID):
        """Main execution loop for a workflow."""
        workflow = await self.state_manager.get_workflow(workflow_id)
        if not workflow:
            logger.error(f"Workflow {workflow_id} not found")
            return

        await self.state_manager.update_workflow_status(workflow_id, WorkflowStatus.RUNNING)
        
        try:
            # Simple sequential execution for now
            for task in workflow.tasks:
                await self.execute_task(task)
            
            await self.state_manager.update_workflow_status(workflow_id, WorkflowStatus.COMPLETED)
            logger.info(f"Workflow {workflow_id} completed successfully")
        except Exception as e:
            logger.exception(f"Workflow {workflow_id} failed: {str(e)}")
            await self.state_manager.update_workflow_status(workflow_id, WorkflowStatus.FAILED)

    async def execute_task(self, task: Task):
        """Executes an individual task using the Execution Engine."""
        await self.state_manager.update_task_status(task.id, TaskStatus.RUNNING)
        
        try:
            result = await self.execution_engine.run_task(task)
            await self.state_manager.update_task_result(task.id, result)
            await self.state_manager.update_task_status(task.id, TaskStatus.COMPLETED)
        except Exception as e:
            logger.error(f"Task {task.id} failed: {str(e)}")
            await self.state_manager.update_task_status(task.id, TaskStatus.FAILED)
            raise e
