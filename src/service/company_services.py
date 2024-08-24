from src.repository import company_repository
from src.database.models import Companies
from fastapi import HTTPException, status


def get_all_companies():
    companies = company_repository.get_all_companies()
    return [Companies(**company) for company in companies]


def get_company_by_id(company_id: int):
    company = company_repository.get_company_by_id(company_id)
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Company not found')
    return Companies(**company) if company else None


def create_company(company: Companies):
    company_id = company_repository.create_company(company)
    return get_company_by_id(company_id)


def update_company(company_id: int, company: Companies):
    existing_company = get_company_by_id(company_id)
    company_repository.update_company(company_id, company)
    return {"message": "Company updated successfully"}


def delete_company(company_id: int):
    existing_company = get_company_by_id(company_id)
    company_repository.delete_company(company_id)
    return {"message": "Company deleted successfully"}
