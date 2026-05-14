from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

from app.api.v1 import workflow, agent, task
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set CORS enabled origins - restricting in production is better
origins = [
    "http://localhost",
    "http://localhost:8000",
    # Add your production domain here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

from app.db.session import init_db

# Monitoring
Instrumentator().instrument(app).expose(app)

@app.on_event("startup")
async def startup():
    init_db()

@app.get("/")
async def root():
    return {"message": "Welcome to NeuroVerse AI Orchestration Engine", "status": "active"}

# Include Routers
app.include_router(workflow.router, prefix=f"{settings.API_V1_STR}/workflows", tags=["workflows"])
app.include_router(agent.router, prefix=f"{settings.API_V1_STR}/agents", tags=["agents"])
app.include_router(task.router, prefix=f"{settings.API_V1_STR}/tasks", tags=["tasks"])
