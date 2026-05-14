# NeuroVerse AI Orchestration Engine

The central nervous system of the NeuroVerse AI platform.

## Features
- **Workflow Runtime**: Manages autonomous AI workflows.
- **Planning Engine**: Breaks down goals into executable tasks.
- **Memory Engine**: Context retention using Redis & Vector DBs.
- **Agent Registry**: Dynamic discovery and management of AI agents.
- **Execution Runtime**: Sequential and parallel task execution.

## Getting Started

### Prerequisites
- Python 3.10+
- PostgreSQL
- Redis
- OpenAI API Key (for Planning Engine)

### Installation
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Create a `.env` file with your configuration:
   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password
   OPENAI_API_KEY=sk-...
   ```
3. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

## Architecture
The engine follows a modular event-driven architecture, ensuring scalability and fault tolerance for complex AI workflows. You can find the detailed design in [ARCHITECTURE.md](./ARCHITECTURE.md).

### System Flow
1. **Goal Submission**: User provides a high-level objective.
2. **Planning**: LLM decomposes the goal into atomic tasks.
3. **Execution**: Workflow runtime coordinates task execution with memory and tools.
4. **Monitoring**: Real-time tracking of states and performance.
