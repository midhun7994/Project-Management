from pydantic import BaseModel, ConfigDict
from typing import Optional
import uuid
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "MEDIUM"
    status: str = "todo"
    project_id: uuid.UUID
    assignee_id: Optional[uuid.UUID] = None
    tags: Optional[str] = None
    due_date: Optional[str] = None

class TaskUpdateStatus(BaseModel):
    status: str

class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    key: str
    title: str
    description: Optional[str] = None
    priority: str
    status: str
    project_id: uuid.UUID
    assignee_id: Optional[uuid.UUID] = None
    tags: Optional[str] = None
    due_date: Optional[str] = None
    created_at: datetime
    updated_at: datetime
