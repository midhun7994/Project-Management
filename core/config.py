from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    # API Specification
    PROJECT_NAME: str = "Project Management SaaS"
    API_V1_STR: str = "/api/v1"
    
    # Environment Specification
    ENVIRONMENT: str = "development" # "development", "staging", "production"
    CLOUDFLARE_PROXIED: bool = False

    # Security Secrets (Override in production via .env!)
    SECRET_KEY: str = "SUPER_SECRET_KEY_CHANGE_THIS_IN_PRODUCTION_MIN_32_CHARS"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15          # Short-lived access token
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7             # Long-lived refresh token

    @property
    def IS_PRODUCTION(self) -> bool:
        return self.ENVIRONMENT.lower() in ("production", "prod")
    
    # Supabase / External Database URL
    DATABASE_URL: str | None = None

    # Fallback Local Database Configuration (PostgreSQL Async)
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "pm_saas_db"
    
    @property
    def ASYNC_DATABASE_URI(self) -> str:
        if self.DATABASE_URL:
            url = self.DATABASE_URL
            if url.startswith("postgresql://"):
                url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
            return url
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Redis Configuration
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    # CORS Whitelist
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
