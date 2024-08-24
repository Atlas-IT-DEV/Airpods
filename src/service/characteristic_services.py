from src.repository import characteristic_repository
from src.database.models import Characteristics
from fastapi import HTTPException, status


def get_all_characteristics():
    characteristics = haracteristic_repository.get_all_characteristics()
    return [Сharacteristics(**characteristic) for characteristic in characteristics]


def get_characteristic_by_id(characteristic_id: int):
    characteristic = characteristic_repository.get_characteristic_by_id(characteristic_id)
    if not characteristic:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Characteristic not found")
    return Characteristics(**characteristic) if characteristic else None


def create_characteristic(characteristic: Characteristics):
    characteristic_id = characteristic_repository.create_characteristic(characteristic)
    return get_characteristic_by_id(characteristic_id)


def update_characteristic(characteristic_id: int, characteristic: Characteristics):
    existing_characteristic = get_characteristic_by_id(characteristic_id)
    characteristic_repository.update_characteristic(characteristic_id, characteristic)
    return {"message": "Characteristic updated successfully"}


def delete_characteristic(characteristic_id: int):
    existing_characteristic = get_characteristic_by_id(characteristic_id)
    characteristic_repository.delete_characteristic(characteristic_id)
    return {"message": "Characteristic deleted successfully"}
