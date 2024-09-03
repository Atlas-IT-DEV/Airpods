from http.client import responses
from datetime import datetime
import pytest
import random
import string
from copy import deepcopy
from fastapi.testclient import TestClient
from main import app
from setup.debug_info import machine
from src.utils.custom_logging import setup_logging
import os

log = setup_logging()
client = TestClient(app)


"""

Ошибка Not Found вероятно говорит о неправильно созданном роуте, или не правильно переданным параметрам в тесты

"""


# Вспомогательная функция для генерации случайных данных
def generate_random_data(data_type, length=8):
    if data_type == "string":
        return ''.join(random.choices(string.ascii_letters, k=length))
    elif data_type == "number":
        return random.randint(1, 1000000)
    elif data_type == "datetime":
        return datetime.now()
    return None


# Вспомогательная функция для выполнения запросов
def api_request(method, url, json_data=None):
    response = client.request(method, url, json=json_data)
    return response


# Вспомогательная функция для проверки статуса и получения данных
def assert_response(response, expected_status, keys=None):
    log.info("-------------------------------------")
    assert response.status_code == expected_status, \
        f"Unexpected status code: {response.status_code}, Response: {response.text}"
    if keys:
        response_data = response.json()
        if isinstance(response_data, list):
            for item in response_data:
                for key in keys:
                    assert key in item
        else:
            for key in keys:
                assert key in response_data
        return response_data
    return None


# Генерация тестовых данных для различных сущностей
def generate_test_data(entity_type):
    data_map = {
        "user": {
            "name": generate_random_data("string"),
            "telegram_id": generate_random_data("number")
        },
        "promotion": {
            "name": generate_random_data("string"),
            "value": generate_random_data("number"),
            "bool": False
        },
        "image": {
            "url": generate_random_data("string")
        },
        "category": {
            "name": generate_random_data("string")
        },
        "company": {
            "name": generate_random_data("string"),
            "description": generate_random_data("string")
        },
        "characteristic": {
            "name": generate_random_data("string"),
            "type": "INT"
        },
        "currency": {
            "ru": generate_random_data("number"),
            "eu": generate_random_data("number"),
            "br": generate_random_data("number")
        },
        "product": {
            "name": generate_random_data("string"),
            "category_id": None,
            "promotion_id": None,
            "company_id": None,
            "currency_id": None,
        },
        "product_characteristic": {
            "product_id": None,
            "characteristic_id": None,
            "value": generate_random_data("string")
        },
        "order": {
            "user_id": None,
            "date": f"{generate_random_data('datetime')}",
            "total_price": generate_random_data("number")
        },
        "order_product": {
            "order_id": None,
            "product_id": None,
            "quantity": generate_random_data("number")
        },
        "product_comment": {
            "product_id": None,
            "user_id": None,
            "comment": generate_random_data("string"),
            "created_at": f"{generate_random_data('datetime')}"
        },
        "image_product": {
            "product_id": None,
            "image_id": None
        },
        "image_comment": {
            "comment_id": None,
            "image_id": None
        }
    }
    return data_map.get(entity_type)


def setup_entity(entity_type, endpoint):
    if entity_type == "product":
        category_id = setup_entity("category", "categories")
        promotion_id = setup_entity("promotion", "promotions")
        company_id = setup_entity("company", "companies")
        currency_id = setup_entity("currency", "currencies")
        product_data = generate_test_data("product")
        entity_data = {**product_data,
                       "category_id": category_id,
                       "promotion_id": promotion_id,
                       "company_id": company_id,
                       "currency_id": currency_id}
    elif entity_type == "product_characteristic":
        product_id = setup_entity("product", "products")
        characteristic_id = setup_entity("characteristic", "characteristics")
        product_characteristic_data = generate_test_data("product_characteristic")
        entity_data = {**product_characteristic_data,
                       "product_id": product_id,
                       "characteristic_id": characteristic_id}
    elif entity_type == "order":
        user_id = setup_entity("user", "users")
        order_data = generate_test_data("order")
        entity_data = {**order_data,
                       "user_id": user_id}
    elif entity_type == "order_product":
        order_id = setup_entity("order", "orders")
        product_id = setup_entity("product", "products")
        order_product_data = generate_test_data("order_product")
        entity_data = {**order_product_data,
                       "product_id": product_id,
                       "order_id": order_id}
    elif entity_type == "product_comment":
        product_id = setup_entity("product", "products")
        user_id = setup_entity("user", "users")
        product_comment = generate_test_data("product_comment")
        entity_data = {**product_comment,
                       "product_id": product_id,
                       "user_id": user_id}
    elif entity_type == "image_product":
        product_id = setup_entity("product", "products")
        image_id = setup_entity("image", "images")
        image_product = generate_test_data("image_product")
        entity_data = {**image_product,
                       "product_id": product_id,
                       "image_id": image_id}
    elif entity_type == "image_comment":
        comment_id = setup_entity("comment", "comments")
        image_id = setup_entity("image", "images")
        image_comment = generate_test_data("image_comment")
        entity_data = {**image_comment,
                       "comment_id": comment_id,
                       "image_id": image_id}
    else:
        entity_data = generate_test_data(entity_type)
    log.info(f"Creating {entity_type} with data: {entity_data}")
    response = api_request("POST", f"/{endpoint}/", json_data=entity_data)
    log.info(f"POST {endpoint}/ response: {response.json()}")
    response_data = assert_response(response, 200, keys=["id"])
    return response_data["id"]


