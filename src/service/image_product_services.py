from src.repository import image_product_repository
from src.service.product_services import get_product_by_id
from src.service.image_services import get_image_by_id
from src.database.models import ProductImages
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists
from src.database.models import ImageTypeEnum


def get_all_image_products():
    image_products = image_product_repository.get_all_image_products()
    return [ProductImages(**image_product) for image_product in image_products]


def get_image_product_by_id(image_product_id: int):
    image_product = image_product_repository.get_image_product_by_id(image_product_id)
    if not image_product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Image product not found')
    return ProductImages(**image_product) if image_product else None


def get_image_product_by_product_id(product_id: int):
    image_products = image_product_repository.get_image_product_by_product_id(product_id)
    if not image_products:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Image product not found')
    return [ProductImages(**image_product) for image_product in image_products]


def create_image_product(image_product: ProductImages):
    get_product_by_id(image_product.ProductID)
    get_image_by_id(image_product.ImageID)
    image_product_id = image_product_repository.create_image_product(image_product)
    return get_image_product_by_id(image_product_id)


def update_image_product(image_product_id: int, image_product: ProductImages):
    get_image_product_by_id(image_product_id)
    get_product_by_id(image_product.ProductID)
    get_image_by_id(image_product.ImageID)
    image_product_repository.update_image_product(image_product_id, image_product)
    return {"message": "Image product updated successfully"}


def delete_image_product(image_product_id: int):
    get_image_product_by_id(image_product_id)
    image_product_repository.delete_image_product(image_product_id)
    return {"message": "Image product deleted successfully"}
