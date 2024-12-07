from typing import Optional

from app.utils.settings import settings
from sqlalchemy import URL, Boolean, ForeignKey, Integer, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker


def create_db_url():
    url = URL(
        drivername=settings.DB_DRIVER,
        username=settings.DB_USER,
        password=settings.DB_PASSWORD,
        host=settings.DB_HOST,
        port=settings.DB_PORT,
        database=settings.DB_NAME,
        query={},  # type: ignore
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
    return model_dump(new_topic)


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
