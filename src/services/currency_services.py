from src.repository import currency_repository
from src.database.models import Currencies
from fastapi import HTTPException, status


def get_all_currencies():
    currencies = currency_repository.get_all_currencies()
    return [Currencies(**currency) for currency in currencies]


def get_currency_by_id(currency_id: int):
    currency = currency_repository.get_currency_by_id(currency_id)
    if not currency:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Currency not found')
    return Currencies(**currency) if currency else None


def create_currency(currency: Currencies):
    currency_id = currency_repository.create_currency(currency)
    return get_currency_by_id(currency_id)


def update_currency(currency_id: int, currency: Currencies):
    get_currency_by_id(currency_id)
    currency_repository.update_currency(currency_id, currency)
    return {"message": "Currency updated successfully"}


def delete_currency(currency_id: int):
    get_currency_by_id(currency_id)
    currency_repository.delete_currency(currency_id)
    return {"message": "Currency deleted successfully"}
