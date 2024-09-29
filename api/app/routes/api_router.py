from fastapi import APIRouter

from app.routes import generation, internal

api_router = APIRouter()

api_router.include_router(generation.router, prefix="/generation", tags=["generation"])
api_router.include_router(internal.router)
