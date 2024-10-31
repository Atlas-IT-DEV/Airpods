from src.database.my_connector import db
from src.database.models import Products


def get_all_products():
    query = "SELECT * FROM products ORDER BY category_id, position"
    return db.fetch_all(query)


def get_product_by_id(product_id: int):
    query = "SELECT * FROM products WHERE id=%s"
    return db.fetch_one(query, (product_id,))


def create_product(product: Products):
    query = ("INSERT INTO products (name, promotion_id,"
             " currency_id, company_id, category_id, price, is_active, position)"
             " VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")
    params = (product.Name, product.PromotionID, product.CurrencyID,
              product.CompanyID, product.CategoryID, product.Price, product.IsActive, product.Position)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_product(product_id: int, product: Products):
    query = ("UPDATE products SET name=%s, promotion_id=%s, currency_id=%s,"
             " company_id=%s, category_id=%s, price=%s, is_active=%s, position=%s WHERE id=%s")
    params = (product.Name, product.PromotionID, product.CurrencyID,
              product.CompanyID, product.CategoryID, product.Price, product.IsActive, product.Position, product_id)
    db.execute_query(query, params)


def delete_product(product_id: int):
    query = "DELETE FROM products WHERE id=%s"
    db.execute_query(query, (product_id,))
