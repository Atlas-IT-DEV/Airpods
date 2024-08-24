from src.repository import category_repository
from src.database.models import Categories
from fastapi import HTTPException, status


def get_all_categories():
    categories = category_repository.get_all_categories()
    return [Categories(**category) for category in categories]


def get_category_by_id(category_id: int):
    category = category_repository.get_category_by_id(category_id)
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Category not found')
    return Categories(**category) if category else None


def create_category(category: Categories):
    category_id = category_repository.create_category(category)
    return get_category_by_id(category_id)


def update_category(category_id: int, category: Categories):
    existing_category = get_category_by_id(category_id)
    category_repository.update_category(category_id, category)
    return {"message": "Category updated successfully"}


def delete_category(category_id: int):
    existing_category = get_category_by_id(category_id)
    category_repository.delete_category(category_id)
    return {"message": "Category deleted successfully"}
