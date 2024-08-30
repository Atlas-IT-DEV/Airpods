import os
import pymysql
from src.utils.custom_logging import setup_logging
from config import Config

config = Config()
log = setup_logging()


class CreateSQL:

    def __init__(self):
        # Определение пути к SQL-файлу
        self.path_to_sql = os.path.join(os.path.dirname(__file__), f"{config.__getattr__('DB')}.sql")

        # Установка соединения с базой данных
        self.connection = pymysql.connect(
            host=config.__getattr__("DB_HOST"),
            port=int(config.__getattr__("DB_PORT")),
            user=config.__getattr__("DB_USER"),
            password=config.__getattr__("DB_PASSWORD"),
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )

    def read_sql(self):
        try:
            with self.connection.cursor() as cursor:
                # Создание базы данных, если она не существует
                cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{config.__getattr__('DB')}`")
                cursor.execute(f"USE `{config.__getattr__('DB')}`")

                # Открываем и выполняем SQL-скрипт
                with open(self.path_to_sql, "r", encoding="utf-8") as f:
                    sql_script = f.read()

                    # Разделение SQL-скрипта на отдельные запросы
                    statements = [stmt.strip() for stmt in sql_script.split(';') if stmt.strip()]

                    # Выполнение всех запросов в файле
                    for statement in statements:
                        try:
                            cursor.execute(statement)
                            log.info("Executed SQL statement: %s", statement)
                        except pymysql.MySQLError as e:
                            log.warning("SQL Error: %s", exc_info=e)
                            # Логирование неудачных запросов может помочь в отладке

                self.connection.commit()
                log.info("Database was created and SQL script executed successfully")
        except Exception as ex:
            log.warning("Error during SQL script execution", exc_info=ex)
        finally:
            self.connection.close()


if __name__ == "__main__":
    create_sql = CreateSQL()
    create_sql.read_sql()
