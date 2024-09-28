from enum import Enum

from pydantic_settings import BaseSettings


class ResponseFormat(str, Enum):
    TEXT = "text"
    JSON_OBJECT = "json_object"

    def __str__(self):
        return self.value


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    MODEL: str
    API_V1_STR: str

    class Config:
        env_file = ".env"


settings = Settings()
