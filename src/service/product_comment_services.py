from src.repository import product_comment_repository
from src.service.user_services import get_user_by_id
from src.service.product_services import get_product_by_id
from src.database.models import ProductComments
from fastapi import HTTPException, status


def get_all_product_comments():
    product_comments = product_comment_repository.get_all_product_comments()
    return [ProductComments(**product_comment) for product_comment in product_comments]


def get_product_comment_by_id(product_comment_id: int):
    product_comment = product_comment_repository.get_product_comment_by_id(product_comment_id)
    if not product_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product Comment not found')
    return ProductComments(**product_comment) if product_comment else None


def create_product_comment(product_comment: ProductComments):
    existing_user = get_user_by_id(product_comment.UserID)
    existing_product = get_product_by_id(product_comment.ProductID)
    product_comment_id = product_comment_repository.create_product_comment(product_comment)
    return get_product_comment_by_id(product_comment_id)


def update_product_comment(product_comment_id: int, product_comment: ProductComments):
    existing_product_comment = get_product_comment_by_id(product_comment_id)
    existing_user = get_user_by_id(product_comment.UserID)
    existing_product = get_product_by_id(product_comment.ProductID)
    product_comment_repository.update_product_comment(product_comment_id, product_comment)
    return {"message": "Order comment updated successfully"}


def delete_order_comment(order_comment_id: int):
    existing_product_comment = get_product_comment_by_id(order_comment_id)
    order_comment_repository.delete_order_comment(order_comment_id)
    return {"message": "Order comment deleted successfully"}
