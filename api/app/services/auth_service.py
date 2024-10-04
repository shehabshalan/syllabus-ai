from app.db.core import Users
from app.utils.jwt import generate_access_token, verify_google_token
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


async def auth_user(token: str, session: Session):
    user_info = verify_google_token(token)
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    user = session.query(Users).filter(Users.email == user_info["email"]).first()

    if not user:
        user = Users(
            email=user_info["email"],
            name=user_info["name"],
            picture=user_info["picture"],
            is_active=True,
        )
        session.add(user)
        session.commit()
        session.refresh(user)

    token = generate_access_token(user)
    return {"token": token, "user": user}
