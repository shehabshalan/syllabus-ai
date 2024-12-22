from typing import Dict, Optional

from sqlalchemy import (
    URL,
    Boolean,
    ForeignKey,
    Integer,
    String,
    Text,
    case,
    create_engine,
    func,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    Session,
    joinedload,
    mapped_column,
    relationship,
    sessionmaker,
)
from sqlalchemy.pool import QueuePool

from app.utils.logger import logger
from app.utils.schema import GetChapterResponse, UserTopics
from app.utils.settings import settings


def get_ssl_params() -> Dict[str, str]:
    if settings.MODE == "prod":
        return {"sslmode": "require"}
    return {}


def create_db_url():
    url = URL(
        drivername=settings.DB_DRIVER,
        username=settings.DB_USER,
        password=settings.DB_PASSWORD,
        host=settings.DB_HOST,
        port=settings.DB_PORT,
        database=settings.DB_NAME,
        query=get_ssl_params(),
    )
    return url


DATABASE_URL = create_db_url()
engine = create_engine(
    DATABASE_URL, poolclass=QueuePool, pool_size=10, max_overflow=20, pool_pre_ping=True
)
session_maker = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    google_id: Mapped[Optional[str]] = mapped_column(String(255), unique=True)
    picture: Mapped[Optional[str]] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"


class Topics(Base):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    progress: Mapped[int] = mapped_column(Integer, default=0)
    # Relationship to chapters
    chapters = relationship("Chapters", backref="topic", lazy="select")

    def __repr__(self):
        return f"<Topic(id={self.id}, title={self.title}, progress={self.progress})>"


class Chapters(Base):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    short_description: Mapped[str] = mapped_column(Text, nullable=True)
    content: Mapped[str] = mapped_column(Text, nullable=True)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)

    def __repr__(self):
        return f"<Chapter(id={self.id}, title={self.title})>"


class ChapterSimplifiedVersions(Base):
    __tablename__ = "chapter_simplified_versions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"), nullable=False)
    simplified_content: Mapped[str] = mapped_column(Text, nullable=True)

    def __repr__(self):
        return f"<ChapterSimplifiedVersion(id={self.id}, chapter_id={self.chapter_id})>"


class Flashcards(Base):
    __tablename__ = "flashcards"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"), nullable=False)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)

    def __repr__(self):
        return f"<Flashcard(id={self.id}, chapter_id={self.chapter_id}, question={self.question})>"


class Quizzes(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"), nullable=False)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    possible_answers: Mapped[str] = mapped_column(
        Text, nullable=True
    )  # Could store JSON as text
    correct_answer: Mapped[str] = mapped_column(Text, nullable=True)

    def __repr__(self):
        return f"<Quiz(id={self.id}, chapter_id={self.chapter_id}, question={self.question})>"


def init_db():
    Base.metadata.create_all(bind=engine)
    logger.info("Database initialized")


# Dependency to get the database session
def get_session():
    session = session_maker()
    try:
        yield session
    finally:
        session.close()


def model_dump(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}


def create_topic(session: Session, user_id: int, title: str) -> Topics:
    new_topic = Topics(user_id=user_id, title=title)
    session.add(new_topic)
    session.commit()
    session.refresh(new_topic)
    return new_topic


def create_chapter(
    session: Session, topic_id: int, title: str, short_description: str
) -> Chapters:
    new_chapter = Chapters(
        topic_id=topic_id, title=title, short_description=short_description, content=""
    )
    session.add(new_chapter)
    session.commit()
    session.refresh(new_chapter)
    return model_dump(new_chapter)


def get_user_topic_chapters_by_id(
    session: Session, topic_id: int, user_id: int
) -> dict:
    topic_with_chapters = (
        session.query(Topics)
        .join(Chapters, Topics.id == Chapters.topic_id)
        .filter(Topics.id == topic_id, Topics.user_id == user_id)
        .options(joinedload(Topics.chapters))
        .first()
    )

    if topic_with_chapters:
        sorted_chapters = sorted(topic_with_chapters.chapters, key=lambda x: x.id)
        return {
            "id": topic_with_chapters.id,
            "title": topic_with_chapters.title,
            "chapters": [
                {
                    "id": chapter.id,
                    "title": chapter.title,
                    "description": chapter.short_description,
                    "content": chapter.content,
                    "is_read": chapter.is_read,
                }
                for chapter in sorted_chapters
            ],
        }
    return None


def get_user_topics(session: Session, user_id: int) -> list[UserTopics]:
    topics_with_counts = (
        session.query(
            Topics,
            func.count(Chapters.id).label("total_chapters"),
            func.count(case((Chapters.is_read, 1))).label("read_chapters"),
        )
        .outerjoin(Chapters, Topics.id == Chapters.topic_id)
        .filter(Topics.user_id == user_id)
        .group_by(Topics.id)
        .all()
    )

    return [
        {
            "id": topic.id,
            "title": topic.title,
            "progress": int(
                round((read_count / total_count * 100) if total_count > 0 else 0)
            ),
            "chapter_count": total_count,
        }
        for topic, total_count, read_count in topics_with_counts
    ]


def get_topic_by_title(session: Session, title: str, user_id: int) -> Topics:
    return (
        session.query(Topics)
        .filter(Topics.title == title, Topics.user_id == user_id)
        .first()
    )


def get_chapter_by_title(
    session: Session, title: str, chapter_id: int, user_id: int
) -> Chapters:
    chapter = (
        session.query(Chapters)
        .filter(
            Chapters.title == title,
            Chapters.id == chapter_id,
            Topics.user_id == user_id,
        )
        .first()
    )
    if chapter.content:
        return chapter
    return None


def get_chapter_by_id(
    session: Session, chapter_id: int, user_id: int
) -> GetChapterResponse:
    chapter = (
        session.query(Chapters)
        .join(Topics, Topics.id == Chapters.topic_id)
        .filter(Chapters.id == chapter_id, Topics.user_id == user_id)
        .first()
    )
    if chapter:
        return model_dump(chapter)
    return None


def update_chapter_content(
    session: Session, chapter_id: int, user_id: int, content: str
):
    chapter = (
        session.query(Chapters)
        .join(Topics, Topics.id == Chapters.topic_id)
        .filter(Chapters.id == chapter_id, Topics.user_id == user_id)
        .first()
    )

    if chapter:
        chapter.content = content
        session.commit()
        return
    return None


def update_user_chapter_read_status(
    session: Session, chapter_id: int, user_id: int, is_read: bool
):
    chapter = (
        session.query(Chapters)
        .join(Topics, Topics.id == Chapters.topic_id)
        .filter(Chapters.id == chapter_id, Topics.user_id == user_id)
        .first()
    )

    if chapter:
        chapter.is_read = is_read
        session.commit()
        return
    return None
