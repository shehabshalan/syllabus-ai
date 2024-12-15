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
async def me(request: Request) -> UserResponse:
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await user_service.get_user(token)


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
    return topic_chapters


@router.get("/topics", operation_id="get_topics", response_model=list[UserTopics])
async def get_topics(
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
) -> list[UserTopics]:
    topics = db.get_user_topics(session, current_user.id)
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
    return chapter
