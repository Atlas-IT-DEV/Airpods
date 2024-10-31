from src.repository import product_audio_test_repository, product_repository
from src.database.models import ProductAudio
from src.utils.write_file_into_server import write_file_into_server
from fastapi import HTTPException, status, UploadFile
from src.utils.custom_logging import setup_logging
from config import Config
import os

log = setup_logging()
config = Config()


def get_all_product_audio_test():
    product_audios = product_audio_test_repository.get_all_product_audio_test()
    return [ProductAudio(**product_audio) for product_audio in product_audios]


def get_product_audio_test_by_id(product_audio_id: int):
    product_audio = product_audio_test_repository.get_product_audio_test_by_id(product_audio_id)
    if not product_audio:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product_audio not found')
    return ProductAudio(**product_audio) if product_audio else None


def get_product_audio_test_by_product_id(product_id: int):
    # check product exists
    product = product_repository.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    
    product_audios = product_audio_test_repository.get_product_audio_test_by_product_id(product_id)
    return [ProductAudio(**product_audio) for product_audio in product_audios]


async def create_product_audio_test(product_audio: ProductAudio, original_audio: UploadFile, our_audio: UploadFile):
    # check product exists
    product = product_repository.get_product_by_id(product_audio.ProductID)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    
    # download file for product_audio
    unique_filename = await write_file_into_server("audio", original_audio)
    product_audio.OriginalUrl = f"/audio/{unique_filename}"
    
    unique_filename = await write_file_into_server("audio", our_audio)
    product_audio.OurUrl = f"/audio/{unique_filename}"
    
    product_audio_id = product_audio_test_repository.create_product_audio_test(product_audio)
    return get_product_audio_test_by_id(product_audio_id)


async def update_product_audio_test(product_audio_id: int,
                                    product_id: int,
                                    original_audio: UploadFile = None,
                                    our_audio: UploadFile = None):
    # check product exists
    product = product_repository.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')

    product_audio = get_product_audio_test_by_id(product_audio_id)
    if not product_audio:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='ProductAudio not found')

    # download file for product_audio
    if original_audio is not None:
        unique_filename = await write_file_into_server("audio", original_audio)
        current_url = product_audio.OriginalUrl
        if current_url is not None:
            try:
                file_path = f"{config.__getattr__('UPLOAD_DIR')}{current_url}"
                log.info(f"Deleting file {file_path}")
                os.remove(file_path)
            except FileNotFoundError:
                log.warning(f"File {file_path} not found")
            except Exception as ex:
                log.exception(ex)
        product_audio.OriginalUrl = f"/audio/{unique_filename}"
    
    if our_audio is not None:
        unique_filename = await write_file_into_server("audio", our_audio)
        current_url = product_audio.OurUrl
        if current_url is not None:
            try:
                file_path = f"{config.__getattr__('UPLOAD_DIR')}{current_url}"
                log.info(f"Deleting file {file_path}")
                os.remove(file_path)
            except FileNotFoundError:
                log.warning(f"File {file_path} not found")
            except Exception as ex:
                log.exception(ex)
        product_audio.OurUrl = f"/audio/{unique_filename}"
    
    product_audio_test_repository.update_product_audio_test(product_audio_id, product_audio)
    
    return {"message": "ProductAudio updated successfully"}


def delete_product_audio_test(product_audio_id: int):
    product_audio_test_repository.delete_product_audio_test(product_audio_id)
    return {"message": "ProductAudio deleted successfully"}
