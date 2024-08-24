from src.database.my_connector import Database
from src.database.models import Companies
db = Database()


def get_all_companies():
    query = "SELECT * FROM companies"
    return db.fetch_all(query)


def get_company_by_id(company_id: int):
    query = "SELECT * FROM companies WHERE id=%s"
    return db.fetch_one(query, (company_id,))


def create_company(company: Companies):
    query = "INSERT INTO companies (name, description) VALUES (%s, %s)"
    params = (company.Name, company.Desc)
    cursor = db.execute_query(query, params)
    return cursor.lastrowid


def update_company(company_id: int, company: Companies):
    query = "UPDATE companies SET name=%s, description=%s WHERE id=%s"
    params = (company.Name, company.Desc, company_id)
    db.execute_query(query, params)


def delete_company(company_id: int):
    query = "DELETE FROM companies WHERE id=%s"
    db.execute_query(query, (company_id,))
