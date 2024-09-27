from typing import Optional

from sqlalchemy import ForeignKey, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

DATABASE_URL = "sqlite:///test.db"


class NotFoundError(Exception):
    pass


class Base(DeclarativeBase):
    pass


class DBUsers(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    email: Mapped[str]
    is_verified: Mapped[bool]
    google_id: Mapped[Optional[str]]


class DBTopics(Base):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str]
    progress: Mapped[int] = mapped_column(default=0)


class DBChapters(Base):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str]
    content: Mapped[str]
    short_description: Mapped[str]
    is_read: Mapped[bool] = mapped_column(default=False)
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"))


class DBTopicChapters(Base):
    __tablename__ = "topic_chapters"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"))
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"))


engine = create_engine(DATABASE_URL)
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


# Dependency to get the database session
def get_db():
    database = session_local()
    try:
        yield database
    finally:
        database.close()
