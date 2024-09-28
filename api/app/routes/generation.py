from fastapi import APIRouter

from app.prompts import (
    GENERATE_CHAPTER_CONTENT_SYSTEM_PROMPT,
    GENERATE_CHAPTERS_SYSTEM_PROMPT,
    GENERATE_QUIZ_SYSTEM_PROMPT,
)
from app.utils.llm import LLM
from app.utils.settings import ResponseFormat, settings

router = APIRouter()


@router.post("/chapters")
def generate_chapters(topic: str):
    llm = LLM(settings)

    response = llm.query(
        user_input=topic,
        system_prompt=GENERATE_CHAPTERS_SYSTEM_PROMPT,
        format=ResponseFormat.JSON_OBJECT,
    )

    return response


@router.post("/chapter")
def generate_chapter(chapter: str, description: str):
    llm = LLM(settings)

    response = llm.query(
        user_input=f"{chapter}: {description}",
        system_prompt=GENERATE_CHAPTER_CONTENT_SYSTEM_PROMPT,
    )

    return response


@router.post("/quiz")
def generate_quiz(topic: str):
    llm = LLM(settings)

    response = llm.query(
        user_input=topic,
        system_prompt=GENERATE_QUIZ_SYSTEM_PROMPT,
        format=ResponseFormat.JSON_OBJECT,
    )

    return response
