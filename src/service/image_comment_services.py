from src.repository import image_comment_repository
from src.service.product_comment_services import get_product_comment_by_id
from src.service.image_services import get_image_by_id
from src.database.models import CommentImages
from fastapi import HTTPException, status


def get_all_image_comments():
    image_comments = image_comment_repository.get_all_image_comments()
    return [CommentImages(**image_comment) for image_comment in image_comments]


def get_image_comment_by_id(image_comment_id: int):
    image_comment = image_comment_repository.get_image_comment_by_id(image_comment_id)
    if not image_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Image comment not found')
    return CommentImages(**image_comment) if image_comment else None


def get_image_comment_by_comment_id(comment_id: int):
    image_comments = image_comment_repository.get_image_comment_by_comment_id(comment_id)
    if not image_comments:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Image comment not found')
    return [CommentImages(**image_comment) for image_comment in image_comments]


def create_image_comment(image_comment: CommentImages):
    get_product_comment_by_id(image_comment.CommentID)
    get_image_by_id(image_comment.ImageID)
    image_comment_id = image_comment_repository.create_image_comment(image_comment)
    return get_image_comment_by_id(image_comment_id)


def update_image_comment(image_comment_id: int, image_comment: CommentImages):
    get_image_comment_by_id(image_comment_id)
    get_image_comment_by_comment_id(image_comment.CommentID)
    get_image_by_id(image_product.ImageID)
    image_comment_repository.update_image_comment(image_comment_id, image_comment)
    return {"message": "Image comment updated successfully"}


def delete_image_comment(image_comment_id: int):
    get_image_comment_by_id(image_comment_id)
    image_comment_repository.delete_image_comment(image_comment_id)
    return {"message": "Image comment deleted successfully"}
