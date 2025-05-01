from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app import db
from app.services import user_service
from app.utils.auth_dep import get_current_user
from app.utils.schema import (
    AuthRequest,
    GetChapterResponse,
    GetTopicChaptersResponse,
    UpdateChapterRequest,
    UserResponse,
    UserTopics,
)

router = APIRouter(tags=["User"], prefix="/user")


@router.post(
    "/auth",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    operation_id="auth",
)
async def auth(
    request: AuthRequest, session: Session = Depends(db.get_session)
) -> UserResponse:
    return await user_service.auth_user(request.token, session)


@router.get("/me", response_model=UserResponse, operation_id="me")
async def me(
    current_user: Annotated[UserResponse, Depends(get_current_user)],
) -> UserResponse:
    return current_user


@router.get(
    "/topic/{id}",
    operation_id="get_topic_chapters",
    response_model=GetTopicChaptersResponse,
)
async def get_topic_chapters(
    id: int,
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
) -> GetTopicChaptersResponse:
    topic_chapters = db.get_user_topic_chapters_by_id(session, id, current_user.id)
    if not topic_chapters:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Topic not found or you do not have access to it",
        )
    return topic_chapters


@router.get("/topics", operation_id="get_topics", response_model=list[UserTopics])
async def get_topics(
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
) -> list[UserTopics]:
    topics = db.get_user_topics(session, current_user.id)
    if not topics:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No topics found for the user",
        )
    return topics


@router.get(
    "/chapter/{id}", operation_id="get_chapter", response_model=GetChapterResponse
)
async def get_chapter(
    id: int,
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
) -> GetChapterResponse:
    chapter = db.get_chapter_by_id(session, id, current_user.id)
    if not chapter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chapter not found or you do not have access to it",
        )
    return chapter


@router.put(
    "/chapter/{id}",
    operation_id="update_chapter_read_status",
)
async def update_chapter_read_status(
    id: int,
    request: UpdateChapterRequest,
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
) -> None:
    db.update_user_chapter_read_status(session, id, current_user.id, request.is_read)
    return status.HTTP_200_OK
