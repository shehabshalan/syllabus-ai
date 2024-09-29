from typing import List

from pydantic import BaseModel


class GenerateChaptersRequest(BaseModel):
    topic: str


class Chapter(BaseModel):
    name: str
    description: str
    slug: str


class GenerateChaptersResponse(BaseModel):
    topic: str
    chapters: List[Chapter]


class GenerateChapterRequest(BaseModel):
    chapter: str
    description: str


class GenerateChapterResponse(BaseModel):
    content: str


class GenerateQuizRequest(BaseModel):
    topic: str
    content: str


class Question(BaseModel):
    question: str
    correctOptionIndex: int
    options: List[str]


class GenerateQuizResponse(BaseModel):
    questions: List[Question]
