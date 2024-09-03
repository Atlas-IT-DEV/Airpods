import os
import uuid
from src.service import (user_services, image_services, product_services,
                         image_comment_services, product_comment_services, image_product_services)
from src.service.image_product_services import get_image_product_by_product_id, delete_image_product
from src.database.models import Users, Images, Products, CommentImages, ProductImages, ImageTypeEnum
from fastapi import HTTPException, status, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from src.utils.write_file_into_server import write_file_into_server
from src.utils.return_url_object import return_url_object
from fastapi.encoders import jsonable_encoder
from src.utils.custom_logging import setup_logging
from config import Config

config = Config()
log = setup_logging()


async def upload_product_main(file: UploadFile, product_id: int):
    # Проверяем существует ли товар
    product_services.get_product_by_id(product_id)
    # Записываем каждый файл на сервер
    unique_filename = await write_file_into_server("product", file)
    # Создаем информацию в базе данных о пути изображения
    image = image_services.create_image(Images(url=f"/product/{unique_filename}"))
    # Записываем в таблицу связи данные об id изображений для продукта
    image_product_services.create_image_product(ProductImages(product_id=product_id, image_id=image.ID,
                                                              image_type=ImageTypeEnum.Main))
    return image_product_services.get_image_product_by_product_id(product_id)


async def upload_product_additional(files: list[UploadFile], product_id: int):
    # Проверяем существует ли товар
    product_services.get_product_by_id(product_id)
    for file in files:
        # Записываем каждый файл на сервер
        unique_filename = await write_file_into_server("product", file)
        # Создаем информацию в базе данных о пути изображения
        image = image_services.create_image(Images(url=f"/product/{unique_filename}"))
        # Записываем в таблицу связи данные об id изображений для продукта
        image_product_services.create_image_product(ProductImages(product_id=product_id, image_id=image.ID,
                                                                  image_type=ImageTypeEnum.Additional))
    return image_product_services.get_image_product_by_product_id(product_id)


def download_product(product_id: int):
    # Проверяем существование товара
    product = product_services.get_product_by_id(product_id)
    # Получаем список id изображений товара
    images_product = image_product_services.get_image_product_by_product_id(product_id)
    image_ids = []
    for image_product in images_product:
        image_ids.append(image_product.ImageID)
    urls = []
    for image_id in image_ids:
        # Проверяем данные в таблице со ссылками на изображения для товара
        image = image_services.get_image_by_id(image_id)
        # Проверяем существование файла в папке
        log.debug(config.__getattr__("UPLOAD_DIR") + "product" + image.Url.split("/")[-1])
        if not os.path.exists(os.path.join(config.__getattr__("UPLOAD_DIR"), "product", image.Url.split("/")[-1])):
            HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not exists")
        # return FileResponse(image.Url)
        url = return_url_object(image)
        urls.append(url)
    return JSONResponse({
        "product": product.dict(),
        "urls": urls
    })


async def upload_comment(files: list[UploadFile], comment_id: int):
    if len(files) == 5:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Too many files")
    # Проверяем существует ли товар
    product_comment_services.get_product_comment_by_id(comment_id)
    for file in files:
        # Записываем каждый файл на сервер
        unique_filename = await write_file_into_server("comment", file)
        # Создаем информацию в базе данных о пути изображения
        image = image_services.create_image(Images(url=f"/comment/{unique_filename}"))
        # Записываем в таблицу связи данные об id изображений для продукта
        image_comment_services.create_image_comment(CommentImages(comment_id=comment_id, image_id=image.ID))
    return image_comment_services.get_image_comment_by_comment_id(comment_id)


def download_comment(comment_id: int):
    # Проверяем существование комментария
    comment = product_comment_services.get_product_comment_by_id(comment_id)
    # Получаем список id изображений комментария
    images_comment = image_comment_services.get_image_comment_by_comment_id(comment_id)
    image_ids = []
    for image_comment in images_comment:
        image_ids.append(image_comment.ImageID)
    urls = []
    for image_id in image_ids:
        # Проверяем данные в таблице со ссылками на изображения для комментария
        image = image_services.get_image_by_id(image_id)
        # Проверяем существование файла в папке
        log.debug(config.__getattr__("UPLOAD_DIR") + "comment" + image.Url.split("/")[-1])
        if not os.path.exists(os.path.join(config.__getattr__("UPLOAD_DIR"), "comment", image.Url.split("/")[-1])):
            HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not exists")
        # return FileResponse(image.Url)
        url = return_url_object(image)
        urls.append(url)
    return JSONResponse({
        "comment": jsonable_encoder(comment),
        "urls": urls
    })


async def delete_product(product_id: int, image_id: int):
    # Проверяем существование товара
    product_services.get_product_by_id(product_id)
    # Получаем все изображения, связанные с продуктом
    image_product_links = image_product_services.get_image_product_by_product_id(product_id)
    # Находим связь, соответствующую заданному image_id
    image_product_link = next((link for link in image_product_links if link.ImageID == image_id), None)
    if not image_product_link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not linked to product")
    # Удаляем запись о связи изображения и продукта
    image_product_services.delete_image_product(image_product_link.ID)
    # Удаляем файл изображения с сервера
    image = image_services.get_image_by_id(image_id)
    if not image:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    file_path = os.path.join(config.__getattr__("UPLOAD_DIR"), "product", image.Url.split("/")[-1])
    if os.path.exists(file_path):
        os.remove(file_path)
    else:
        log.warning(f"File {file_path} does not exist")
    # Удаляем запись об изображении из базы данных
    image_services.delete_image(image_id)
    return {"detail": "Image deleted successfully"}


async def delete_comment(comment_id: int, image_id: int):
    # Проверяем существование комментария
    product_comment_services.get_product_comment_by_id(comment_id)
    # Получаем все изображения, связанные с комментарием
    image_comment_links = image_comment_services.get_image_comment_by_comment_id(comment_id)
    # Находим связь, соответствующую заданному image_id
    image_comment_link = next((link for link in image_comment_links if link.ImageID == image_id), None)
    if not image_comment_link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not linked to comment")
    # Удаляем запись о связи изображения и комментария
    image_comment_services.delete_image_comment(image_omment_link.ID)
    # Удаляем файл изображения с сервера
    image = image_services.get_image_by_id(image_id)
    if not image:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    file_path = os.path.join(config.__getattr__("UPLOAD_DIR"), "comment", image.Url.split("/")[-1])
    if os.path.exists(file_path):
        os.remove(file_path)
    else:
        log.warning(f"File {file_path} does not exist")
    # Удаляем запись об изображении из базы данных
    image_services.delete_image(image_id)
    return {"detail": "Image deleted successfully"}
