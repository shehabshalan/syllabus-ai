from fastapi import HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer

from app.utils.schema import UserResponse

from ..services import user_service

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(request: Request) -> UserResponse:
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    token = token.replace("Bearer ", "")
    user = await user_service.get_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    return user
