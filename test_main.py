from fastapi.testclient import TestClient
from pathlib import Path
from main import app
from datetime import datetime

client = TestClient(app)


test_user = {
    "name": "Test1",
    "telegram_id": 12345678
}


def test_create_user_success():
    response = client.post("/users/", json=test_user)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["name"] == test_user["name"]
    assert response_data["telegram_id"] == test_user["telegram_id"]


def test_create_user_missing_fields():
    response = client.post("/users/", json=test_user.copy().pop("telegram_id"))
    assert response.status_code == 422


def test_get_all_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_user_by_id_success():
    existing_user = client.get(f"/users/telegram_id/{test_user.get('telegram_id')}")
    response = client.get(f"/users/user_id/{existing_user.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == existing_user.json().get('id')


def test_get_user_by_id_not_found():
    response = client.get(f"/users/user_id/{999999}")
    assert response.status_code == 404


def test_update_user_not_found():
    response = client.put(f"/users/{999999}", json=test_user)
    assert response.status_code == 404


def test_update_user_success():
    existing_user = client.get(f"/users/telegram_id/{test_user.get('telegram_id')}")
    response = client.put(f"/users/{existing_user.json().get('id')}", json=test_user)
    assert response.status_code == 200
    update_user = existing_user.json().copy()
    update_user.update({"name": "Вова", "telegram_id": 87654321})
    response = client.put(f"/users/{existing_user.json().get('id')}", json=update_user)
    assert response.status_code == 200
    response = client.put(f"/users/{existing_user.json().get('id')}", json=test_user)
    assert response.status_code == 200


def test_get_user_by_telegram_id_success():
    response = client.get(f"/users/telegram_id/{test_user.get('telegram_id')}")
    assert response.status_code == 200


def test_get_user_by_telegram_id_not_found():
    response = client.get(f"/users/telegram_id/{999999}")
    assert response.status_code == 404


def test_delete_user_not_found():
    response = client.delete(f"/users/{999999}")
    assert response.status_code == 404


def test_delete_user_success():
    existing_user = client.get(f"/users/telegram_id/{test_user.get('telegram_id')}")
    response = client.delete(f"/users/{existing_user.json().get('id')}")
    assert response.status_code == 200


test_promotion = {
    "name": "Test2",
    "value": 1,
    "bool": True
}


def test_create_promotion_success():
    response = client.post("/promotions/", json=test_promotion)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["name"] == test_promotion["name"]
    assert response_data["value"] == test_promotion["value"]
    assert response_data["bool"] == test_promotion["bool"]


def test_create_promotion_missing_fields():
    incomplete_promotion = test_promotion.copy()
    incomplete_promotion.pop("value")
    response = client.post("/promotions/", json=incomplete_promotion)
    assert response.status_code == 422


def test_get_all_promotions():
    response = client.get("/promotions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_promotion_by_id_success():
    existing_promotion = client.get(f"/promotions/promotion_name/{test_promotion.get('name')}")
    response = client.get(f"/promotions/promotion_id/{existing_promotion.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == existing_promotion.json().get('id')


def test_get_promotion_by_id_not_found():
    response = client.get(f"/promotions/promotion_id/{999999}")
    assert response.status_code == 404


def test_update_promotion_not_found():
    response = client.put(f"/promotions/{999999}", json=test_promotion)
    assert response.status_code == 404


def test_update_promotion_success():
    existing_promotion = client.get(f"/promotions/promotion_name/{test_promotion.get('name')}")
    response = client.put(f"/promotions/{existing_promotion.json().get('id')}", json=test_promotion)
    assert response.status_code == 200
    update_promotion = existing_promotion.json().copy()
    update_promotion.update({"value": 87654321})
    response = client.put(f"/promotions/{existing_promotion.json().get('id')}", json=update_promotion)
    assert response.status_code == 200
    response = client.put(f"/promotions/{existing_promotion.json().get('id')}", json=test_promotion)
    assert response.status_code == 200


def test_get_promotion_by_name_success():
    response = client.get(f"/promotions/promotion_name/{test_promotion.get('name')}")
    assert response.status_code == 200


def test_get_promotion_by_name_not_found():
    response = client.get(f"/promotions/promotion_name/НеправильноеНазвание")
    assert response.status_code == 404


def test_delete_promotion_not_found():
    response = client.delete(f"/promotions/{999999}")
    assert response.status_code == 404


def test_delete_promotion_success():
    existing_promotion = client.get(f"/promotions/promotion_name/{test_promotion.get('name')}")
    response = client.delete(f"/promotions/{existing_promotion.json().get('id')}")
    assert response.status_code == 200


# Тестовые данные для сущности Currency
test_currency = {
    "ru": 999999,
    "eu": 999999,
    "br": 999999
}
currency_id = []


def test_create_currency_success():
    response = client.post("/currencies/", json=test_currency)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["ru"] == test_currency["ru"]
    assert response_data["eu"] == test_currency["eu"]
    assert response_data["br"] == test_currency["br"]
    currency_id.append(response_data["id"])


def test_create_currency_missing_fields():
    incomplete_currency = test_currency.copy()
    incomplete_currency.pop("ru")
    response = client.post("/currencies/", json=incomplete_currency)
    assert response.status_code == 422


def test_get_all_currencies():
    response = client.get("/currencies/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_currency_by_id_success():
    existing_currency = client.get(f"/currencies/currency_id/{currency_id[0]}")
    response = client.get(f"/currencies/currency_id/{existing_currency.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == existing_currency.json().get('id')


def test_get_currency_by_id_not_found():
    response = client.get(f"/currencies/currency_id/{999999}")
    assert response.status_code == 404


def test_update_currency_not_found():
    response = client.put(f"/currencies/{999999}", json=test_currency)
    assert response.status_code == 404


def test_update_currency_success():
    existing_currency = client.get(f"/currencies/currency_id/{currency_id[0]}")
    response = client.put(f"/currencies/{existing_currency.json().get('id')}", json=test_currency)
    assert response.status_code == 200
    update_currency = existing_currency.json().copy()
    update_currency.update({"ru": 2000, "eu": 40})
    response = client.put(f"/currencies/{existing_currency.json().get('id')}", json=update_currency)
    assert response.status_code == 200
    response = client.put(f"/currencies/{existing_currency.json().get('id')}", json=test_currency)
    assert response.status_code == 200


def test_delete_currency_not_found():
    response = client.delete(f"/currencies/{999999}")
    assert response.status_code == 404


def test_delete_currency_success():
    existing_currency = client.get(f"/currencies/currency_id/{currency_id[0]}")
    response = client.delete(f"/currencies/{existing_currency.json().get('id')}")
    assert response.status_code == 200


# Тестовые данные для сущности Category
test_category = {
    "name": "Test3"
}
category_id = []


def test_create_category_success():
    response = client.post("/categories/", json=test_category)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["name"] == test_category["name"]
    category_id.append(response_data["id"])


def test_create_category_missing_fields():
    incomplete_category = test_category.copy()
    incomplete_category.pop("name")
    response = client.post("/categories/", json=incomplete_category)
    assert response.status_code == 422


def test_get_all_categories():
    response = client.get("/categories/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_category_by_id_success():
    existing_category = client.get(f"/categories/category_id/{category_id[0]}")
    response = client.get(f"/categories/category_id/{existing_category.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == existing_category.json().get('id')


def test_get_category_by_id_not_found():
    response = client.get(f"/categories/category_id/{999999}")
    assert response.status_code == 404


def test_update_category_not_found():
    response = client.put(f"/categories/{999999}", json=test_category)
    assert response.status_code == 404


def test_update_category_success():
    existing_category = client.get(f"/categories/category_id/{category_id[0]}")
    response = client.put(f"/categories/{existing_category.json().get('id')}", json=test_category)
    assert response.status_code == 200
    update_category = existing_category.json().copy()
    update_category.update({"name": "НовыйНабор"})
    response = client.put(f"/categories/{existing_category.json().get('id')}", json=update_category)
    assert response.status_code == 200
    response = client.put(f"/categories/{existing_category.json().get('id')}", json=test_category)
    assert response.status_code == 200


def test_delete_category_not_found():
    response = client.delete(f"/categories/{999999}")
    assert response.status_code == 404


def test_delete_category_success():
    existing_category = client.get(f"/categories/category_id/{category_id[0]}")
    response = client.delete(f"/categories/{existing_category.json().get('id')}")
    assert response.status_code == 200



# Тестовые данные для сущности Company
test_company = {
    "name": "Test4",
    "description": "Test5"
}
company_id = []


def test_create_company_success():
    response = client.post("/companies/", json=test_company)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["name"] == test_company["name"]
    assert response_data["description"] == test_company["description"]
    company_id.append(response_data["id"])


def test_create_company_missing_fields():
    incomplete_company = test_company.copy()
    incomplete_company.pop("name")
    response = client.post("/companies/", json=incomplete_company)
    assert response.status_code == 422


def test_get_company_by_id_success():
    existing_company = client.get(f"/companies/company_id/{company_id[0]}")
    response = client.get(f"/companies/company_id/{existing_company.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == existing_company.json().get('id')
    assert response_data["name"] == test_company["name"]
    assert response_data["description"] == test_company["description"]


def test_get_company_by_id_not_found():
    response = client.get(f"/companies/company_id/{999999}")
    assert response.status_code == 404


def test_update_company_not_found():
    response = client.put(f"/companies/{999999}", json=test_company)
    assert response.status_code == 404


def test_update_company_success():
    existing_company = client.get(f"/companies/company_id/{company_id[0]}")
    response = client.put(f"/companies/{existing_company.json().get('id')}", json=test_company)
    assert response.status_code == 200
    update_company = existing_company.json().copy()
    update_company.update({"name": "Microsoft", "description": "Производитель ПО"})
    response = client.put(f"/companies/{existing_company.json().get('id')}", json=update_company)
    assert response.status_code == 200
    response = client.put(f"/companies/{existing_company.json().get('id')}", json=test_company)
    assert response.status_code == 200


def test_delete_company_not_found():
    response = client.delete(f"/companies/{999999}")
    assert response.status_code == 404


def test_delete_company_success():
    existing_company = client.get(f"/companies/company_id/{company_id[0]}")
    response = client.delete(f"/companies/{existing_company.json().get('id')}")
    assert response.status_code == 200



# Тестовые данные для сущности Characteristic
test_characteristic = {
    "name": "Test6",
    "type": "INT"
}
characteristic_id = []


def test_create_characteristic_success():
    response = client.post("/characteristics/", json=test_characteristic)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["name"] == test_characteristic["name"]
    assert response_data["type"] == test_characteristic["type"]
    characteristic_id.append(response_data["id"])


def test_create_characteristic_missing_fields():
    incomplete_characteristic = test_characteristic.copy()
    incomplete_characteristic.pop("name")
    response = client.post("/characteristics/", json=incomplete_characteristic)
    assert response.status_code == 422


def test_get_all_characteristics():
    response = client.get("/characteristics/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_characteristic_by_id_success():
    existing_characteristic = client.get(f"/characteristics/characteristic_id/{characteristic_id[0]}")
    response = client.get(f"/characteristics/characteristic_id/{existing_characteristic.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == existing_characteristic.json().get('id')
    assert response_data["name"] == test_characteristic["name"]
    assert response_data["type"] == test_characteristic["type"]


def test_get_characteristic_by_id_not_found():
    response = client.get(f"/characteristics/characteristic_id/{999999}")
    assert response.status_code == 404


def test_update_characteristic_not_found():
    response = client.put(f"/characteristics/{999999}", json=test_characteristic)
    assert response.status_code == 404


def test_update_characteristic_success():
    existing_characteristic = client.get(f"/characteristics/characteristic_id/{characteristic_id[0]}")
    response = client.put(f"/characteristics/{existing_characteristic.json().get('id')}", json=test_characteristic)
    assert response.status_code == 200
    update_characteristic = existing_characteristic.json().copy()
    update_characteristic.update({"name": "Вес", "type": "FLOAT"})
    response = client.put(f"/characteristics/{existing_characteristic.json().get('id')}", json=update_characteristic)
    assert response.status_code == 200
    response = client.put(f"/characteristics/{existing_characteristic.json().get('id')}", json=test_characteristic)
    assert response.status_code == 200


def test_delete_characteristic_not_found():
    response = client.delete(f"/characteristics/{999999}")
    assert response.status_code == 404


def test_delete_characteristic_success():
    existing_characteristic = client.get(f"/characteristics/characteristic_id/{characteristic_id[0]}")
    response = client.delete(f"/characteristics/{existing_characteristic.json().get('id')}")
    assert response.status_code == 200



# Тестовые данные для сущности Image
test_image = {
    "url": "https://example.com/test_image.png"
}
image_id = []


def test_create_image_success():
    response = client.post("/images/", json=test_image)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["url"] == test_image["url"]
    image_id.append(response_data["id"])


def test_create_image_missing_fields():
    incomplete_image = test_image.copy()
    incomplete_image.pop("url")
    response = client.post("/images/", json=incomplete_image)
    assert response.status_code == 422


def test_get_all_images():
    response = client.get("/images/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_image_by_id_success():
    existing_image = client.get(f"/images/image_id/{image_id[0]}")
    response = client.get(f"/images/image_id/{existing_image.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == existing_image.json().get('id')
    assert response_data["url"] == test_image["url"]


def test_get_image_by_id_not_found():
    response = client.get(f"/images/image_id/{999999}")
    assert response.status_code == 404


def test_update_image_not_found():
    response = client.put(f"/images/{999999}", json=test_image)
    assert response.status_code == 404


def test_update_image_success():
    existing_image = client.get(f"/images/image_id/{image_id[0]}")
    update_image_data = {"url": "https://example.com/image999999.jpg"}
    response = client.put(f"/images/{existing_image.json().get('id')}", json=update_image_data)
    assert response.status_code == 200


def test_delete_image_not_found():
    response = client.delete(f"/images/{999999}")
    assert response.status_code == 404


def test_delete_image_success():
    existing_image = client.get(f"/images/image_id/{image_id[0]}")
    response = client.delete(f"/images/{existing_image.json().get('id')}")
    assert response.status_code == 200



# Тестовые данные для сущности ProductComments
test_product_comment_user = {
    "name": "Test7",
    "telegram_id": 999999
}
test_product_comment_promotion = {
    "name": "Test8",
    "value": 999999,
    "bool": True
}
test_product_comment_category = {
    "name": "Test9"
}
test_product_comment_currency = {
    "ru": 999998,
    "eu": 999998,
    "br": 999998
}
test_product_comment_company = {
    "name": "Test10",
    "description": "Test11"
}
test_product_comment_product = {
    "name": "Test11",
    "promotion_id": client.post("/promotions/", json=test_product_comment_promotion).json().get('id'),
    "currency_id": client.post(f"/currencies/", json=test_product_comment_currency).json().get('id'),
    "company_id": client.post(f"/companies/", json=test_product_comment_company).json().get('id'),
    "category_id": client.post(f"/categories/", json=test_product_comment_category).json().get('id')
}
test_product_comment = {
    "product_id": client.post("/products/", json=test_product_comment_product).json().get('id'),
    "user_id": client.post("/users/", json=test_product_comment_user).json().get('id'),
    "comment": "Test12",
    "created_at": f"{datetime.now()}"
}
product_comment_id = []


def test_create_product_comment_success():
    response = client.post("/product_comments/", json=test_product_comment)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["product_id"] == test_product_comment["product_id"]
    assert response_data["user_id"] == test_product_comment["user_id"]
    assert response_data["comment"] == test_product_comment["comment"]
    product_comment_id.append(response_data["id"])


def test_create_product_comment_missing_fields():
    incomplete_comment = test_product_comment.copy()
    incomplete_comment.pop("comment")
    response = client.post("/product_comments/", json=incomplete_comment)
    assert response.status_code == 422


def test_get_all_product_comments():
    response = client.get("/product_comments/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_product_comment_by_id_success():
    existing_comment = client.get(f"/product_comments/product_comment_id/{product_comment_id[0]}")
    response = client.get(f"/product_comments/product_comment_id/{existing_comment.json().get('id')}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["product_id"] == test_product_comment["product_id"]
    assert response_data["user_id"] == test_product_comment["user_id"]
    assert response_data["comment"] == test_product_comment["comment"]


def test_get_product_comment_by_id_not_found():
    response = client.get(f"/product_comments/product_comment_id/{999999}")
    assert response.status_code == 404


def test_update_product_comment_not_found():
    response = client.put(f"/product_comments/{999999}", json=test_product_comment)
    assert response.status_code == 404


def test_update_product_comment_success():
    existing_comment = client.get(f"/product_comments/product_comment_id/{product_comment_id[0]}")
    update_comment_data = {"product_id": test_product_comment.get("product_id"),
                           "user_id": test_product_comment.get("user_id"),
                           "comment": "Обновленный комментарий"}
    response = client.put(f"/product_comments/{existing_comment.json().get('id')}", json=update_comment_data)
    assert response.status_code == 200


def test_delete_product_comment_not_found():
    response = client.delete(f"/product_comments/{999999}")
    assert response.status_code == 404


def test_delete_product_comment_success():
    existing_comment = client.get(f"/product_comments/product_comment_id/{product_comment_id[0]}")
    response = client.delete(f"/product_comments/{existing_comment.json().get('id')}")
    assert response.status_code == 200
    response = client.delete(f"/users/{test_product_comment['user_id']}")
    assert response.status_code == 200
    response = client.delete(f"promotions/{test_product_comment_product['promotion_id']}")
    assert response.status_code == 200
    response = client.delete(f"/categories/{test_product_comment_product['category_id']}")
    assert response.status_code == 200
    response = client.delete(f"/currencies/{test_product_comment_product['currency_id']}")
    assert response.status_code == 200
    response = client.delete(f"/companies/{test_product_comment_product['company_id']}")
    assert response.status_code == 200
    response = client.delete(f"/products/{test_product_comment['product_id']}")


# Тестовые данные для сущности Product
test_product_promotion = {
    "name": "Test12",
    "value": 999997,
    "bool": True
}
test_product_category = {
    "name": "Test13"
}
test_product_currency = {
    "ru": 999996,
    "eu": 999996,
    "br": 999996
}
test_product_company = {
    "name": "Twst13",
    "description": "Test14"
}
test_product = {
    "name": "test15",
    "promotion_id": client.post("/promotions/", json=test_product_promotion).json().get('id'),
    "currency_id": client.post(f"/currencies/", json=test_product_currency).json().get('id'),
    "company_id": client.post(f"/companies/", json=test_product_company).json().get('id'),
    "category_id": client.post(f"/categories/", json=test_product_category).json().get('id')
}
product_id = []


def test_create_product_success():
    response = client.post("/products/", json=test_product)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["name"] == test_product["name"]
    assert response_data["promotion_id"] == test_product["promotion_id"]
    assert response_data["currency_id"] == test_product["currency_id"]
    assert response_data["company_id"] == test_product["company_id"]
    assert response_data["category_id"] == test_product["category_id"]
    product_id.append(response_data["id"])


def test_create_product_missing_fields():
    incomplete_product = test_product.copy()
    incomplete_product.pop("name")
    response = client.post("/products/", json=incomplete_product)
    assert response.status_code == 422


def test_get_all_products():
    response = client.get("/products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_product_by_id_success():
    response = client.get(f"/products/product_id/{product_id[0]}")
    assert response.status_code == 200


def test_get_product_by_id_not_found():
    response = client.get(f"/products/product_id/{999999}")
    assert response.status_code == 404


def test_update_product_success():
    updated_product = test_product.copy()
    updated_product["name"] = "Новые Тапки"
    updated_product["promotion_id"] = test_product["promotion_id"]
    updated_product["currency_id"] = test_product["currency_id"]
    updated_product["category_id"] = test_product["category_id"]
    updated_product["company_id"] = test_product["company_id"]
    response = client.put(f"/products/{product_id[0]}", json=updated_product)
    assert response.status_code == 200


def test_update_product_not_found():
    response = client.put(f"/products/{999999}", json=test_product)
    assert response.status_code == 404


def test_delete_product_success():
    response = client.delete(f"/products/{product_id[0]}")
    assert response.status_code == 200
    response = client.delete(f"promotions/{test_product['promotion_id']}")
    assert response.status_code == 200
    response = client.delete(f"/categories/{test_product['category_id']}")
    assert response.status_code == 200
    response = client.delete(f"/currencies/{test_product['currency_id']}")
    assert response.status_code == 200
    response = client.delete(f"/companies/{test_product['company_id']}")


def test_delete_product_not_found():
    response = client.delete(f"/products/{999999}")
    assert response.status_code == 404



# Пример тестовых данных для сущности OrderProduct
test_order_product_promotion = {
    "name": "Test15",
    "value": 999995,
    "bool": True
}
test_order_product_category = {
    "name": "Test16"
}
test_order_product_currency = {
    "ru": 999995,
    "eu": 999995,
    "br": 999995
}
test_order_product_company = {
    "name": "Test17",
    "description": "Test18"
}
test_order_product_product = {
    "name": "Test19",
    "promotion_id": client.post("/promotions/", json=test_order_product_promotion).json().get('id'),
    "currency_id": client.post(f"/currencies/", json=test_order_product_currency).json().get('id'),
    "company_id": client.post(f"/companies/", json=test_order_product_company).json().get('id'),
    "category_id": client.post(f"/categories/", json=test_order_product_category).json().get('id')
}
test_order_product_user = {
    "name": "Test20",
    "telegram_id": 999994
}
test_order_product_order = {
    "user_id": client.post("/users/", json=test_order_product_user).json().get('id'),
    "date": f"{datetime.now()}",
    "total_price": 999994
}
test_order_product = {
    "order_id": client.post("/orders/", json=test_order_product_order).json().get('id'),
    "product_id": client.post("/products/", json=test_order_product_product).json().get('id'),
    "quantity": 10
}
order_product_id = []


def test_create_order_product_success():
    response = client.post("/orders_products/", json=test_order_product)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["order_id"] == test_order_product["order_id"]
    assert response_data["product_id"] == test_order_product["product_id"]
    assert response_data["quantity"] == test_order_product["quantity"]
    order_product_id.append(response_data["id"])

def test_create_order_product_missing_fields():
    incomplete_order_product = test_order_product.copy()
    incomplete_order_product.pop("quantity")
    response = client.post("/orders_products/", json=incomplete_order_product)
    assert response.status_code == 422

def test_get_all_order_products():
    response = client.get("/orders_products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_order_product_by_id_success():
    existing_order_product = client.get(f"/orders_products/order_product_id/{order_product_id[0]}")
    response = client.get(f"/orders_products/order_product_id/{existing_order_product.json().get('id')}")
    assert response.status_code == 200

def test_get_order_product_by_id_not_found():
    response = client.get(f"/orders_products/order_product_id/{999999}")
    assert response.status_code == 404

def test_update_order_product_not_found():
    response = client.put(f"/orders_products/{999999}", json=test_order_product)
    assert response.status_code == 404

def test_update_order_product_success():
    existing_order_product = client.get(f"/orders_products/order_product_id/{order_product_id[0]}")
    updated_order_products = test_order_product.copy()
    updated_order_products["total_price"] = 100000
    response = client.put(f"/orders_products/{existing_order_product.json().get('id')}", json=updated_order_products)
    assert response.status_code == 200

def test_delete_order_product_not_found():
    response = client.delete(f"/orders_products/{999999}")
    assert response.status_code == 404

def test_delete_order_product_success():
    existing_order_product = client.get(f"/orders_products/order_product_id/{order_product_id[0]}")
    response = client.delete(f"/orders_products/{existing_order_product.json().get('id')}")
    assert response.status_code == 200
    response = client.delete(f"/orders/{test_order_product['order_id']}")
    assert response.status_code == 200
    response = client.delete(f"/products/{test_order_product['product_id']}")
    assert response.status_code == 200
    response = client.delete(f"/users/{test_order_product_order['user_id']}")
    assert response.status_code == 200
    response = client.delete(f"promotions/{test_order_product_product['promotion_id']}")
    assert response.status_code == 200
    response = client.delete(f"/categories/{test_order_product_product['category_id']}")
    assert response.status_code == 200
    response = client.delete(f"/currencies/{test_order_product_product['currency_id']}")
    assert response.status_code == 200
    response = client.delete(f"/companies/{test_order_product_product['company_id']}")



# Пример тестовых данных для сущности OrderProduct
test_order_user = {
    "name": "Test21",
    "telegram_id": 999993
}
test_order = {
    "user_id": client.post("/users/", json=test_order_user).json().get('id'),
    "date": f"{datetime.now()}",
    "total_price": 999992
}
order_id = []


def test_create_order_success():
    response = client.post("/orders/", json=test_order)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["user_id"] == test_order["user_id"]
    order_id.append(response_data["id"])


def test_create_order_missing_fields():
    incomplete_order = test_order.copy()
    incomplete_order.pop("total_price")
    response = client.post("/orders/", json=incomplete_order)
    assert response.status_code == 422


def test_get_all_orders():
    response = client.get("/orders/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_order_by_id_success():
    existing_order = client.get(f"/orders/order_id/{order_id[0]}")
    response = client.get(f"/orders/order_id/{existing_order.json().get('id')}")
    assert response.status_code == 200


def test_get_order_by_id_not_found():
    response = client.get(f"/orders/order_id/{999999}")
    assert response.status_code == 404


def test_update_order_not_found():
    response = client.put(f"/orders/{999999}", json=test_order)
    assert response.status_code == 404


def test_update_order_success():
    existing_order = client.get(f"/orders/order_id/{order_id[0]}")
    updated_order = test_order.copy()
    updated_order["total_price"] = 10002100
    response = client.put(f"/orders/{existing_order.json().get('id')}", json=updated_order)
    assert response.status_code == 200


def test_delete_order_not_found():
    response = client.delete(f"/orders/{999999}")
    assert response.status_code == 404


def test_delete_order_success():
    existing_order = client.get(f"/orders/order_id/{order_id[0]}")
    response = client.delete(f"/orders/{existing_order.json().get('id')}")
    assert response.status_code == 200
    response = client.delete(f"/users/{test_order['user_id']}")
    assert response.status_code == 200



# Пример тестовых данных для сущности OrderProduct
test_product_characteristic_promotion = {
    "name": "Test22",
    "value": 999993,
    "bool": True
}
test_product_characteristic_category = {
    "name": "Test23"
}
test_product_characteristic_currency = {
    "ru": 999992,
    "eu": 999992,
    "br": 999992
}
test_product_characteristic_company = {
    "name": "Test24",
    "description": "Test25"
}
test_product_characteristic_characteristic = {
    "name": "Test26",
    "type": "INT"
}
test_product_characteristic_product = {
    "name": "Test27",
    "promotion_id": client.post("/promotions/", json=test_product_characteristic_promotion).json().get('id'),
    "currency_id": client.post(f"/currencies/", json=test_product_characteristic_currency).json().get('id'),
    "company_id": client.post(f"/companies/", json=test_product_characteristic_company).json().get('id'),
    "category_id": client.post(f"/categories/", json=test_product_characteristic_category).json().get('id')
}
test_product_characteristic = {
    "product_id": client.post("/products/", json=test_product_characteristic_product).json().get('id'),
    "characteristic_id": client.post("/characteristics/", json=test_product_characteristic_characteristic).json().get('id'),
    "value": "999991"
}
product_characteristic_id = []


def test_create_product_characteristic_success():
    response = client.post("/product_characteristics/", json=test_product_characteristic)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["product_id"] == test_product_characteristic["product_id"]
    assert response_data["characteristic_id"] == test_product_characteristic["characteristic_id"]
    assert response_data["value"] == test_product_characteristic["value"]
    product_characteristic_id.append(response_data["id"])


def test_create_product_characteristic_missing_fields():
    incomplete_product_characteristic = test_product_characteristic.copy()
    incomplete_product_characteristic.pop("value")
    response = client.post("/product_characteristics/", json=incomplete_product_characteristic)
    assert response.status_code == 422


def test_get_all_product_characteristics():
    response = client.get("/product_characteristics/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_product_characteristic_by_id_success():
    response = client.get(f"/product_characteristics/product_characteristic_id/{product_characteristic_id[0]}")
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["product_id"] == test_product_characteristic["product_id"]
    assert response_data["characteristic_id"] == test_product_characteristic["characteristic_id"]
    assert response_data["value"] == test_product_characteristic["value"]

def test_get_product_characteristic_by_id_not_found():
    response = client.get(f"/product_characteristics/product_characteristic_id/{999999}")
    assert response.status_code == 404


def test_update_product_characteristic_success():
    existing_characteristic = client.get(f"/product_characteristics/product_characteristic_id/{product_characteristic_id[0]}")
    updated_characteristic = existing_characteristic.json().copy()
    updated_characteristic["value"] = "40"
    response = client.put(f"/product_characteristics/{product_characteristic_id[0]}", json=updated_characteristic)
    assert response.status_code == 200


def test_update_product_characteristic_not_found():
    response = client.put(f"/product_characteristics/{999999}", json=test_product_characteristic)
    assert response.status_code == 404


def test_delete_product_characteristic_success():
    response = client.delete(f"/product_characteristics/{product_characteristic_id[0]}")
    assert response.status_code == 200
    response = client.delete(f"/products/{test_product_characteristic['product_id']}")
    assert response.status_code == 200
    response = client.delete(f"/characteristics/{test_product_characteristic['characteristic_id']}")
    assert response.status_code == 200
    response = client.delete(f"promotions/{test_product_characteristic_product['promotion_id']}")
    assert response.status_code == 200
    response = client.delete(f"/categories/{test_product_characteristic_product['category_id']}")
    assert response.status_code == 200
    response = client.delete(f"/currencies/{test_product_characteristic_product['currency_id']}")
    assert response.status_code == 200
    response = client.delete(f"/companies/{test_product_characteristic_product['company_id']}")


def test_delete_product_characteristic_not_found():
    response = client.delete(f"/product_characteristics/{999999}")
    assert response.status_code == 404



"""test_image_product_promotion = {
    "name": "Акцияwdawda 1dadwadawdwadaw0fxfxfxhyg процентовawdawdawdawdawdaawdawd",
    "value": 1022321102,
    "bool": True
}
test_image_product_category = {
    "name": "Набоdwadawwdaрsadadawdawdawd"
}
test_image_product_currency = {
    "ru": 1000211,
    "eu": 251111,
    "br": 101111
}
test_image_product_company = {
    "name": "Аadwaddwadдидасawdawdwadawdaw",
    "description": "Пwadaроdwadwadизводитель обувиdawawdawd"
}
test_image_product_characteristic = {
    "name": "Размерadawdawadawwdawda",
    "type": "INT"
}
test_image_product_product = {
    "name": "Тапкиdwadwadawkmkadwwadmawdawd",
    "promotion_id": client.post("/promotions/", json=test_image_product_promotion).json().get('id'),
    "currency_id": client.post(f"/currencies/", json=test_image_product_currency).json().get('id'),
    "company_id": client.post(f"/companies/", json=test_image_product_company).json().get('id'),
    "category_id": client.post(f"/categories/", json=test_image_product_category).json().get('id')
}
del product_id
product_id = [client.post("/products/", json=test_image_product_product).json().get('id')]


def test_image_upload_product_success():
    image_path = Path("./test_image.png")
    with image_path.open("rb") as image_file:
        response = client.post(
            "/image_upload/product",
            files={"files": ("test_image.jpg", image_file, "image/jpeg")},
            data={"product_id": product_id[0]}
        )
    assert response.status_code == 200
    response_data = response.json()
    assert isinstance(response_data, list)
    assert len(response_data) > 0
    response = client.delete(f"/products/{product_id[0]}")
    assert response.status_code == 200
    response = client.delete(f"promotions/{test_image_product_product['promotion_id']}")
    assert response.status_code == 200
    response = client.delete(f"/categories/{test_image_product_product['category_id']}")
    assert response.status_code == 200
    response = client.delete(f"/currencies/{test_image_product_product['currency_id']}")
    assert response.status_code == 200
    response = client.delete(f"/companies/{test_image_product_product['company_id']}")



test_image_comment_promotion = {
    "name": "Акциdawdawяwdawda 1dadwadawdwadaw0fxfxfxhyg п",
    "value": 102223212,
    "bool": True
}
test_image_comment_category = {
    "name": "Набоdwadwadawddawwdaрsadadawdawdawd"
}
test_image_comment_currency = {
    "ru": 10002211,
    "eu": 2511211,
    "br": 1012111
}
test_image_comment_company = {
    "name": "Аadwdwadaaddwadдидасawdawdwadawdaw",
    "description": "Пwaddawaроdwadwadизводитель обувиdawawdawd"
}
test_image_comment_characteristic = {
    "name": "Размерdwaadawdawadawwdawda",
    "type": "INT"
}
test_image_comment_product = {
    "name": "Тапкиdwadwdwawaadawkmkadwwadmawdawd",
    "promotion_id": client.post("/promotions/", json=test_image_comment_promotion).json().get('id'),
    "currency_id": client.post(f"/currencies/", json=test_image_comment_currency).json().get('id'),
    "company_id": client.post(f"/companies/", json=test_image_comment_company).json().get('id'),
    "category_id": client.post(f"/categories/", json=test_image_comment_category).json().get('id')
}
test_image_comment_user = {
    "name": "afaefadadawef",
    "telegram_id": 10202
}
test_image_comment_comment = {
    "product_id": client.post(f"/products/", json=test_image_comment_product).json().get('id'),
    "user_id": client.post(f"/product_comments/", json=test_image_comment_user).json().get('id'),
    "comment": "dawdawdwad",
    "created_at": f"{datetime.now()}"
}
comment_id = [client.post("/product_comments/", json=test_image_comment_comment).json().get('id')]


def test_image_upload_comment_success():
    image_path = Path("./test_image.png")
    with image_path.open("rb") as image_file:
        response = client.post(
            "/image_upload/comment",
            files={"files": ("test_image.jpg", image_file, "image/jpeg")},
            data={"comment_id": comment_id[0]}
        )
    assert response.status_code == 200
    response_data = response.json()
    assert isinstance(response_data, list)
    assert len(response_data) > 0
    response = client.delete(f"/products/{test_image_comment_comment['product_id']}")
    assert response.status_code == 200
    response = client.delete(f"promotions/{test_image_comment_product['promotion_id']}")
    assert response.status_code == 200
    response = client.delete(f"/categories/{test_image_comment_product['category_id']}")
    assert response.status_code == 200
    response = client.delete(f"/currencies/{test_image_comment_product['currency_id']}")
    assert response.status_code == 200
    response = client.delete(f"/companies/{test_image_comment_product['company_id']}")
    assert response.status_code == 200
    response = client.delete(f"/product_comments/{comment_id[0]}")
    assert response.status_code == 200"""



