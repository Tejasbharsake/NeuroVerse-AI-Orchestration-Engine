from sqlmodel import create_engine, SQLModel
from app.core.config import settings

engine = create_engine(settings.database_url, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)
