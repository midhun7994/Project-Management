from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse, TokenResponse
from app.services.auth_service import create_user, authenticate_user
from app.core.security import create_access_token, create_refresh_token
from app.core.config import settings
from app.API.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, response: Response, db: AsyncSession = Depends(get_db)):
    user = await create_user(db, user_in)
    
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)
    
    # Store refresh token in HTTP-Only secure cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="lax",
        secure=settings.IS_PRODUCTION,
    )

    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user)
    )

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin, response: Response, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="lax",
        secure=settings.IS_PRODUCTION,
    )

    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user)
    )

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Returns the profile of the currently logged-in user."""
    return current_user
