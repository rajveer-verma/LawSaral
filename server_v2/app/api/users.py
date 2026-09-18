from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.config.database import db


router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


@router.post("/login")
def save_user(
    current_user: dict = Depends(get_current_user)
):
    firebase_uid = current_user.get("uid")

    user_data = {
        "firebase_uid": firebase_uid,
        "name": current_user.get("name") or current_user.get("displayName"),
        "email": current_user.get("email"),
        "photoURL": current_user.get("picture") or current_user.get("photoURL"),
    }

    db.users.update_one(
        {"firebase_uid": firebase_uid},
        {"$set": user_data},
        upsert=True,
    )

    return {
        "message": "User synced successfully",
        "user": user_data,
    }