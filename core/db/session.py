from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base

from app.core.config import settings

# 1. Async Engine
engine = create_async_engine(
    settings.ASYNC_DATABASE_URI,
    echo=settings.DEBUG,
    future=True,
)

# 2. Session Factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# 3. Declarative Base
Base = declarative_base()

# 4. FastAPI Dependency
async def get_db():
    session = AsyncSessionLocal()
    try:
        yield session
    finally:
        await session.close()