from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "NeuroVerse AI Orchestration Engine"
    API_V1_STR: str = "/api/v1"
    
    # Database
    SQLALCHEMY_DATABASE_URI: Optional[str] = "sqlite:///./neuroverse.db"

    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    # Security
    SECRET_KEY: str = "secret-key-for-dev-only-change-in-prod"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # AI Models
    OPENAI_API_KEY: Optional[str] = None
    GROQ_API_KEY: Optional[str] = None
    USE_LOCAL_LLM: bool = False
    
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

    @property
    def database_url(self) -> str:
        return self.SQLALCHEMY_DATABASE_URI

settings = Settings()
