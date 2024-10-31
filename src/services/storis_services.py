from src.repository import storis_repository, product_repository
from src.database.models import Storis
from src.utils.write_file_into_server import write_file_into_server
from fastapi import HTTPException, status, UploadFile


def get_all_storis():
    storises = storis_repository.get_all_storis()
    return [Storis(**storis) for storis in storises]


def get_storis_by_id(storis_id: int):
    storis = storis_repository.get_storis_by_id(storis_id)
    if not storis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Storis not found')
    return Storis(**storis) if storis else None


def get_storis_by_product_id(product_id: int):
    # check product exists
    product = product_repository.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    
    storises = storis_repository.get_storis_by_product_id(product_id)
    return [Storis(**storis) for storis in storises]


async def create_storis(storis: Storis, image: UploadFile):
    # check product exists
    product = product_repository.get_product_by_id(storis.ProductID)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    
    # download file for storis
    unique_filename = await write_file_into_server("storis", image)
    storis.ImageUrl = f"/storis/{unique_filename}"
    
    storis_id = storis_repository.create_storis(storis)
    return get_storis_by_id(storis_id)


async def update_storis(storis_id: int, storis: Storis, image: UploadFile = None):
    # check product exists
    product = product_repository.get_product_by_id(storis.ProductID)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    
    # download file for storis
    if image != None:
        unique_filename = await write_file_into_server("storis", image)
        storis.ImageUrl = f"/storis/{unique_filename}"
    
    storis_repository.update_storis(storis_id, storis)
    
    return {"message": "Storis updated successfully"}


def delete_storis(storis_id: int):
    storis_repository.delete_storis(storis_id)
    return {"message": "Storis deleted successfully"}
