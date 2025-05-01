from typing import Literal

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # LLM config
    GOOGLE_API_KEY: str
    OPENAI_API_KEY: str
    MODEL: str
    # API config
    ORIGINS: list[str]
    # JWT and Auth config
    GOOGLE_CLIENT_ID: str
    JWT_SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    # DB config
    DB_DRIVER: str
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    MODE: Literal["dev", "prod"] = "dev"

    class Config:
        env_file = ".env"


settings = Settings()  # type: ignore
