from fastapi import Depends, HTTPException, status
from typing import Annotated
from jwt import InvalidTokenError
import jwt
from pydantic import BaseModel
from sqlmodel import Session
from app.models import engine
from app.routers.auth import auth_scheme, SECRET_KEY, ALGORITHM

def get_session():
    with Session(engine) as s:
        yield s

SessionDep = Annotated[Session, Depends(get_session)]

class UserFromToken(BaseModel):
    id : int
    name : str

def get_current_user_id_name(token : Annotated[str, Depends(auth_scheme)]) -> UserFromToken:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        data : str = payload.get("sub")
        if data is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception

    id, name = data.split(":")
    try:
        id = int(id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return UserFromToken(id=id, name=name)

def get_current_user_id(user : Annotated[UserFromToken, Depends(get_current_user_id_name)]) -> int:
    return user.id

def get_current_user_name(user : Annotated[UserFromToken, Depends(get_current_user_id_name)]) -> str:
    return user.name
