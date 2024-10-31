from pydantic import (BaseModel, Field, StrictStr, Json, condecimal,
                      StrictInt, PrivateAttr, SecretBytes, StrictBytes, StrictBool, model_validator)
from enum import Enum
from typing import Optional, List
from datetime import datetime
import os
from pathlib import Path

from twisted.web.rewrite import alias


class CharacteristicTypeEnum(StrictStr, Enum):
    """
    Model of characteristic types
    """
    Int = 'INT'
    Varchar = 'VARCHAR'
    Boolean = 'BOOLEAN'
    Float = 'FLOAT'
    Text = 'TEXT'
    TimeStamp = 'TIMESTAMP'
    Decimal = 'DECIMAL'
    Json = 'JSON'


class ImageTypeEnum(StrictStr, Enum):
    """
    Model of product image types
    """
    Main = 'main'
    Additional = 'additional'


class Images(BaseModel):
    """
    Model of images
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Url: StrictStr = Field(...,
                           alias="url",
                           examples=["https://example.com"],
                           description="URL of images")


class ProductImages(BaseModel):
    """
    Model of product images
    """
    ID: Optional[int] = Field(None,
                                alias="id")
    ProductID: StrictInt = Field(...,
                                alias="product_id",
                                examples=[2],
                                description="Product ID of product")
    ImageID: StrictInt = Field(...,
                                alias="image_id",
                                examples=[2],
                                description="Image ID of product")
    ImageType: ImageTypeEnum = Field(...,
                                alias="image_type",
                                examples=[ImageTypeEnum.Main],
                                description="Image type")
    Color: Optional[StrictStr] = Field(None,
                                        alias="color",
                                        examples=["Красный"],
                                        description="Color of product")


class CommentImages(BaseModel):
    """
    Model of comment images
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    CommentID: StrictInt = Field(...,
                                 alias="comment_id",
                                 examples=[2],
                                 description="Comment ID of comment")
    ImageID: StrictInt = Field(...,
                               alias="image_id",
                               examples=[2],
                               description="Image ID of comment")


class Users(BaseModel):
    """
    Model of users
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Коля"],
                            description="Name of user")
    TelegramID: StrictInt = Field(...,
                                  alias="telegram_id",
                                  examples=[32],
                                  description="Telegram ID of user")


class Categories(BaseModel):
    """
    Model of categories
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Набор"],
                            description="Name of category")


class Companies(BaseModel):
    """
    Model of companies
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Apple"],
                            description="Name of company")
    Desc: Optional[StrictStr] = Field(None,
                                      alias="description",
                                      examples=["Производитель электроники"],
                                      description="Description of company")


class Currencies(BaseModel):
    """
    Model of currencies
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    RU: StrictInt = Field(...,
                          alias="ru",
                          examples=[1000],
                          description="Ru of currency")
    EU: StrictInt = Field(...,
                          alias="eu",
                          examples=[30],
                          description="EU currency")
    BR: StrictInt = Field(...,
                          alias="br",
                          examples=[30],
                          description="BR currency")


class Characteristics(BaseModel):
    """
    Model of characteristics
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Размер"],
                            description="Name of characteristic")
    Type: CharacteristicTypeEnum = Field(...,
                                         alias="type",
                                         examples=[CharacteristicTypeEnum.Int],
                                         description="Type of characteristic")


class Products(BaseModel):
    """
    Model of products
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Пюрешка с коклеткой"],
                            description="Name of product")
    PromotionID: Optional[StrictInt] = Field(None,
                                             alias="promotion_id",
                                             examples=[1],
                                             description="PromotionID of product")
    CurrencyID: StrictInt = Field(...,
                                  alias="currency_id",
                                  examples=[1],
                                  description="CurrencyID of product")
    CompanyID: StrictInt = Field(...,
                                 alias="company_id",
                                 examples=[32],
                                 description="Company ID of product")
    CategoryID: StrictInt = Field(...,
                                  alias="category_id",
                                  examples=[2],
                                  description="Category ID of product")
    Price: condecimal(max_digits=10, decimal_places=2) = Field(...,
                                                               alias="price",
                                                               examples=[10.00],
                                                               description="Price of product")
    IsActive: StrictStr = Field(...,
                                alias="is_active",
                                examples=['Y'],
                                description="Is active product")
    Position: StrictInt = Field(...,
                                alias="position",
                                examples=[1000],
                                description="Position of product in category")


