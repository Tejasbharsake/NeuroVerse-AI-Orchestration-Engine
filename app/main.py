from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
import asyncio
import random

from app.api.v1 import workflow, agent, task
from app.core.config import settings
from app.db.session import init_db

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set CORS enabled origins
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Monitoring
Instrumentator().instrument(app).expose(app)

@app.on_event("startup")
async def startup():
    init_db()

@app.get("/")
async def root():
    return {"message": "Welcome to NeuroVerse AI Orchestration Engine", "status": "active"}

@app.websocket("/ws/telemetry")
async def telemetry_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate real-time metrics
            data = {
                "neural_load": random.randint(40, 95),
                "active_agents": random.randint(800, 900),
                "latency": random.randint(20, 60),
                "tasks_executed": random.randint(1000, 5000)
            }
            await websocket.send_json(data)
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        pass

# Include Routers
app.include_router(workflow.router, prefix=f"{settings.API_V1_STR}/workflows", tags=["workflows"])
app.include_router(agent.router, prefix=f"{settings.API_V1_STR}/agents", tags=["agents"])
app.include_router(task.router, prefix=f"{settings.API_V1_STR}/tasks", tags=["tasks"])
