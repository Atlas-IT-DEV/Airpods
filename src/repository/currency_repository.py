from src.database.my_connector import Database
from src.database.models import Currencies
db = Database()


def get_all_currencies():
    query = "SELECT * FROM currencies"
    return db.fetch_all(query)


def get_currency_by_id(currency_id: int):
    query = "SELECT * FROM currencies WHERE id=%s"
    return db.fetch_one(query, (currency_id,))


def create_currency(currency: Currencies):
    query = "INSERT INTO currencies (ru, eu, br) VALUES (%s, %s, %s)"
    params = (currency.RU, currency.EU, currency.BR)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_currency(currency_id: int, currency: Currencies):
    query = "UPDATE currencies SET ru=%s, eu=%s, br=%s WHERE id=%s"
    params = (currency.RU, currency.EU, currency.BR, currency_id)
    db.execute_query(query, params)


def delete_currency(currency_id: int):
    query = "DELETE FROM currencies WHERE id=%s"
    db.execute_query(query, (currency_id,))
