from datetime import datetime, timedelta

import requests
from fastapi import HTTPException, status
from jose import JWTError, jwt

from app.utils.settings import settings

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def generate_access_token(data: dict):
    try:
        if not settings.JWT_SECRET_KEY:
            raise ValueError("No secret key configured for JWT")

        to_encode = data.copy()
        print(to_encode)
        expire = datetime.now() + timedelta(hours=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, settings.JWT_SECRET_KEY, algorithm=ALGORITHM
        )
        return encoded_jwt
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Failed to generate access token",
        )


def verify_google_token(token: str):
    if not settings.GOOGLE_CLIENT_ID:
        raise ValueError("No client ID configured for Google OAuth")

    # Verify the token using Google's tokeninfo endpoint
    response = requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?access_token={token}"
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    id_info = response.json()

    # Fetch additional user info using the People API
    user_info_response = requests.get(
        "https://www.googleapis.com/oauth2/v1/userinfo", params={"access_token": token}
    )

    if user_info_response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Failed to fetch user info",
        )

    user_info = user_info_response.json()

    # Combine the token info and user info
    id_info.update(user_info)

    user_info = {
        "email": id_info["email"],
        "name": id_info["name"],
        "picture": id_info["picture"],
        "id": id_info["id"],
    }

    return user_info


def verify_token(token: str):
    payload = None
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as e:
        print(e)
    except AssertionError as e:
        print(e)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    return payload


def get_current_user(token: str = None):
    return verify_token(token)
