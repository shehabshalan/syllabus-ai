from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.api_router import api_router
from app.utils.settings import settings

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://syllabusai.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix=settings.API_V1_STR)
