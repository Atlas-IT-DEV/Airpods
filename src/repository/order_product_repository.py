from src.database.my_connector import Database
from src.database.models import OrderProducts
db = Database()


def get_all_orders_products():
    query = "SELECT * FROM order_products"
    return db.fetch_all(query)


def get_order_product_by_id(order_product_id: int):
    query = "SELECT * FROM order_products WHERE id=%s"
    return db.fetch_one(query, (order_product_id,))


def get_order_product_by_order_id(order_id: int):
    query = "SELECT * FROM order_products WHERE order_id=%s"
    return db.fetch_all(query, (order_id,))


def create_order_product(order_product: OrderProducts):
    query = "INSERT INTO order_products (order_id, product_id, quantity) VALUES (%s, %s, %s)"
    params = (order_product.OrderID, order_product.ProductID, order_product.Quantity)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_order_product(order_product_id: int, order_product: OrderProducts):
    query = "UPDATE order_products SET order_id=%s, product_id=%s, quantity=%s WHERE id=%s"
    params = (order_product.OrderID, order_product.ProductID, order_product.Quantity, order_product_id)
    db.execute_query(query, params)


def delete_order_product(order_product_id: int):
    query = "DELETE FROM order_products WHERE id=%s"
    db.execute_query(query, (order_product_id,))
