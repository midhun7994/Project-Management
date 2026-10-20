from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

# Create Async Engine for PostgreSQL or SQLite
is_sqlite = settings.ASYNC_DATABASE_URI.startswith("sqlite")
connect_args = {"check_same_thread": False} if is_sqlite else {}

engine = create_async_engine(
    settings.ASYNC_DATABASE_URI,
    echo=False,
    future=True,
    pool_pre_ping=True,
    connect_args=connect_args,
)

# Create session generator factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# Base class for database models
Base = declarative_base()

# FastAPI Dependency for DB sessions
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
