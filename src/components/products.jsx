import { useState } from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import dyson_logo from "./../images/dyson1.svg";
import goldsets from "./../images/goldsale.png";
import SortBar from "./sortBar";
import { useStores } from "../store/store_context";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Image } from "@chakra-ui/react";

import cart from "../images/shopping-cart.svg";
import fav_inact from "../images/fav.svg";
import fav_act from "../images/fav_act.svg";
import ProductCard from "./product_card";

const Products = observer(() => {
  const scrollEffect = (targetRef) => {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const [products, setProducts] = useState([]);
  const watchesRef = useRef(null);
  const headphonesRef = useRef(null);
  const accessoriesRef = useRef(null);
  const dysonRef = useRef(null);
  const setsRef = useRef(null);
  const { pageStore } = useStores();
  const navigate = useNavigate();
  useEffect(() => {
    pageStore.getProducts();
  }, []);
  useEffect(() => {
    let copy_products = Array.from(pageStore.products);
    copy_products = copy_products.filter((elem) =>
      elem.name.toLowerCase().includes(pageStore.search.toLowerCase())
    );
    if (pageStore.sort != 2) {
      if (pageStore.sort == 1) {
        copy_products = copy_products.sort(
          (a, b) => b.currency.ru - a.currency.ru
        );
      } else {
        copy_products = copy_products.sort(
          (a, b) => a.currency.ru - b.currency.ru
        );
      }
    }
    setProducts(copy_products);
  }, [pageStore.products, pageStore.search, pageStore.sort]);

  return (
    <div>
      <div>
        <div id="header_production">
          <p>Наша продукция</p>
        </div>
        <div>
          <SortBar />
        </div>
        <div id="our_products">
          <div class="product" onClick={() => scrollEffect(headphonesRef)}>
            <div class="product_logo">
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.24023 22.6667V16C6.24023 13.3478 7.2938 10.8043 9.16917 8.92894C11.0445 7.05357 13.5881 6 16.2402 6C18.8924 6 21.4359 7.05357 23.3113 8.92894C25.1867 10.8043 26.2402 13.3478 26.2402 16V22.6667"
                  stroke="url(#paint0_linear_125_1542)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.2402 23.7777C26.2402 24.3671 26.0061 24.9323 25.5894 25.3491C25.1726 25.7658 24.6074 26 24.018 26H22.9069C22.3175 26 21.7523 25.7658 21.3356 25.3491C20.9188 24.9323 20.6847 24.3671 20.6847 23.7777V20.4444C20.6847 19.855 20.9188 19.2898 21.3356 18.873C21.7523 18.4563 22.3175 18.2222 22.9069 18.2222H26.2402V23.7777ZM6.24023 23.7777C6.24023 24.3671 6.47436 24.9323 6.89111 25.3491C7.30786 25.7658 7.87309 26 8.46246 26H9.57357C10.1629 26 10.7282 25.7658 11.1449 25.3491C11.5617 24.9323 11.7958 24.3671 11.7958 23.7777V20.4444C11.7958 19.855 11.5617 19.2898 11.1449 18.873C10.7282 18.4563 10.1629 18.2222 9.57357 18.2222H6.24023V23.7777Z"
                  stroke="url(#paint1_linear_125_1542)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_125_1542"
                    x1="5.49743"
                    y1="6"
                    x2="27.2472"
                    y2="7.43814"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_125_1542"
                    x1="5.49743"
                    y1="18.2222"
                    x2="26.9123"
                    y2="21.2565"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p class="product_description_golden">Наушники</p>
          </div>
          <div class="product" onClick={() => scrollEffect(watchesRef)}>
            <div class="product_logo">
              <svg
                width="23"
                height="30"
                viewBox="0 0 23 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9272 6.76001H4.38053C2.90777 6.76001 1.71387 7.95392 1.71387 9.42668V20.6267C1.71387 22.0994 2.90777 23.2933 4.38053 23.2933H15.9272C17.4 23.2933 18.5939 22.0994 18.5939 20.6267V9.42668C18.5939 7.95392 17.4 6.76001 15.9272 6.76001Z"
                  stroke="url(#paint0_linear_125_1521)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.5138 6.70664V5.14664C15.6014 4.34099 15.3721 3.53288 14.8744 2.89333C14.3766 2.25378 13.6496 1.83297 12.8472 1.71997H7.44715C6.64468 1.83297 5.91766 2.25378 5.41995 2.89333C4.92225 3.53288 4.69291 4.34099 4.78049 5.14664V6.70664"
                  stroke="url(#paint1_linear_125_1521)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.78034 23.3467V24.8933C4.69692 25.6938 4.92877 26.4953 5.42666 27.1276C5.92456 27.76 6.64929 28.1733 7.44701 28.28H12.847C13.6447 28.1733 14.3695 27.76 14.8674 27.1276C15.3652 26.4953 15.5971 25.6938 15.5137 24.8933V23.3467"
                  stroke="url(#paint2_linear_125_1521)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.7671 10.16V13.3334"
                  stroke="url(#paint3_linear_125_1521)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_125_1521"
                    x1="1.08694"
                    y1="6.76001"
                    x2="19.4658"
                    y2="7.79396"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_125_1521"
                    x1="4.36221"
                    y1="1.71997"
                    x2="15.9613"
                    y2="3.10033"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_125_1521"
                    x1="4.36379"
                    y1="23.3467"
                    x2="15.956"
                    y2="24.7407"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_125_1521"
                    x1="21.7299"
                    y1="10.16"
                    x2="22.8219"
                    y2="10.179"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p class="product_description_golden">Часы</p>
          </div>
          {/* <div class="product" onClick={() => scrollEffect(setsRef)}>
            <div class="product_logo">
              <img src={goldsets} />
            </div>
            <p class="product_description_golden">Наборы</p>
          </div> */}
          <div class="product" onClick={() => scrollEffect(accessoriesRef)}>
            <div class="product_logo">
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.2402 12.5333L10.2402 5.61328"
                  stroke="url(#paint0_linear_128_3763)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.2402 21.3334V10.6667C28.2398 10.1991 28.1163 9.73978 27.8823 9.33492C27.6483 8.93005 27.3119 8.59385 26.9069 8.36003L17.5736 3.0267C17.1682 2.79265 16.7083 2.66943 16.2402 2.66943C15.7721 2.66943 15.3123 2.79265 14.9069 3.0267L5.57357 8.36003C5.16858 8.59385 4.83221 8.93005 4.59818 9.33492C4.36416 9.73978 4.24071 10.1991 4.24023 10.6667V21.3334C4.24071 21.801 4.36416 22.2603 4.59818 22.6651C4.83221 23.07 5.16858 23.4062 5.57357 23.64L14.9069 28.9734C15.3123 29.2074 15.7721 29.3306 16.2402 29.3306C16.7083 29.3306 17.1682 29.2074 17.5736 28.9734L26.9069 23.64C27.3119 23.4062 27.6483 23.07 27.8823 22.6651C28.1163 22.2603 28.2398 21.801 28.2402 21.3334Z"
                  stroke="url(#paint1_linear_128_3763)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.6001 9.28003L16.2401 16.0134L27.8801 9.28003"
                  stroke="url(#paint2_linear_128_3763)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.2402 29.44V16"
                  stroke="url(#paint3_linear_128_3763)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_128_3763"
                    x1="9.79455"
                    y1="5.61328"
                    x2="22.7829"
                    y2="6.85435"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_128_3763"
                    x1="3.34887"
                    y1="2.66943"
                    x2="29.4983"
                    y2="3.9665"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_128_3763"
                    x1="3.73547"
                    y1="9.28003"
                    x2="28.2723"
                    y2="13.9546"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_128_3763"
                    x1="16.2031"
                    y1="16"
                    x2="17.2953"
                    y2="16.0045"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p class="product_description_golden">Аксессуары</p>
          </div>

          <div class="product" onClick={() => scrollEffect(dysonRef)}>
            <div class="product_logo">
              <img src={dyson_logo}></img>
            </div>
            <p class="product_description_golden">Dyson</p>
          </div>
        </div>
      </div>

      <div>
        <div className="small_products_header">
          <p ref={headphonesRef}>Наушники</p>
        </div>
        <div className="grid">
          {Array.from(products)
            .filter((elem) => elem.category_id == 1)
            .map((elem) => {
              return (
                <ProductCard
                  id={elem.id}
                  url={elem.url}
                  price={elem.currency.ru}
                  name={elem.name}
                />
              );
            })}
        </div>

        <div className="small_products_header">
          <p ref={watchesRef}>Часы</p>
        </div>
        <div className="grid">
          {Array.from(products)
            .filter((elem) => elem.category_id == 2)
            .map((elem) => {
              return (
                <ProductCard
                  id={elem.id}
                  url={elem.url}
                  price={elem.currency.ru}
                  name={elem.name}
                />
              );
            })}
        </div>
        {/* <div className="small_products_header">
          <p ref={setsRef}>Наборы</p>
        </div>
        <div className="grid">
          {Array.from(products)
            .filter((elem) => elem.category_id == 3)
            .map((elem) => {
              return (
                <ProductCard
                  id={elem.id}
                  url={elem.url}
                  price={elem.currency.ru}
                  name={elem.name}
                />
              );
            })}
        </div> */}
        <div className="small_products_header">
          <p ref={accessoriesRef}>Аксессуары</p>
        </div>
        <div className="grid">
          {Array.from(products)
            .filter((elem) => elem.category_id == 4)
            .map((elem) => {
              return (
                <ProductCard
                  id={elem.id}
                  url={elem.url}
                  price={elem.currency.ru}
                  name={elem.name}
                />
              );
            })}
        </div>

        <div className="small_products_header">
          <p ref={dysonRef}>Dyson</p>
        </div>
        <div className="grid">
          {Array.from(products)
            .filter((elem) => elem.category_id == 5)
            .map((elem) => {
              return (
                <ProductCard
                  id={elem.id}
                  url={elem.url}
                  price={elem.currency.ru}
                  name={elem.name}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
});
export default Products;
