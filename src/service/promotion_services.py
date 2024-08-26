from src.repository import promotion_repository
from src.database.models import Promotions
from fastapi import HTTPException, status
from src.utils.exam_services import check_for_duplicates, check_if_exists


def get_all_promotions():
    promotions = promotion_repository.get_all_promotions()
    return [Promotions(**promotion) for promotion in promotions]


def get_promotion_by_id(promotion_id: int):
    promotion = promotion_repository.get_promotion_by_id(promotion_id)
    if not promotion:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Promotion not found')
    return Promotions(**promotion) if promotion else None


def get_promotion_by_name(promotion_name: str):
    promotion = promotion_repository.get_promotion_by_name(promotion_name)
    if not promotion:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Promotion not found')
    return Promotions(**promotion) if promotion else None


def create_promotion(promotion: Promotions):
    check_if_exists(
        get_all=get_all_promotions,
        attr_name="NameCat",
        attr_value=promotion.NameCat,
        exception_detail='Promotion already exist'
    )
    promotion_id = promotion_repository.create_promotion(promotion)
    return get_promotion_by_id(promotion_id)


def update_promotion(promotion_id: int, promotion: Promotions):
    check_for_duplicates(
        get_all=get_all_promotions,
        check_id=promotion_id,
        attr_name="NameCat",
        attr_value=promotion.NameCat,
        exception_detail='Promotion already exist'
    )
    promotion_repository.update_promotion(promotion_id, promotion)
    return {"message": "Promotion updated successfully"}


def delete_promotion(promotion_id: int):
    existing_promotion = get_promotion_by_id(promotion_id)
    promotion_repository.delete_promotion(promotion_id)
    return {"message": "Promotion deleted successfully"}
