from src.repository import product_repository
from src.database.models import Products
from fastapi import HTTPException, status


def get_all_products():
    products = product_repository.get_all_products()
    return [Products(**product) for product in products]


def get_product_by_id(product_id: int):
    product = product_repository.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    return Products(**product) if product else None


def create_product(product: Products):
    product_id = product_repository.create_product(product)
    return get_product_by_id(product_id)


def update_product(product_id: int, product: Products):
    existing_product = get_product_by_id(product_id)
    product_repository.update_product(product_id, product)
    return {"message": "Product updated successfully"}


def delete_product(product_id: int):
    existing_product = get_product_by_id(product_id)
    product_repository.delete_product(product_id)
    return {"message": "Product deleted successfully"}
