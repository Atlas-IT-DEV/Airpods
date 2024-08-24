from src.repository import order_repository
from src.service import user_services, product_services, order_product_services
from src.database.models import Orders, OrderProducts, Products, ProductsDict
from fastapi import HTTPException, status
from datetime import datetime


def get_all_orders():
    orders = order_repository.get_all_orders()
    return [Orders(**order) for order in orders]


def get_order_by_id(order_id: int):
    order = order_repository.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Order not found')
    return Orders(**order) if order else None


def get_order_by_user_id(user_id: int):
    orders = order_repository.get_order_by_user_id(user_id)
    if not orders:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Order not found')
    return [Orders(**order) for order in orders]


def create_order(order: Orders):
    order_id = order_repository.create_order(order)
    return get_order_by_id(order_id)


def update_order(order_id: int, order: Orders):
    existing_order = get_order_by_id(order_id)
    order_repository.update_order(order_id, order)
    return {"message": "Order updated successfully"}


def delete_order(order_id: int):
    existing_order = get_order_by_id(order_id)
    order_repository.delete_order(order_id)
    return {"message": "Order deleted successfully"}


def place_an_order(user_id: int, products: list[ProductsDict]):
    user = user_services.get_user_by_id(user_id)
    # Создаем заказ
    order = create_order(Orders(user_id=user.ID, date=datetime.now(), total_price=1))
    # Добавляем товары в заказ
    list_added_product = []
    for product in products:
        product_id = product.ProductID
        quantity = product.Quantity
        current_order_products = order_product_services.create_order_product(OrderProducts(order_id=order.ID,
                                                                                                 product_id=product_id,
                                                                                                 quantity=quantity))
        list_added_product.append(current_order_products.ID)
    list_order_products = []
    # Собираем заказы и рассчитываем итоговую стоимость заказа
    for add in list_added_product:
        list_order_products.append(order_product_services.get_order_product_by_id(add))
    total_price = 0
    for order_product in list_order_products:
        product = product_services.get_product_by_id(order_product.ProductID)
        total_price += product.Price * order_product.Quantity
    update_order(order_id=order.ID, order=Orders(user_id=user.ID,
                                                       date=datetime.now(),
                                                       total_price=total_price))
    return list_order_products


def get_hystory_orders_by_user_id(user_id: int):
    user = user_services.get_user_by_id(user_id)
    # Получаем всю историю заказов пользователя
    list_hystory = []
    orders = get_order_by_user_id(user.ID)
    for order in orders:
        if not order:
            continue
        list_hystory.append(order_product_services.get_order_product_by_order_id(order.ID))
    return list_hystory