# Функция для удаления сущности
def teardown_entity(endpoint, entity_id):
    response = api_request("DELETE", f"/{endpoint}/{entity_id}")
    assert_response(response, 200)


@pytest.mark.parametrize("entity_type, endpoint, expected_keys", [
    ("user", "users", ["name"]),
    ("currency", "currencies", ["ru"]),
    ("promotion", "promotions", ["name"]),
    ("image", "images", ["url"]),
    ("category", "categories", ["name"]),
    ("company", "companies", ["name"]),
    ("characteristic", "characteristics", ["name"]),
    ("product", "products", ["name"]),
    ("product_characteristic", "product_characteristics", ["value"]),
    ("order", "orders", ["total_price"]),
    ("order_product", "orders_products", ["quantity"]),
    ("product_comment", "product_comments", ["comment"]),
])
def test_create_and_get_entity(entity_type, endpoint, expected_keys):
    log.info("-------------------------------------")
    log.info(f"entity_type: {entity_type}, endpoint: {endpoint}, expected_keys: {expected_keys}")
    entity_id = setup_entity(entity_type, endpoint)
    response = api_request("GET", f"/{endpoint}/")
    assert_response(response, 200, keys=["id"] + expected_keys)
    response = api_request("GET", f"/{endpoint}/{entity_type}_id/{entity_id}")
    assert_response(response, 200, keys=["id"] + expected_keys)
    teardown_entity(endpoint, entity_id)


@pytest.mark.parametrize("entity_type, endpoint, update_data", [
    ("user", "users", {"name": "Вова", "telegram_id": 87654321}),
    ("currency", "currencies", {"ru": generate_random_data("number")}),
    ("promotion", "promotions", {"quantity": 87654321}),
    ("image", "images", {"url": generate_random_data("string")}),
    ("category", "categories", {"name": generate_random_data("string")}),
    ("company", "companies", {"name": generate_random_data("string")}),
    ("characteristic", "characteristics", {"name": generate_random_data("string")}),
    ("product", "products", {"name": generate_random_data("string")}),
    ("product_characteristic", "product_characteristics", {"value": generate_random_data("string")}),
    ("order", "orders", {"total_price": generate_random_data("number")}),
    ("order_product", "orders_products", {"quantity": generate_random_data("number")}),
    ("product_comment", "product_comments", {"comment": generate_random_data("string")}),
])
def test_update_entity(entity_type, endpoint, update_data):
    log.info("-------------------------------------")
    log.info(f"entity_type: {entity_type}, endpoint: {endpoint}, update_data: {update_data}")
    entity_id = setup_entity(entity_type, endpoint)
    response = api_request("GET", f"/{endpoint}/{entity_type}_id/{entity_id}")
    test_data = response.json()
    response = api_request("PUT", f"/{endpoint}/{entity_id}", json_data=test_data)
    assert_response(response, 200)
    updated_data = deepcopy(test_data)
    updated_data.update(update_data)
    response = api_request("PUT", f"/{endpoint}/{entity_id}", json_data=updated_data)
    assert_response(response, 200)
    teardown_entity(endpoint, entity_id)