class Promotions(BaseModel):
    """
    Model of promotions
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    NameCat: StrictStr = Field(...,
                               alias="name",
                               examples=["Скидка 8 процентов"],
                               description="Name of promotion category")
    ValueCat: StrictInt = Field(...,
                                alias="value",
                                examples=[2],
                                description="Value of promotion category")
    BoolCat: StrictBool = Field(...,
                                alias="bool",
                                examples=[True],
                                description="Boolean value of promotion category")

    @model_validator(mode="before")
    def convert_bool(cls, values):
        if 'bool' in values and isinstance(values['bool'], int):
            values['bool'] = bool(values['bool'])
        return values


class ProductsDict(BaseModel):
    """
    Model of products dict
    """
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")


class ProductCharacteristics(BaseModel):
    """
    Model of products characteristics
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    CharacteristicID: StrictInt = Field(...,
                                        alias="characteristic_id",
                                        examples=[2],
                                        description="Characteristic ID of product")
    Value: StrictStr = Field(...,
                             alias="value",
                             examples=["35"],
                             description="Value of characteristic")


class Orders(BaseModel):
    """
    Model of orders
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[32],
                              description="User ID of user")
    Date: Optional[datetime] = Field(datetime.now(),
                                     alias="date",
                                     examples=[f"{datetime.now()}"],
                                     description="Date of order")
    TotalPrice: condecimal(max_digits=10, decimal_places=2) = Field(...,
                                                                    alias="total_price",
                                                                    examples=[10],
                                                                    description="Total price of order")


class OrderProducts(BaseModel):
    """
    Model of order products
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    OrderID: StrictInt = Field(...,
                               alias="order_id",
                               examples=[32],
                               description="Order ID of product")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2],
                                 description="Product ID of product")
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2],
                                description="Quantity of product")


class ProductComments(BaseModel):
    """
    Model of product comments
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2])
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[2])
    Comment: StrictStr = Field(...,
                               alias="comment",
                               examples=["jenfjnaofnaonfov"],
                               description="Description of product")
    CreatedAt: Optional[datetime] = Field(datetime.now(),
                                          alias="created_at",
                                          examples=[f"{datetime.now()}"],
                                          description="Date of creation")


# Egor 29.10.2024
class Storis(BaseModel):
    """
    Model of storis
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: Optional[StrictInt] = Field(None,
                                alias="product_id",
                                examples=[2],
                                description="Product ID of product")
    Name: Optional[StrictStr] = Field(None,
                                alias="name",
                                examples=["Название сторис"],
                                description="Name")
    ImageUrl: Optional[StrictStr] = Field(None,
                                alias="image_url",
                                examples=["Ссылка на изображение для сториса"],
                                description="Image url")
    Link: Optional[StrictStr] = Field(None,
                                alias="link",
                                examples=["Ссылка"],
                                description="Link")
    

class ProductAudio(BaseModel):
    """
    Model of product_audio_test
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: Optional[StrictInt] = Field(None,
                                alias="product_id",
                                examples=[2],
                                description="Product ID of product")
    OriginalUrl: Optional[StrictStr] = Field(None,
                                alias="original_url",
                                examples=["Ссылка на файл звукового теста оригинального продукта"],
                                description="Original url")
    OurUrl: Optional[StrictStr] = Field(None,
                                alias="our_url",
                                examples=["Ссылка на файл звукового теста реплики продукта"],
                                description="Our url")
# /Egor 29.10.2024
