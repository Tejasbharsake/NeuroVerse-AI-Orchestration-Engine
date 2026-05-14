from typing import Optional, Dict, Any, List
from uuid import UUID
from sqlmodel import Session, select
from app.models.workflow import Workflow, Task, WorkflowStatus, TaskStatus
from app.db.session import engine

class StateManager:
    def __init__(self):
        self.engine = engine

    async def create_workflow(self, data: Dict[str, Any]) -> Workflow:
        with Session(self.engine) as session:
            workflow = Workflow(**data)
            session.add(workflow)
            session.commit()
            session.refresh(workflow)
            return workflow

    async def get_workflow(self, workflow_id: UUID) -> Optional[Workflow]:
        with Session(self.engine) as session:
            return session.get(Workflow, workflow_id)

    async def update_workflow_status(self, workflow_id: UUID, status: WorkflowStatus):
        with Session(self.engine) as session:
            workflow = session.get(Workflow, workflow_id)
            if workflow:
                workflow.status = status
                session.add(workflow)
                session.commit()

    async def update_task_status(self, task_id: UUID, status: TaskStatus):
        with Session(self.engine) as session:
            task = session.get(Task, task_id)
            if task:
                task.status = status
                session.add(task)
                session.commit()

    async def update_task_result(self, task_id: UUID, result: Dict[str, Any]):
        with Session(self.engine) as session:
            task = session.get(Task, task_id)
            if task:
                task.output_data = result
                session.add(task)
                session.commit()
