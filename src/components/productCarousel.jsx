import { Swiper, SwiperSlide } from "swiper/react";
import DropDown from "./dropDown";
import { useState } from "react";
import { useEffect } from "react";
import redact from "../redact";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useNavigate, useNavigation } from "react-router";

// import required modules
import { Navigation } from "swiper/modules";
import { array } from "yup";
import CollectBasket from "./collectBasket";
function ProductCarousel() {
  // const swiperIns = useSwiper();
  const [carouselInfo, setCarouselInfo] = useState([
    "название",
    "цена",
    ["url", "url"],
  ]);
  // let swiper = null;
  const tg = window.Telegram.WebApp;
  const navigate = useNavigate()
  const [variants, setVariants] = useState("");
  const [info, setInfo] = useState("информация о продукте");
  // const [swiper, setSwiper] = useState(null);
  const [carousel, setCarousel] = useState("");
  const [teletype, setTeletype] = useState("");
  const [price, setPrice] = useState(0);
  const [audio, setAudio] = useState("");
  const [curColor, setCurColor] = useState("");
  // function swipe(ind) {
  //   swiper.slideTo(ind);

  // }
  const change_underline = (index) => {
    let new_vars = Array.from(variants);
    console.log(new_vars);
    for (let i = 0; i < new_vars.length; i++) {
      new_vars[i].props.className = "variant";
    }
    new_vars[index].props.className = "variant_gold";
    setVariants(new_vars);
  };

  useEffect(() => {
    fetch(
      "https://pop.applepodsblack.ru/api/products?populate=deep&pagination[limit]=100"
    )
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let product = "";
        for (let elem of data) {
          if (elem.id == window.GlobalProductId) product = elem;
        }
        let buffer = [];
        let urls = [];

        buffer[0] = product.attributes.name;
        buffer[1] = product.attributes.rub_price;
        // urls[0] =
        //   "https://pop.applepodsblack.ru/" +
        //   product.attributes.main_photo.data.attributes.url;
        let colors = [];
        let colors_urls = [];
        for (let color of product.attributes.colors.data) {
          colors_urls.push(
            "https://pop.applepodsblack.ru/" +
              color.attributes.photo.data[0].attributes.url
          );
          colors.push(color.attributes.name);
        }
        let new_photos = [];
        for (let photo of product?.attributes?.photo.data) {
          new_photos.push(
            "https://pop.applepodsblack.ru/" + photo?.attributes?.url
          );
        }

        if (colors.length != 0) {
          window.GlobalProductColor = colors[0];
        } else {
          window.GlobalProductColor = "стандартный цвет";
        }
        buffer[2] = urls;
        buffer[3] = product.attributes.eur_price;
        buffer[4] = product.attributes.byn_price;

        let carousel = [];
        let vars = [];
        window.GlobalProductCategory = product.attributes.category;
        for (let i = 0; i < urls.length; i++) {
          carousel.push(
            <SwiperSlide>
              <img src={urls[i]} className="product_img_carousel"></img>
            </SwiperSlide>
          );
        }
        for (let i = 0; i < new_photos.length; i++) {
          carousel.push(
            <SwiperSlide>
              <img src={new_photos[i]} className="product_img_carousel"></img>
            </SwiperSlide>
          );
        }
        for (let i = 0; i < colors_urls.length; i++) {
          vars.push(
            <img
              className="variant"
              src={colors_urls[i]}
              onClick={() => {
                window.GlobalProductColor = colors[i];
                setCurColor(window.GlobalProductColor);
                change_underline(i);
                // swipe(i);
              }}
            ></img>
          );
        }
        let teletype_buffer = [];
        for (let elem of product.attributes.stories.data) {
          teletype_buffer.push(
            <SwiperSlide>
              <div
                className={
                  window.innerWidth < 420
                    ? "teletype_block_small"
                    : "teletype_block"
                }
                onClick={() => {
                  tg.openLink(`${elem.attributes.link}`, {
                    try_instant_view: true,
                  });
                }}
              >
                <img
                  src={
                    "https://pop.applepodsblack.ru/" +
                    elem.attributes.photo.data[0].attributes.url
                  }
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
                <div>
                  <p>{elem.attributes.name}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        }
        if (product.attributes.category == "headphones") {
          let audio_buff = [];
          audio_buff.push(
            <div className="audio_div">
              <audio
                controls
                src={
                  "https://pop.applepodsblack.ru/" +
                  product.attributes.audio.data[0].attributes.url
                }
              ></audio>
            </div>
          );
          setAudio(audio_buff);
        }
        window.GlobalWatchColor = "";
        setTeletype(teletype_buffer);
        setVariants(vars);
        setCarousel(carousel);
        console.log(urls.length);
        setCarouselInfo(buffer);
        setPrice(buffer[1]);
        setInfo(product.attributes.info);
        setCurColor(window.GlobalProductColor);
      });
  }, []);

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
          {carousel}
        </Swiper>
      </div>
      <div id="main_product_info">
        <p id="main_info_product_name">{carouselInfo[0]}</p>
        <div className="select_currency">
          <p>Выберите валюту</p>
        </div>
        <div id="main_info_product_price">
          <p id="gold_price">{price}</p>
          <div id="main_info_currencylogo">
            <select
              id="currency_choose"
              onChange={(event) => {
                if (event.target.value == "rub") setPrice(carouselInfo[1]);
                else if (event.target.value == "eur") setPrice(carouselInfo[3]);
                else setPrice(carouselInfo[4]);
              }}
            >
              <option value="rub">RUB</option>
              <option value="eur">EUR</option>
              <option value="byn">Br</option>
            </select>
          </div>
        </div>
        {window.GlobalProductCategory == "watch" ||
        window.GlobalProductCategory == "headphones" ||
        window.GlobalProductCategory == "dyson" ? (
          <div id="choose_color">
            <p>
              Цвет корпуса <p className="current">{curColor}</p>
            </p>
            <div className="color_variants">{variants}</div>
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
          >
            <button
              style={{
                color: "rgba(92, 92, 92, 1)",
                fontSize: 17,
                fontFamily: "SF Pro Display",
                fontWeight: 600,
              }}
            >
              -
            </button>
            <input
              type="text"
              placeholder="Ввести..."
              style={{
                width: 80,
                color: "#f5ea99",
                backgroundColor: "rgba(0, 0, 0, 0)",
                fontFamily: "SF Pro Text",
                fontSize: 17,
              }}
            />
            <button
              style={{
                color: "rgba(92, 92, 92, 1)",
                fontSize: 17,
                fontFamily: "SF Pro Display",
                fontWeight: 600,
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
                window.GlobalShoppingCart.push(window.GlobalProductId);
                window.GlobalProductColors.push(
                  window.GlobalProductColor + " " + window.GlobalWatchColor
                );
                console.log("привет");

                navigate("/cart");
              }}
            >
              Добавить в корзину
            </p>
          </div>
        </button>
        <div className="divideLine" />
        <CollectBasket />
        <div className="divideLine" />
        <div id="stories">
          <p>Полезная информация</p>
          <Swiper
            slidesPerView={3}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Autoplay]}
          >
            {teletype}
          </Swiper>
        </div>
        <div id="info_dropdown">
          <DropDown content={redact(info)} header={"Описание"}></DropDown>
        </div>

        <div id="audio_ex">
          {window.GlobalProductCategory == "headphones" ? (
            <p id="audio_header">Тест микрофона</p>
          ) : (
            ""
          )}
          {audio}
        </div>
      </div>
    </div>
  );
}
export default ProductCarousel;
