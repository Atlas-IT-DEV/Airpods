from config import Config
from src.utils.custom_logging import setup_logging


config = Config()
log = setup_logging()


def debug_ex(ex):
    if config.__getattr__("DEBUG") == "TRUE":
        log.exception(ex)


def debug_err(err):
    if config.__getattr__("DEBUG") == "TRUE":
        log.error(err)


def debug_info(info):
    if config.__getattr__("DEBUG") == "TRUE":
        log.info(info)
