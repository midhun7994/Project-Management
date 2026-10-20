from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
import uuid

from app.db.session import get_db
from app.models.task import Task
from app.models.project import Project
from app.models.user import User
from app.API.deps import get_current_user
from app.schemas.task import TaskCreate, TaskUpdateStatus, TaskResponse

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=List[TaskResponse])
async def list_tasks(
    project_id: Optional[uuid.UUID] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List tasks, optionally filtered by project_id"""
    query = select(Task)
    if project_id:
        query = query.where(Task.project_id == project_id)
    query = query.order_by(Task.created_at.desc())
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_in: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new task under a project"""
    proj_result = await db.execute(select(Project).where(Project.id == task_in.project_id))
    project = proj_result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    count_result = await db.execute(select(func.count(Task.id)).where(Task.project_id == task_in.project_id))
    task_count = count_result.scalar() or 0
    task_key = f"{project.key}-{task_count + 1}"

    new_task = Task(
        key=task_key,
        title=task_in.title,
        description=task_in.description,
        priority=task_in.priority.upper(),
        status=task_in.status.lower(),
        project_id=task_in.project_id,
        assignee_id=task_in.assignee_id,
        tags=task_in.tags,
        due_date=task_in.due_date
    )
    db.add(new_task)
    await db.commit()
    await db.refresh(new_task)
    return new_task

@router.patch("/{id}/status", response_model=TaskResponse)
async def update_task_status(
    id: uuid.UUID,
    status_update: TaskUpdateStatus,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update task workflow status (e.g. todo -> in_progress -> review -> done)"""
    result = await db.execute(select(Task).where(Task.id == id))
    task = result.scalars().first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = status_update.status.lower()
    await db.commit()
    await db.refresh(task)
    return task

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a task"""
    result = await db.execute(select(Task).where(Task.id == id))
    task = result.scalars().first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    await db.delete(task)
    await db.commit()
    return None
