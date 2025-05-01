import logging
from typing import Annotated

import jwt
from fastapi import HTTPException, status
from fastapi.params import Depends
from fastapi.security import APIKeyHeader

from app.utils.constants import ALGORITHM
from app.utils.schema import UserResponse
from app.utils.settings import settings

oauth2_scheme = APIKeyHeader(name="Authorization")


def verify_token(token: str) -> UserResponse:
    payload = None
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        logging.error("Token has expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    except jwt.InvalidTokenError:
        logging.error("Invalid token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    except jwt.DecodeError:
        logging.error("Error decoding token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    except jwt.InvalidSignatureError:
        logging.error("Invalid signature")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    return UserResponse(
        id=payload.get("id"),
        email=payload.get("email"),
        name=payload.get("name"),
        picture=payload.get("picture"),
        is_active=payload.get("is_active"),
    )


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    return verify_token(token)
