const baseUrl = "http://5.180.174.189:8008";
export const getAllUsers = async () => {
  const response = await fetch(baseUrl + "/users/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllPromotions = async () => {
  const response = await fetch(baseUrl + "/promotions/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllCurrencies = async () => {
  const response = await fetch(baseUrl + "/currencies/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllCategories = async () => {
  const response = await fetch(baseUrl + "/categories/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllCharacteristics = async () => {
  const response = await fetch(baseUrl + "/characteristics/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllCompanies = async () => {
  const response = await fetch(baseUrl + "/companies/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllImages = async () => {
  const response = await fetch(baseUrl + "/images/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllProductComments = async () => {
  const response = await fetch(baseUrl + "/product_comments/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllOrderProducts = async () => {
  const response = await fetch(baseUrl + "/orders_products/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllOrders = async () => {
  const response = await fetch(baseUrl + "/orders/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllProductCharacteristics = async () => {
  const response = await fetch(baseUrl + "/product_characteristics/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getAllProducts = async () => {
  const response = await fetch(baseUrl + "/products/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const createUser = async () => {
  const response = await fetch(baseUrl + "/users/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      name: "",
      telegram_id: 0,
    }),
  });
  const result = await response.json();
  return result;
};

export const createPromotion = async () => {
  const response = await fetch(baseUrl + "/promotions/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      name: "",
      value: 0,
      bool: true,
    }),
  });
  const result = await response.json();
  return result;
};

export const createCurrency = async () => {
  const response = await fetch(baseUrl + "/currencies/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      ru: 0,
      eu: 0,
      br: 0,
    }),
  });
  const result = await response.json();
  return result;
};

export const createCategory = async () => {
  const response = await fetch(baseUrl + "/categories/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      name: "",
    }),
  });
  const result = await response.json();
  return result;
};

export const createCharacteristic = async () => {
  const response = await fetch(baseUrl + "/characteristics/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      name: "",
      type: "",
    }),
  });
  const result = await response.json();
  return result;
};

export const createCompany = async () => {
  const response = await fetch(baseUrl + "/companies/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      name: "0",
      description: "",
    }),
  });
  const result = await response.json();
  return result;
};

export const createProductComment = async () => {
  const response = await fetch(baseUrl + "/product_comments/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      product_id: 0,
      user_id: 0,
      comment: "",
      created_at: "",
    }),
  });
  const result = await response.json();
  return result;
};

export const createOrderProduct = async () => {
  const response = await fetch(baseUrl + "/orders_products/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      order_id: 0,
      product_id: 0,
      quantity: 0,
    }),
  });
  const result = await response.json();
  return result;
};

export const createOrder = async () => {
  const response = await fetch(baseUrl + "/orders/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      user_id: 0,
      date: "",
      total_price: 0,
    }),
  });
  const result = await response.json();
  return result;
};

export const createProductCharacteristic = async () => {
  const response = await fetch(baseUrl + "/product_characteristics/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      product_id: 0,
      characteristic_id: 0,
      value: "",
    }),
  });
  const result = await response.json();
  return result;
};

export const createProduct = async () => {
  const response = await fetch(baseUrl + "/products/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      name: "",
      promotion_id: 0,
      currency_id: 0,
      company_id: 0,
      category_id: 0,
    }),
  });
  const result = await response.json();
  return result;
};

export const getUserById = async (id) => {
  const response = await fetch(baseUrl + `/users/user_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getUserByTelegramId = async (id) => {
  const response = await fetch(baseUrl + `/users/telegram_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getPromotionById = async (id) => {
  const response = await fetch(baseUrl + `/promotions/promotion_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getPromotionByName = async (name) => {
  const response = await fetch(baseUrl + `/promotions/promotion_name/${name}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getCurrencyById = async (id) => {
  const response = await fetch(baseUrl + `/currencies/currency_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getCategoryById = async (id) => {
  const response = await fetch(baseUrl + `/categories/category_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getCharacteristicById = async (id) => {
  const response = await fetch(
    baseUrl + `/characteristics/characteristic_id/${id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
};

export const getCompanyById = async (id) => {
  const response = await fetch(baseUrl + `/companies/company_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getProductCommentById = async (id) => {
  const response = await fetch(
    baseUrl + `/product_comments/product_comment_id/${id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
};

export const getOrderProductById = async (id) => {
  const response = await fetch(
    baseUrl + `/orders_products/order_product_id/${id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
};

export const getOrderById = async (id) => {
  const response = await fetch(baseUrl + `/orders/order_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getOrderByUserId = async (user_id) => {
  const response = await fetch(baseUrl + `/orders/user_id/${user_id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};

export const getProductCharacteristicById = async (id) => {
  const response = await fetch(
    baseUrl + `/product_characteristics/product_characteristic_id/${id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );
  const result = await response.json();
  return result;
};

export const getProductById = async (id) => {
  const response = await fetch(baseUrl + `/products/product_id/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result;
};
//формула на любой пост гет по айди просто в ссылку вставляяешь после слеша айди того че тебе нало
