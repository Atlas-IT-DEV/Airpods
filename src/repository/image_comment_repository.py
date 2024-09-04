from src.database.my_connector import db
from src.database.models import CommentImages
from datetime import datetime


def get_all_image_comments():
    query = "SELECT * FROM comment_images"
    return db.fetch_all(query)


def get_image_comment_by_id(image_comment_id: int):
    query = "SELECT * FROM comment_images WHERE id=%s"
    return db.fetch_one(query, (image_comment_id,))


def get_image_comment_by_comment_id(comment_id: int):
    query = "SELECT * FROM comment_images WHERE comment_id=%s"
    return db.fetch_all(query, (comment_id,))


def create_image_comment(image_comment: CommentImages):
    query = "INSERT INTO comment_images (comment_id, image_id) VALUES (%s, %s)"
    params = (image_comment.CommentID, image_comment.ImageID)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_image_comment(image_comment_id: int, image_comment: CommentImages):
    query = "UPDATE comment_images SET comment_id=%s, image_id=%s=%s WHERE id=%s"
    params = (image_comment.CommentID, image_comment.ImageID, image_comment_id)
    db.execute_query(query, params)


def delete_image_comment(image_comment_id: int):
    query = "DELETE FROM comment_images WHERE id=%s"
    db.execute_query(query, (image_comment_id,))







