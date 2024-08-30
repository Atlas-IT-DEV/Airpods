const GetFetches = () => {
  const GetAllUsers = () => {
    fetch("http://5.180.174.189:8008/users/", {
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

  const GetPromotion = () => {
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

  const GetCurrency = () => {
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

  const GetCategory = () => {
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

  const GetCharacteristic = () => {
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

  const GetCompany = () => {
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

  const GetImage = () => {
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

  const ProductComment = () => {
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

  const OrderProduct = () => {
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

  const Order = () => {
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

  const ProductCharacteristic = () => {
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

  const Product = () => {
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
};

export default GetFetches;
