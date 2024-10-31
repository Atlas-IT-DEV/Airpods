from src.database.my_connector import db
from src.database.models import Storis

# Egor 29.10.2024
def get_all_storis():
    query = "SELECT * FROM storis"
    return db.fetch_all(query)


def get_storis_by_id(storis_id: int):
    query = "SELECT * FROM storis WHERE id=%s"
    return db.fetch_one(query, (storis_id,))


def get_storis_by_product_id(product_id: int):
    query = "SELECT * FROM storis WHERE product_id=%s"
    return db.fetch_all(query, (product_id,))


def create_storis(storis: Storis):
    query = ("INSERT INTO storis (product_id, name, image_url, link)"
             " VALUES (%s, %s, %s, %s)")
    params = (storis.ProductID, storis.Name, storis.ImageUrl, storis.Link)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_storis(storis_id: int, storis: Storis):
    query = "UPDATE storis SET product_id=%s, name=%s, image_url=%s, link=%s WHERE id=%s"
    params = (storis.ProductID, storis.Name, storis.ImageUrl, storis.Link, storis_id)
    db.execute_query(query, params)


def delete_storis(storis_id: int):
    query = "DELETE FROM storis WHERE id=%s"
    db.execute_query(query, (storis_id,))
# /Egor 29.10.2024