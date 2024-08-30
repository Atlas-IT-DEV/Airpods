const baseUrl = 'http://5.180.174.189:8008/'
export const GetAllUsers = async () => {
  const response = await fetch(baseUrl + "users/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
  const result = await response.json()
  return result
};

export const GetPromotion = () => {
  fetch("http://5.180.174.189:8008/promotions/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const GetCurrency = () => {
  fetch("http://5.180.174.189:8008/currencies/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const GetCategory = () => {
  fetch("http://5.180.174.189:8008/categories/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const GetCharacteristic = () => {
  fetch("http://5.180.174.189:8008/characteristics/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const GetCompany = () => {
  fetch("http://5.180.174.189:8008/companies/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const GetImage = () => {
  fetch("http://5.180.174.189:8008/images/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const ProductComment = () => {
  fetch("http://5.180.174.189:8008/product_comments/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const OrderProduct = () => {
  fetch("http://5.180.174.189:8008/orders_products/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const Order = () => {
  fetch("http://5.180.174.189:8008/orders/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const ProductCharacteristic = () => {
  fetch("http://5.180.174.189:8008/product_characteristics/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};

export const Product = () => {
  fetch("http://5.180.174.189:8008/products/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
};
