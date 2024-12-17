from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from app.db import init_db
from app.routes.generation_route import router as generation_router
from app.routes.internal_route import router as internal_router
from app.routes.user_route import router as user_router
from app.utils.logger import logger
from app.utils.settings import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    generate_openapi()
    yield


app = FastAPI(lifespan=lifespan)


def generate_openapi():
    openapi_schema = get_openapi(
        title="SyllabusAI API",
        version="1.0.0",
        description="AI powered learning",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    logger.info("OpenAPI schema generated")
    return app.openapi_schema


# Override the default openapi function
app.openapi = generate_openapi

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(generation_router)
app.include_router(internal_router)
