import os

import dotenv
from baml_client import reset_baml_env_vars
from baml_client.sync_client import b
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import db
from app.prompts import (
    GENERATE_QUIZ_SYSTEM_PROMPT,
)
from app.utils import schema
from app.utils.llm import LLM
from app.utils.schema import ChaptersGenerationResponse
from app.utils.settings import settings

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
    session: Session = Depends(db.get_session),
) -> ChaptersGenerationResponse:
    response = b.GenerateChapters(request.topic)
    # save to db

    topic = db.create_topic(
        session=session, user_id=request.user_id, title=request.topic
    )
    chapters = response.chapters

    for chapter in chapters:
        db.create_chapter(
            session=session,
            topic_id=topic["id"],
            title=chapter.name,
            short_description=chapter.description,
        )

    return ChaptersGenerationResponse(id=topic["id"])


@router.post(
    "/chapter",
    response_model=schema.GenerateChapterResponse,
    operation_id="generate_chapter",
)
def generate_chapter(
    request: schema.GenerateChapterRequest,
) -> schema.GenerateChapterResponse:
    response = b.GenerateChapter(f"{request.chapter}: {request.description}")
    return response


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
