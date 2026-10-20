from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.config import settings
from app.API.V1.project import router as projects_router
from app.API.V1.auth import router as auth_router
from app.API.V1.task import router as tasks_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs" if not settings.IS_PRODUCTION else None,
    redoc_url="/redoc" if not settings.IS_PRODUCTION else None,
)

# Production-grade Security Headers Middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        if settings.IS_PRODUCTION:
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# Enable CORS for Frontend React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect Auth, Projects & Tasks routers with /api/v1 prefix
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(projects_router, prefix=settings.API_V1_STR)
app.include_router(tasks_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "message": "Project Management API is online",
        "docs": "/docs"
    }
@app.on_event("startup")
async def init_tables():
    from app.db.session import engine, Base
    from app.models.user import User
    from app.models.project import Project
    from app.models.task import Task
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
