import json
import os
from typing import Annotated

import dotenv
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import db
from app.prompts import (
    GENERATE_QUIZ_SYSTEM_PROMPT,
)
from app.utils import schema
from app.utils.auth_dep import get_current_user
from app.utils.llm import LLM
from app.utils.schema import ChaptersGenerationResponse, ChatRequest, UserResponse
from app.utils.settings import settings
from baml_client import reset_baml_env_vars
from baml_client.async_client import b

router = APIRouter(prefix="/generation", tags=["LLM Generation"])
dotenv.load_dotenv()
reset_baml_env_vars(dict(os.environ))


@router.post(
    "/chapters",
    response_model=ChaptersGenerationResponse,
    operation_id="generate_chapters",
)
def generate_chapters(
    request: schema.GenerateChaptersRequest,
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
) -> ChaptersGenerationResponse:
    topic_exists = db.get_topic_by_title(
        session=session, title=request.topic, user_id=current_user.id
    )
    if topic_exists:
        return ChaptersGenerationResponse(id=topic_exists.id)

    response = b.GenerateChapters(request.topic)
    # save to db
    topic = db.create_topic(
        session=session, user_id=current_user.id, title=request.topic
    )
    chapters = response.chapters

    for chapter in chapters:
        db.create_chapter(
            session=session,
            topic_id=topic.id,
            title=chapter.name,
            short_description=chapter.description,
        )

    return ChaptersGenerationResponse(id=topic.id)


@router.post(
    "/chapter",
    response_model=schema.GenerateChapterResponse,
    operation_id="generate_chapter",
)
def generate_chapter(
    request: schema.GenerateChapterRequest,
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
) -> schema.GenerateChapterResponse:
    chapter_exists = db.get_chapter_by_title(
        session=session,
        title=request.title,
        chapter_id=request.id,
        user_id=current_user.id,
    )
    if chapter_exists:
        return schema.GenerateChapterResponse(id=chapter_exists.id)

    response = b.GenerateChapter(chapter=request.title, description=request.description)
    db.update_chapter_content(
        session=session,
        chapter_id=request.id,
        user_id=current_user.id,
        content=response.content,
    )
    return schema.GenerateChapterResponse(id=request.id)


@router.post(
    "/quiz", response_model=schema.GenerateQuizResponse, operation_id="generate_quiz"
)
def generate_quiz(
    request: schema.GenerateQuizRequest,
) -> schema.GenerateQuizResponse:
    llm = LLM(settings)

    response = llm.query(
        user_input=f"{request.topic}: {request.content}",
        system_prompt=GENERATE_QUIZ_SYSTEM_PROMPT,
        format=schema.ResponseFormat.JSON_OBJECT,
    )

    return schema.GenerateQuizResponse(**response)


@router.post("/chat/chapter/{id}", operation_id="chat_with_chapter")
async def chat_with_chapter(
    id: int,
    request: ChatRequest,
    current_user: Annotated[UserResponse, Depends(get_current_user)],
    session: Session = Depends(db.get_session),
):
    chapter = db.get_chapter_by_id(session, id, current_user.id)
    history = json.dumps([item.model_dump() for item in request.history])
    response = await b.ChatChapter(
        content=chapter["content"],
        message=request.message,
        history=history,
    )
    return response
