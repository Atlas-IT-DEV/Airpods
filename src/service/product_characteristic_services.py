from src.repository import product_characteristic_repository
from src.service.product_services import get_product_by_id
from src.service.characteristic_services import get_characteristic_by_id
from src.database.models import ProductCharacteristics
from fastapi import HTTPException, status


def get_all_product_characteristics():
    product_characteristics = product_characteristic_repository.get_all_product_characteristics()
    return [ProductCharacteristics(**product_characteristic) for product_characteristic in product_characteristics]


def get_product_characteristic_by_id(product_characteristic_id: int):
    product_characteristic = product_characteristic_repository.get_product_characteristic_by_id(product_characteristic_id)
    if not product_characteristic:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Product Characteristic not found')
    return ProductCharacteristics(**product_characteristic) if product_characteristic else None


def get_product_characteristic_by_user_id(user_id: int):
    product_characteristics = product_characteristic_repository.get_product_characteristic_by_user_id(user_id)
    if not product_characteristics:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Product Characteristic not found')
    return [ProductCharacteristics(**product_characteristic) for product_characteristic in product_characteristics]


def create_product_characteristic(product_characteristic: ProductCharacteristics):
    existing_product = get_product_by_id(product_characteristic.ProductID)
    existing_characteristic = get_characteristic_by_id(product_characteristic.CharacteristicID)
    product_characteristic_id = product_characteristic_repository.create_product_characteristic(product_characteristic)
    return get_product_characteristic_by_id(product_characteristic_id)


def update_product_characteristic(product_characteristic_id: int, product_characteristic: ProductCharacteristics):
    existing_product_characteristic = get_product_characteristic_by_id(product_characteristic_id)
    existing_product = get_product_by_id(product_characteristic.ProductID)
    existing_characteristic = get_characteristic_by_id(product_characteristic.CharacteristicID)
    product_characteristic_repository.update_product_characteristic(product_characteristic_id, product_characteristic)
    return {"message": "Product characteristic updated successfully"}


def delete_product_characteristic(product_characteristic_id: int):
    existing_product_characteristic = get_product_characteristic_by_id(product_characteristic_id)
    product_characteristic_repository.delete_product_characteristic(product_characteristic_id)
    return {"message": "Product characteristic deleted successfully"}
