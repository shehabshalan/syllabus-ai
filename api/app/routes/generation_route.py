from fastapi import APIRouter

from app.prompts import (
    GENERATE_CHAPTER_CONTENT_SYSTEM_PROMPT,
    GENERATE_CHAPTERS_SYSTEM_PROMPT,
    GENERATE_QUIZ_SYSTEM_PROMPT,
)
from app.utils import schema
from app.utils.llm import LLM
from app.utils.settings import settings

router = APIRouter(prefix="/generation", tags=["LLM Generation"])


@router.post(
    "/chapters",
    response_model=schema.GenerateChaptersResponse,
    operation_id="generate_chapters",
)
def generate_chapters(
    request: schema.GenerateChaptersRequest,
) -> schema.GenerateChaptersResponse:
    llm = LLM(settings)

    response = llm.query(
        user_input=request.topic,
        system_prompt=GENERATE_CHAPTERS_SYSTEM_PROMPT,
        format=schema.ResponseFormat.JSON_OBJECT,
    )

    return schema.GenerateChaptersResponse(**response)


@router.post(
    "/chapter",
    response_model=schema.GenerateChapterResponse,
    operation_id="generate_chapter",
)
def generate_chapter(
    request: schema.GenerateChapterRequest,
) -> schema.GenerateChapterResponse:
    llm = LLM(settings)

    response = llm.query(
        user_input=f"{request.chapter}: {request.description}",
        system_prompt=GENERATE_CHAPTER_CONTENT_SYSTEM_PROMPT,
    )

    return schema.GenerateChapterResponse(content=response)


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
