from src.database.my_connector import Database
from src.database.models import Products
db = Database()


def get_all_products():
    query = "SELECT * FROM products"
    return db.fetch_all(query)


def get_product_by_id(product_id: int):
    query = "SELECT * FROM products WHERE id=%s"
    return db.fetch_one(query, (product_id,))


def create_product(product: Products):
    query = ("INSERT INTO products (name, price, company_id, category_id, image_id)"
             " VALUES (%s, %s, %s, %s, %s)")
    params = (product.Name, product.Price, product.CompanyID, product.CategoryID, product.ImageID)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_product(product_id: int, product: Products):
    query = "UPDATE products SET name=%s, price=%s, company_id=%s, category_id=%s, image_id=%s WHERE id=%s"
    params = (product.Name, product.Price, product.CompanyID, product.CategoryID, product.ImageID, product_id)
    db.execute_query(query, params)


def delete_product(product_id: int):
    query = "DELETE FROM products WHERE id=%s"
    db.execute_query(query, (product_id,))
