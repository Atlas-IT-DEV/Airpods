from src.database.my_connector import Database
from src.database.models import ProductComments
db = Database()


def get_all_product_comments():
    query = "SELECT * FROM product_comments"
    return db.fetch_all(query)


def get_product_comment_by_id(product_comment_id: int):
    query = "SELECT * FROM product_comments WHERE id=%s"
    return db.fetch_one(query, (product_comment_id,))


def create_product_comment(product_comment: ProductComments):
    query = ("INSERT INTO product_comments (product_id, user_id, comment, created_at)"
             " VALUES (%s, %s, %s, %s)")
    params = (product_comment.ProductID, product_comment.UserID,  product_comment.Comment,
              product_comment.CreatedAt)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_product_comment(product_comment_id: int, product_comment: ProductComments):
    query = "UPDATE product_comments SET product_id=%s, user_id=%s, comment=%s, created_at=%s WHERE id=%s"
    params = (product_comment.ProductID, product_comment.UserID, product_comment.Comment,
              product_comment.CreatedAt, product_comment_id)
    db.execute_query(query, params)


def delete_product_comment(product_comment_id: int):
    query = "DELETE FROM product_comments WHERE id=%s"
    db.execute_query(query, (product_comment_id,))
