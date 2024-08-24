import os
import uuid
from src.service import user_services, image_services, product_services
from src.database.models import Users, Images, Products
from fastapi import HTTPException, status, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from src.utils.write_file_into_server import write_file_into_server
from src.utils.return_url_object import return_url_object
from src.utils.custom_logging import setup_logging
from config import Config

config = Config()
log = setup_logging()


async def upload_avatar(file, user_id: int):
    # Проверяем существует ли пользователь
    existing_user = user_services.get_user_by_id(user_id)
    # Записываем файл на сервер
    unique_filename = await write_file_into_server("avatar", file)
    # Создаем информацию в базе данных о пути изображения
    image = image_services.create_image(Images(url=f"/avatar/{unique_filename}"))
    # Обновляем данные о пользователе
    existing_user.IconID = image.ID
    # Возвращаем обновленного пользователя
    user_services.update_user(user_id, existing_user)
    return user_services.get_user_by_id(user_id)


async def upload_product(file, product_id: int):
    # Проверяем существует ли товар
    existing_product = product_services.get_product_by_id(product_id)
    # Записываем файл на сервер
    unique_filename = await write_file_into_server("product", file)
    # Создаем информацию в базе данных о пути изображения
    image = image_services.create_image(Images(url=f"/product/{unique_filename}"))
    # Обновляем данные о товаре
    existing_product.ImageID = image.ID
    # Возвращаем обновленный товар
    product_services.update_product(product_id, existing_product)
    return product_services.get_product_by_id(product_id)


def download_avatar(user_id: int):
    # Проверяем существование пользователя
    user = user_services.get_user_by_id(user_id)
    # Проверяем данные в таблице со ссылками на изображения для пользователя
    image = image_services.get_image_by_id(user.IconID)
    # Проверяем существование файла в папке
    log.debug(config.__getattr__("UPLOAD_DIR") + "avatar" + image.Url.split("/")[-1])
    if not os.path.exists(os.path.join(config.__getattr__("UPLOAD_DIR"),"avatar",image.Url.split("/")[-1])):
        HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not exists")
    # return FileResponse(image.Url)
    return return_url_object(image, "avatar", user.dict())


def download_product(product_id: int):
    # Проверяем существование товара
    product = product_services.get_product_by_id(product_id)
    # Проверяем данные в таблице со ссылками на изображения для товара
    image = image_services.get_image_by_id(product.ImageID)
    # Проверяем существование файла в папке
    log.debug(config.__getattr__("UPLOAD_DIR") + "product" + image.Url.split("/")[-1])
    if not os.path.exists(os.path.join(config.__getattr__("UPLOAD_DIR"),"product",image.Url.split("/")[-1])):
        HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not exists")
    # return FileResponse(image.Url)
    return return_url_object(image, "product", user.dict())

