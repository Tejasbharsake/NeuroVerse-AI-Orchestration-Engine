from typing import List, Optional
from uuid import UUID
from sqlmodel import Session, select
from app.models.workflow import Agent, AgentStatus
from app.db.session import engine

class AgentRegistry:
    def __init__(self):
        self.engine = engine

    def register_agent(self, agent_data: dict) -> Agent:
        with Session(self.engine) as session:
            agent = Agent(**agent_data)
            session.add(agent)
            session.commit()
            session.refresh(agent)
            return agent

    def list_agents(self, status: Optional[AgentStatus] = None) -> List[Agent]:
        with Session(self.engine) as session:
            statement = select(Agent)
            if status:
                statement = statement.where(Agent.status == status)
            return session.exec(statement).all()

    def get_agent(self, agent_id: UUID) -> Optional[Agent]:
        with Session(self.engine) as session:
            return session.get(Agent, agent_id)

    def update_agent_health(self, agent_id: UUID, score: float):
        with Session(self.engine) as session:
            agent = session.get(Agent, agent_id)
            if agent:
                agent.health_score = score
                session.add(agent)
                session.commit()
