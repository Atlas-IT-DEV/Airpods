from src.repository import characteristic_repository
from src.database.models import Characteristics
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_characteristics():
    characteristics = characteristic_repository.get_all_characteristics()
    return [Characteristics(**characteristic) for characteristic in characteristics]


def get_characteristic_by_id(characteristic_id: int):
    characteristic = characteristic_repository.get_characteristic_by_id(characteristic_id)
    if not characteristic:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Characteristic not found")
    return Characteristics(**characteristic) if characteristic else None


def create_characteristic(characteristic: Characteristics):
    check_if_exists(
        get_all=get_all_characteristics,
        attr_name="Name",
        attr_value=characteristic.Name,
        exception_detail='Characteristic already exist'
    )
    characteristic_id = characteristic_repository.create_characteristic(characteristic)
    return get_characteristic_by_id(characteristic_id)


def update_characteristic(characteristic_id: int, characteristic: Characteristics):
    check_for_duplicates(
        get_all=get_all_characteristics,
        check_id=characteristic_id,
        attr_name="Name",
        attr_value=characteristic.Name,
        exception_detail='Characteristic already exist'
    )
    characteristic_repository.update_characteristic(characteristic_id, characteristic)
    return {"message": "Characteristic updated successfully"}


def delete_characteristic(characteristic_id: int):
    existing_characteristic = get_characteristic_by_id(characteristic_id)
    characteristic_repository.delete_characteristic(characteristic_id)
    return {"message": "Characteristic deleted successfully"}
