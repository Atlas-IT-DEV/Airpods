import { lazy, Suspense } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import ProductAdditionals from "./../components/ProductAdditionals";
import { useLocation } from "react-router";
import { VStack } from "@chakra-ui/react";
const ProductCarousel = lazy(() => import("../components/productCarousel"));

function ProductPage() {
  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  // const mainButton = tg.MainButton;
  // mainButton.text = "Добавить в корзину";
  // mainButton.color = "#F5EA99";
  // mainButton.textColor = "#1C1C1E";
  // tg.onEvent("mainButtonClicked", addToCart);
  // function addToCart() {
  //   window.GlobalShoppingCart.push(window.GlobalProductId);
  //   window.GlobalProductColors.push(
  //     window.GlobalProductColor + " " + window.GlobalWatchColor
  //   );
  //   console.log("привет");
  //   tg.offEvent("mainButtonClicked", addToCart);
  //   mainButton.hide();
  //   navigate("/cart");
  // }
  // mainButton.show();
  /*   const mainButton = tg.MainButton;
  mainButton.text = "В корзину";
  mainButton.color = "#F5EA99";
  mainButton.textColor = "#1C1C1E";
  tg.onEvent("mainButtonClicked", () => {
    mainButton.hide();
    navigate("/cart");
  });
  mainButton.show();
  const navigate = useNavigate();
  function back_page() {
    navigate("/");
    backButton.hide();
  } */
  const navigate = useNavigate();
  backButton.show();
  backButton.onClick(back_page);
  function back_page() {
    navigate("/");
    backButton.hide();
  }
  window.scrollTo(0, 0);
  const location = useLocation();
  const [product, setProduct] = useState({
    id: 16,
    name: "AirPods Max FCO (Пластик)",
    promotion_id: null,
    category_id: 1,
    price: "13990.00",
    is_active: "Y",
    position: 1000,
    currency: {
      id: 11,
      ru: 13990,
      eu: 165,
      br: 570,
    },
    company: {
      id: 1,
      name: "Apple",
      description: "Производитель электроники",
    },
    characteristics: [
      {
        id: 4,
        name: "Автономность",
        type: "INT",
        value: "6",
      },
      {
        id: 6,
        name: "Описание",
        type: "VARCHAR",
        value:
          "Набор \n- AirPods 3 FCO+\n- Любые Watch (Ultra 2 либо Series 9) на выбор ",
      },
      {
        id: 7,
        name: "Качество звука",
        type: "VARCHAR",
        value: "7",
      },
      {
        id: 8,
        name: "Качество микрофона",
        type: "VARCHAR",
        value: "7",
      },
      {
        id: 9,
        name: "Комплектация",
        type: "VARCHAR",
        value: "NULL",
      },
      {
        id: 10,
        name: "Функционал",
        type: "VARCHAR",
        value: "NULL",
      },
      {
        id: 11,
        name: "Технические характеристики",
        type: "VARCHAR",
        value: "NULL",
      },
    ],
    urls: [
      {
        url: "https://apbstore.ru:8008/public/product/main_large_2024_05_01_15_24_07_40bea002d3.jpg",
        Color: "",
      },
      {
        url: "https://apbstore.ru:8008/public/product/simple_16_large_2024_05_02_17_23_10_bf27a5ba33.jpg",
        Color: "",
      },
      {
        url: "https://apbstore.ru:8008/public/product/Красный_COLOR_IMG_0701_c93435960f.PNG",
        Color: "Красный",
      },
    ],
    storis: [
      {
        id: 110,
        product_id: 16,
        name: null,
        image_url:
          "https://apbstore.ru:8008/public/storis/large_2024_05_01_19_58_23_a17f4de6a1.jpg",
        link: "https://www.youtube.com/watch?v=0fT_aY-cg2Y",
      },
      {
        id: 111,
        product_id: 16,
        name: null,
        image_url:
          "https://apbstore.ru:8008/public/storis/IMG_0969_2539959b88.MP4",
        link: "https://t.me/apb_shop/52",
      },
      {
        id: 112,
        product_id: 16,
        name: null,
        image_url:
          "https://apbstore.ru:8008/public/storis/large_2024_05_01_21_01_04_ac53c04997.jpg",
        link: "https://t.me/apb_shop/85",
      },
      {
        id: 113,
        product_id: 16,
        name: null,
        image_url:
          "https://apbstore.ru:8008/public/storis/large_2024_05_01_20_34_26_5d2ad884be.jpg",
        link: "https://apps.apple.com/app/id1661245709",
      },
      {
        id: 114,
        product_id: 16,
        name: null,
        image_url:
          "https://apbstore.ru:8008/public/storis/large_2024_05_01_20_34_22_893a222764.jpg",
        link: "http://apkdown.198509.xyz/",
      },
    ],
    audio_files: [
      {
        id: 7,
        product_id: 16,
        original_url:
          "https://apbstore.ru:8008/public/audio/Air_Pods_Max_Final_Mikrofony_b2a9e0088a.m4a",
        our_url: "https://apbstore.ru:8008/publicNone",
      },
    ],
  });
  const getProduct = async () => {
    const response = await fetch(
      `https://apbstore.ru:8008/products/product_id/${location.state.product_id}?dirs=true`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    const result = await response.json();
    setProduct(result);
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div id="product_page">
      <Suspense fallback={<div></div>}>
        <ProductCarousel product={product} />
      </Suspense>
      {product?.category_id == 3 || product?.category_id == 4 ? null : (
        <ProductAdditionals product={product} />
      )}
      <VStack padding={"16px"}>
        <button
          style={{ width: "100%" }}
          onClick={() => {
            navigate("/cart", {
              state: { product_id: location.state.product_id },
            });
          }}
        >
          <div
            style={{
              // margin: 16,
              background:
                "linear-gradient(93.15deg, #f5ea99 -3.52%, #db9b45 100%)",
              padding: 12,
              borderRadius: 16,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: 17,
                fontFamily: "SF Pro Display",
                fontWeight: 700,
                color: "rgba(28, 28, 30, 1)",
              }}
            >
              В корзину
            </p>
          </div>
        </button>
      </VStack>
    </div>
  );
}
export default ProductPage;
