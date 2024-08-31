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
