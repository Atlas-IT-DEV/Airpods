from src.repository import order_product_repository
from src.database.models import OrderProducts
from fastapi import HTTPException, status


def get_all_orders_products():
    orders_products = order_product_repository.get_all_orders_products()
    return [OrderProducts(**order_product) for order_product in orders_products]


def get_order_product_by_id(order_product_id: int):
    order_product = order_product_repository.get_order_product_by_id(order_product_id)
    if not order_product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order product not found")
    return OrderProducts(**order_product) if order_product else None


def get_order_product_by_order_id(order_id: int):
    orders = order_product_repository.get_order_product_by_order_id(order_id)
    if not orders:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return [OrderProducts(**orders) for orders in orders]


def create_order_product(order_product: OrderProducts):
    order_product_id = order_product_repository.create_order_product(order_product)
    return get_order_product_by_id(order_product_id)


def update_order_product(order_product_id: int, order_product: OrderProducts):
    existing_order_product = get_order_product_by_id(order_product_id)
    order_product_repository.update_order_product(order_product_id, order_product)
    return {"message": "Order product updated successfully"}


def delete_order_product(order_product_id: int):
    existing_order_product = get_order_product_by_id(order_product_id)
    order_product_repository.delete_order_product(order_product_id)
    return {"message": "Order product deleted successfully"}
