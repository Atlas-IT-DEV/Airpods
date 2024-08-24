from src.repository import user_repository
from src.database.models import Users
from fastapi import HTTPException, status
from src.service.image_services import get_image_by_id


def get_all_users():
    users = user_repository.get_all_users()
    return [Users(**user) for user in users]


def get_user_by_id(user_id: int):
    user = user_repository.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return Users(**user) if user else None


def get_user_by_telegram_id(telegram_id: int):
    user = user_repository.get_user_by_telegram_id(telegram_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return Users(**user) if user else None


def create_user(user: Users):
    if not user.IconID is None:
        existing_image = get_image_by_id(user.IconID)
    user_id = user_repository.create_user(user)
    return get_user_by_id(user_id)


def update_user(user_id: int, user: Users):
    existing_user = get_user_by_id(user_id)
    user_repository.update_user(user_id, user)
    return {"message": "User updated successfully"}


def delete_user(user_id: int):
    existing_user = get_user_by_id(user_id)
    user_repository.delete_user(user_id)
    return {"message": "User deleted successfully"}

