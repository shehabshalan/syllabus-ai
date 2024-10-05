from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    MODEL: str
    ORIGINS: list[str]
    GOOGLE_CLIENT_ID: str
    JWT_SECRET_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
