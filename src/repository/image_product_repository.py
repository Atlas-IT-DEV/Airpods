from src.database.my_connector import db
from src.database.models import ProductImages
from datetime import datetime


def get_all_image_products():
    query = "SELECT * FROM product_images"
    return db.fetch_all(query)


def get_image_product_by_id(image_product_id: int):
    query = "SELECT * FROM product_images WHERE id=%s"
    return db.fetch_one(query, (image_product_id,))


def get_image_product_by_product_id(product_id: int):
    query = "SELECT * FROM product_images WHERE product_id=%s ORDER BY image_type ASC"
    return db.fetch_all(query, (product_id,))


def create_image_product(image_product: ProductImages):
    query = "INSERT INTO product_images (product_id, image_id, image_type, color) VALUES (%s, %s, %s, %s)"
    params = (image_product.ProductID, image_product.ImageID, image_product.ImageType, image_product.Color)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_image_product(image_product_id: int, image_product: ProductImages):
    query = "UPDATE product_images SET product_id=%s, image_id=%s, image_type=%s, color=%s WHERE id=%s"
    params = (image_product.ProductID, image_product.ImageID, image_product.ImageType, image_product.Color, image_product_id)
    db.execute_query(query, params)


def delete_image_product(image_product_id: int):
    query = "DELETE FROM product_images WHERE id=%s"
    db.execute_query(query, (image_product_id,))


def delete_image_product_by_image_id(image_id: int):
    query = "DELETE FROM product_images WHERE image_id=%s"
    db.fetch_all(query, (image_id,))
