from enum import Enum
from typing import List, Literal

from pydantic import BaseModel


class ResponseFormat(str, Enum):
    TEXT = "text"
    JSON_OBJECT = "json_object"

    def __str__(self):
        return self.value


class GenerateChaptersRequest(BaseModel):
    topic: str


class Chapter(BaseModel):
    id: int
    title: str
    description: str
    content: str | None = None
    is_read: bool


class GetTopicChaptersResponse(BaseModel):
    id: int
    title: str
    chapters: List[Chapter]


class GenerateChapterRequest(BaseModel):
    id: int
    title: str
    description: str


class GenerateChapterResponse(BaseModel):
    id: int


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
    id: int
    email: str
    name: str
    is_active: bool
    token: str | None = None
    picture: str | None = None


class ChaptersGenerationResponse(BaseModel):
    id: int


class UserTopics(BaseModel):
    id: int
    title: str
    progress: int
    chapter_count: int


class GetChapterResponse(BaseModel):
    id: int
    title: str
    short_description: str
    content: str
    is_read: bool
    topic_id: int


class History(BaseModel):
    message: str
    user_type: Literal["user", "bot"]


class ChatRequest(BaseModel):
    message: str
    history: list[History]


class UpdateChapterRequest(BaseModel):
    is_read: bool
