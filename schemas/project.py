from pydantic import BaseModel, ConfigDict
from typing import Optional
import uuid
from datetime import datetime

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    key: str # e.g. "PRJ"

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: Optional[str] = None
    key: str
    status: str
    owner_id: uuid.UUID
    created_at: datetime
