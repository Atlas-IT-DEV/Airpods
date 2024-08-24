from pydantic import (BaseModel, Field, StrictStr, Json, condecimal,
                      StrictInt, PrivateAttr, SecretBytes, StrictBytes)
from enum import Enum
from typing import Optional, List
from datetime import datetime
import os
from pathlib import Path


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


class Images(BaseModel):
    """
    Model of images
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Url: Optional[StrictStr] = Field(None,
                                     alias="url",
                                     examples=["https://example.com"])


class Users(BaseModel):
    """
    Model of users
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Коля"])
    TelegramID: StrictInt = Field(...,
                                  alias="telegram_id",
                                  examples=[32])
    IconID: Optional[int] = Field(None,
                                  alias="image_id",
                                  examples=[2])


class Categories(BaseModel):
    """
    Model of categories
    """
    ID: Optional[int] = Field(None, alias="id")
    Name: StrictStr = Field(..., alias="name", examples=["Набор"])


class Companies(BaseModel):
    """
    Model of companies
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(..., alias="name",
                            examples=["Apple"])
    Desc: Optional[StrictStr] = Field(None,
                                      alias="description",
                                      examples=["Производитель электроники"])


class Characteristics(BaseModel):
    """
    Model of characteristics
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name",
                            examples=["Размер"])
    Type: CharacteristicTypeEnum = Field(...,
                                         alias="type",
                                         examples=[CharacteristicTypeEnum.Int])


class Products(BaseModel):
    """
    Model of products
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    Name: StrictStr = Field(...,
                            alias="name", examples=["Пюрешка с коклеткой"])
    Price: condecimal(max_digits=10, decimal_places=2) = Field(...,
                                                               alias="price",
                                                               examples=[10])
    CompanyID: StrictInt = Field(...,
                                 alias="company_id",
                                 examples=[32])
    CategoryID: StrictInt = Field(...,
                                  alias="category_id",
                                  examples=[2])
    ImageID: Optional[int] = Field(None,
                                   alias="image_id",
                                   examples=[2])


class ProductsDict(BaseModel):
    """
    Model of products dict
    """
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2])
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2])


class ProductCharacteristics(BaseModel):
    """
    Model of products characteristics
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2])
    CharacteristicID: StrictInt = Field(...,
                                        alias="characteristic_id",
                                        examples=[2])
    Value: StrictStr = Field(...,
                             alias="value",
                             examples=["35"])


class Orders(BaseModel):
    """
    Model of orders
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    UserID: StrictInt = Field(...,
                              alias="user_id",
                              examples=[32])
    Date: Optional[datetime] = Field(datetime.now(),
                                     alias="date",
                                     examples=[f"datetime.now()"])
    TotalPrice: condecimal(max_digits=10, decimal_places=2) = Field(...,
                                                                    alias="total_price",
                                                                    examples=[10])


class OrderProducts(BaseModel):
    """
    Model of order products
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    OrderID: StrictInt = Field(...,
                               alias="order_id",
                               examples=[32])
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2])
    Quantity: StrictInt = Field(...,
                                alias="quantity",
                                examples=[2])


class ProductComments(BaseModel):
    """
    Model of product comments
    """
    ID: Optional[int] = Field(None,
                              alias="id")
    ProductID: StrictInt = Field(...,
                                 alias="product_id",
                                 examples=[2])
    Comment: StrictStr = Field(...,
                               alias="comment",
                               examples=["jenfjnaofnaonfov"])
    CreatedAt: Optional[datetime] = Field(datetime.now(),
                                          alias="created_at",
                                          examples=[f"{datetime.now()}"])
