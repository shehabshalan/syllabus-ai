from enum import Enum
from typing import List

from pydantic import BaseModel


class ResponseFormat(str, Enum):
    TEXT = "text"
    JSON_OBJECT = "json_object"

    def __str__(self):
        return self.value


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


class AuthRequest(BaseModel):
    token: str


class UserResponse(BaseModel):
    email: str
    name: str
    is_active: bool
    token: str | None = None
    picture: str | None = None
