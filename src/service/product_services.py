from src.repository import product_repository
from src.database.models import Products
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists
from src.service.promotion_services import get_promotion_by_id
from src.service.currency_services import get_currency_by_id
from src.service.category_services import get_category_by_id
from src.service.company_services import get_company_by_id


def get_all_products():
    products = product_repository.get_all_products()
    return [Products(**product) for product in products]


def get_product_by_id(product_id: int):
    product = product_repository.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    return Products(**product) if product else None


def create_product(product: Products):
    check_if_exists(
        get_all=get_all_products,
        attr_name="Name",
        attr_value=product.Name,
        exception_detail='Product already exist'
    )
    existing_promotion = get_promotion_by_id(product.PromotionID)
    existing_currency = get_currency_by_id(product.CurrencyID)
    existing_category = get_category_by_id(product.CategoryID)
    existing_company = get_company_by_id(product.CompanyID)
    product_id = product_repository.create_product(product)
    return get_product_by_id(product_id)


def update_product(product_id: int, product: Products):
    existing_product = get_product_by_id(product_id)
    check_for_duplicates(
        get_all=get_all_products,
        check_id=product_id,
        attr_name="Name",
        attr_value=product.Name,
        exception_detail='Product already exist'
    )
    existing_promotion = get_promotion_by_id(product.PromotionID)
    existing_currency = get_currency_by_id(product.CurrencyID)
    existing_category = get_category_by_id(product.CategoryID)
    existing_company = get_company_by_id(product.CompanyID)
    product_repository.update_product(product_id, product)
    return {"message": "Product updated successfully"}


def delete_product(product_id: int):
    existing_product = get_product_by_id(product_id)
    product_repository.delete_product(product_id)
    return {"message": "Product deleted successfully"}
