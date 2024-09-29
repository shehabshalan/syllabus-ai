import diskcache
from fastapi import APIRouter

router = APIRouter(prefix="/internal", tags=["internal"])


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/cache")
def invalidate_cache():
    cache = diskcache.Cache("cache")
    cache.clear()
    return {"status": "ok"}
