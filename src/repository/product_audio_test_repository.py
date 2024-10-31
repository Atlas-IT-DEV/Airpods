from src.database.my_connector import db
from src.database.models import ProductAudio

# Egor 29.10.2024
def get_all_product_audio_test():
    query = "SELECT * FROM product_audio_test"
    return db.fetch_all(query)


def get_product_audio_test_by_id(product_audio_id: int):
    query = "SELECT * FROM product_audio_test WHERE id=%s"
    return db.fetch_one(query, (product_audio_id,))


def get_product_audio_test_by_product_id(product_id: int):
    query = "SELECT * FROM product_audio_test WHERE product_id=%s"
    return db.fetch_all(query, (product_id,))


def create_product_audio_test(product_audio_test: ProductAudio):
    query = ("INSERT INTO product_audio_test (product_id, original_url, our_url)"
             " VALUES (%s, %s, %s)")
    params = (product_audio_test.ProductID, product_audio_test.OriginalUrl, product_audio_test.OurUrl)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_product_audio_test(product_audio_id: int, product_audio_test: ProductAudio):
    query = "UPDATE product_audio_test SET product_id=%s, original_url=%s, our_url=%s WHERE id=%s"
    params = (product_audio_test.ProductID, product_audio_test.OriginalUrl, product_audio_test.OurUrl, product_audio_id)
    db.execute_query(query, params)


def delete_product_audio_test(product_audio_id: int):
    query = "DELETE FROM product_audio_test WHERE id=%s"
    db.execute_query(query, (product_audio_id,))
# /Egor 29.10.2024