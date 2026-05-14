from enum import Enum
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

class WorkflowStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    RETRYING = "retrying"

class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class AgentStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    BUSY = "busy"

class WorkflowBase(SQLModel):
    name: str
    description: Optional[str] = None
    status: WorkflowStatus = WorkflowStatus.PENDING

from sqlalchemy import Column, JSON

class Workflow(WorkflowBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    tasks: List["Task"] = Relationship(back_populates="workflow")

class TaskBase(SQLModel):
    name: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.PENDING
    workflow_id: UUID = Field(foreign_key="workflow.id")
    agent_id: Optional[UUID] = None
    input_data: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    output_data: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))

class Task(TaskBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    workflow: Workflow = Relationship(back_populates="tasks")

class AgentBase(SQLModel):
    name: str
    capabilities: List[str] = Field(default=[], sa_column=Column(JSON))
    status: AgentStatus = AgentStatus.ACTIVE
    health_score: float = 1.0

class Agent(AgentBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
