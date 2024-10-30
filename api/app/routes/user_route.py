from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from app.db.core import get_session
from app.services import user_service
from app.utils.schema import AuthRequest, UserResponse

router = APIRouter(tags=["User"], prefix="/user")


@router.post(
    "/auth",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    operation_id="auth",
)
async def auth(
    request: AuthRequest, session: Session = Depends(get_session)
) -> UserResponse:
    return await user_service.auth_user(request.token, session)


@router.get("/me", response_model=UserResponse, operation_id="me")
async def me(request: Request) -> UserResponse:
    token = request.headers.get("Authorization")
    return await user_service.get_user(token)
