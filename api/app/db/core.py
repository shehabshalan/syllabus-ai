from typing import Optional

from app.utils.settings import settings
from sqlalchemy import URL, ForeignKey, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker


def create_db_url():
    url = URL(
        drivername=settings.DB_DRIVER,
        username=settings.DB_USER,
        password=settings.DB_PASSWORD,
        host=settings.DB_HOST,
        port=settings.DB_PORT,
        database=settings.DB_NAME,
        query={},
    )
    return url


DATABASE_URL = create_db_url()
engine = create_engine(DATABASE_URL)
session_maker = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    email: Mapped[str]
    google_id: Mapped[Optional[str]]
    picture: Mapped[Optional[str]]
    is_active: Mapped[bool] = mapped_column(default=True)

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email}, is_verified={self.is_verified})>"


class Topics(Base):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    title: Mapped[str]
    progress: Mapped[int] = mapped_column(default=0)

    def __repr__(self):
        return f"<Topic(id={self.id}, title={self.title}, progress={self.progress})>"


class Chapters(Base):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str]
    content: Mapped[str]
    short_description: Mapped[str]
    is_read: Mapped[bool] = mapped_column(default=False)
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"))

    def __repr__(self):
        return f"<Chapter(id={self.id}, title={self.title}, content={self.content}, short_description={self.short_description}, is_read={self.is_read})>"


class TopicChapters(Base):
    __tablename__ = "topic_chapters"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"))
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"))

    def __repr__(self):
        return f"<TopicChapter(id={self.id}, chapter_id={self.chapter_id}, topic_id={self.topic_id})>"


def init_db():
    Base.metadata.create_all(bind=engine)


# Dependency to get the database session
def get_session():
    session = session_maker()
    try:
        yield session
    finally:
        session.close()


def model_dump(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}
