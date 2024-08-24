from src.database.my_connector import Database
from src.database.models import Characteristics
db = Database()


def get_all_characteristics():
    query = "SELECT * FROM characteristics"
    return db.fetch_all(query)


def get_characteristic_by_id(characteristic_id: int):
    query = "SELECT * FROM characteristics WHERE id=%s"
    return db.fetch_one(query, (characteristic_id,))


def create_characteristic(characteristic: Characteristics):
    query = "INSERT INTO characteristics (name, type) VALUES (%s, %s)"
    params = characteristic.Name, characteristic.Type
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_characteristic(characteristic_id: int, characteristic: Characteristics):
    query = "UPDATE characteristics SET name=%s, type=%s WHERE id=%s"
    params = characteristic.Name, characteristic.Type, characteristic_id
    db.execute_query(query, params)


def delete_characteristic(characteristic_id: int):
    query = "DELETE FROM characteristics WHERE id=%s"
    db.execute_query(query, (characteristic_id,))
