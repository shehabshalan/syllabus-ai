from app.db.core import Users, model_dump
from app.utils.jwt import generate_access_token, verify_google_token
from app.utils.schema import UserResponse
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


async def auth_user(token: str, session: Session) -> UserResponse:
    user_info = verify_google_token(token)
    user = session.query(Users).filter(Users.email == user_info["email"]).first()

    if not user:
        try:
            user = Users(
                email=user_info["email"],
                name=user_info["name"],
                picture=user_info["picture"],
                google_id=user_info["id"],
            )
            session.add(user)
            session.commit()
            session.refresh(user)
        except Exception as e:
            print(e)
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An error occurred while processing the request",
            )
    user = model_dump(user)
    token = generate_access_token(user)
    return UserResponse(**user, token=token)
