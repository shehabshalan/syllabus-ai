from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.core import get_session
from app.services import auth_service
from app.utils.schema import AuthRequest, UserResponse

router = APIRouter(
    tags=["Authentication"],
)


@router.post(
    "/auth",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK
    | status.HTTP_201_CREATED
    | status.HTTP_401_UNAUTHORIZED,
)
async def auth(request: AuthRequest, session: Session = Depends(get_session)):
    return await auth_service.auth_user(request.token, session)
