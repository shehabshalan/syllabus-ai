from enum import Enum

from pydantic_settings import BaseSettings


class ResponseFormat(str, Enum):
    TEXT = "text"
    JSON_OBJECT = "json_object"

    def __str__(self):
        return self.value


class Settings(BaseSettings):
    openai_api_key: str
    model: str

    class Config:
        env_file = ".env"


settings = Settings()
