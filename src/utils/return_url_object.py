from fastapi.responses import FileResponse, JSONResponse
from src.database.models import Images
from config import Config
config = Config()


def return_url_object(image: Images, name_object: str, dir_object: dict) -> JSONResponse:
    return JSONResponse({
        f"{name_object}": dir_object,
        "image_url": f"http://{config.__getattr__('HOST')}:{config.__getattr__('SERVER_PORT')}/"
                     f"public/{image.Url.split('/')[-1]}"
    })
