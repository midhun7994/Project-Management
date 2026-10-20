from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from uuid import UUID

from app.core.config import settings
from app.db.session import get_db
from app.models.user import User

# HTTPBearer enables a simple "Value" token input in Swagger UI
security = HTTPBearer()

async def get_current_user(
    auth: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # 1. Extract the raw token string
    token = auth.credentials

    # 2. Decode JWT payload
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id_str: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        if user_id_str is None or token_type != "access":
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # 3. KEEP THIS: Query database to find the user
    result = await db.execute(select(User).where(User.id == UUID(user_id_str)))
    user = result.scalars().first()

    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user account")

    return user
