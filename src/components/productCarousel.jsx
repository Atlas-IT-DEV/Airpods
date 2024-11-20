import { Swiper, SwiperSlide } from "swiper/react";
import DropDown from "./dropDown";
import { useState } from "react";
import { useEffect } from "react";
import redact from "../redact";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

// import required modules
import { Navigation } from "swiper/modules";
import CollectBasket from "./collectBasket";

const ProductCarousel = observer(({ product }) => {
  // const swiperIns = useSwiper();
  // let swiper = null;
  const tg = window.Telegram.WebApp;
  const { pageStore } = useStores();
  const [price, setPrice] = useState(0);
  const [curColor, setCurColor] = useState("Стандартный");
  const [count, setCount] = useState(null);
  useEffect(() => {
    if (product?.category_id != 3 && product.category_id != 4) {
      setCurColor(
        product?.urls.filter((elem) => elem.Color != "").length > 0 &&
          product?.urls.filter((elem) => elem.Color != "")[0].Color
      );
    }

    setPrice(product?.currency?.ru);
  }, [product]);
  return (
    <div>
      <div>
        <Swiper
          onSwiper={(s) => {
            console.log(s);
          }}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={true}
          allowTouchMove={false}
        >
          {product?.urls.map((elem) => {
            return (
              <SwiperSlide>
                <img src={elem.url} className="product_img_carousel" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div id="main_product_info">
        <p id="main_info_product_name">{product?.name}</p>
        <div className="select_currency">
          <p>Выберите валюту</p>
        </div>
        <div id="main_info_product_price">
          <p id="gold_price">{price}</p>
          <div id="main_info_currencylogo">
            <select
              id="currency_choose"
              onChange={(event) => {
                if (event.target.value == "rub")
                  setPrice(product?.currency?.ru);
                else if (event.target.value == "eur")
                  setPrice(product?.currency?.eu);
                else setPrice(product?.currency?.br);
              }}
            >
              <option value="rub">RUB</option>
              <option value="eur">EUR</option>
              <option value="byn">Br</option>
            </select>
          </div>
        </div>
        {product?.category_id != 3 &&
        product.category_id != 4 &&
        product.category_id != 5 ? (
          <div id="choose_color">
            <p>
              Цвет корпуса <p className="current">{curColor}</p>
            </p>
            <div className="color_variants">
              {product?.urls
                .filter((elem) => elem.Color != "")
                .map((elem) => {
                  return (
                    <img
                      className="variant"
                      src={elem.url}
                      onClick={() => {
                        setCurColor(elem.Color);
                      }}
                    ></img>
                  );
                })}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {window.GlobalProductCategory == "accessories" ? (
          ""
        ) : (
          <div id="stories">
            <p>Полезная информация</p>
            <Swiper slidesPerView={3}>{teletype}</Swiper>
          </div>
        )} */}
        <div>
          <p
            style={{
              color: "rgba(236, 236, 236, 1)",
              fontFamily: "SF Pro Display",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            Количество
          </p>
          <form
            style={{
              padding: "12px 16px 12px 16px",
              borderRadius: 16,
              border: "1px solid rgba(92, 92, 92, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              marginTop: 8,
              marginBottom: 8,
            }}
            onSubmit={(event) => event.preventDefault()}
          >
            <button
              style={{
                color: "rgba(92, 92, 92, 1)",
                fontSize: 17,
                fontFamily: "SF Pro Display",
                fontWeight: 600,
              }}
              onClick={() => {
                if (count - 1 < 0) {
                  setCount(0);
                } else {
                  setCount(count - 1);
                }
              }}
            >
              -
            </button>
            <input
              type="number"
              value={count}
              placeholder="Ввести..."
              style={{
                width: 80,
                color: "#f5ea99",
                backgroundColor: "rgba(0, 0, 0, 0)",
                fontFamily: "SF Pro Text",
                fontSize: 17,
              }}
              onChange={(event) => {
                setCount(Number(event.target.value));
              }}
            />
            <button
              style={{
                color: "rgba(92, 92, 92, 1)",
                fontSize: 17,
                fontFamily: "SF Pro Display",
                fontWeight: 600,
              }}
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
          </form>
        </div>
        <button style={{ width: "100%" }}>
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
              onClick={() => {
                let copy_cart = Array.from(pageStore.cart);
                if (count > 0 && count != null) {
                  copy_cart.push({
                    id: product?.id,
                    color: curColor,
                    name: product?.name,
                    price: product?.price,
                    count: count,
                  });
                }
                pageStore.updateCart(copy_cart);
              }}
            >
              Добавить в корзину
            </p>
          </div>
        </button>
        <div className="divideLine" />
        <CollectBasket id={product?.id} product={product} />
        <div className="divideLine" />
        <div id="stories">
          <p>Полезная информация</p>
          <Swiper
            slidesPerView={3}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Autoplay]}
          >
            {product?.storis.map((elem) => {
              return (
                <SwiperSlide>
                  <div
                    className={
                      window.innerWidth < 420
                        ? "teletype_block_small"
                        : "teletype_block"
                    }
                    onClick={() => {
                      tg.openLink(`${elem.link}`, {
                        try_instant_view: true,
                      });
                    }}
                  >
                    <img
                      src={elem.image_url}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        objectFit: "cover",
                        width: "inherit",
                        height: "inherit",
                        zIndex: "-1",
                        borderRadius: "16px",
                      }}
                    ></img>
                    {/* <div>
                      <p>{elem.name}</p>
                    </div> */}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div id="info_dropdown">
          <DropDown
            content={redact(
              product?.characteristics
                ? product?.characteristics.find(
                    (elem) => elem.name == "Описание"
                  ).value
                : "Здесь почему то нет описания (поле characteristics)"
            )}
            header={"Описание"}
          ></DropDown>
        </div>

        <div id="audio_ex">
          {product?.category_id == 1 ? (
            <p id="audio_header">Тест микрофона</p>
          ) : null}
          {product?.audio_files.map((elem) => {
            return (
              <div className="audio_div">
                <audio controls src={elem.original_url}></audio>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
export default ProductCarousel;
