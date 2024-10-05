import diskcache
from fastapi import APIRouter

router = APIRouter(prefix="/internal", tags=["Internal"])


@router.get("/health", operation_id="health")
def health():
    return {"status": "ok"}


@router.post("/cache", operation_id="invalidate_cache")
def invalidate_cache():
    cache = diskcache.Cache("cache")
    cache.clear()
    return {"status": "ok"}
