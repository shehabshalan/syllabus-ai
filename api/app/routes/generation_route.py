import os

import dotenv
from baml_client import reset_baml_env_vars
from baml_client.sync_client import b
from baml_client.types import Chapters
from fastapi import APIRouter

from app.prompts import (
    GENERATE_CHAPTER_CONTENT_SYSTEM_PROMPT,
    GENERATE_QUIZ_SYSTEM_PROMPT,
)
from app.utils import schema
from app.utils.llm import LLM
from app.utils.settings import settings

router = APIRouter(prefix="/generation", tags=["LLM Generation"])
dotenv.load_dotenv()
reset_baml_env_vars(dict(os.environ))


@router.post(
    "/chapters",
    response_model=Chapters,
    operation_id="generate_chapters",
)
def generate_chapters(
    request: schema.GenerateChaptersRequest,
) -> Chapters:
    response = b.GenerateChapters(request.topic)
    return response


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
