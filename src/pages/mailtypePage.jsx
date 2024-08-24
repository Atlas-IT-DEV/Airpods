import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import useWindowDimensions from "../components/GetDimensions";
import cdek from "./../images/cdek.svg";
import russian_post from "./../images/russianPost.svg";
import apple from "./../images/gold_apple.svg";
import { useState, useEffect } from "react";

function MailtypePage() {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [border, setBorder] = useState([
    "border",
    "no_border",
    "no_border",
    "no_border",
  ]);
  const [block, setBlock] = useState("cdek");
  useEffect(() => {
    if (width <= 410) setBlock("cdek_small");
    else setBlock("cdek");
  });

  return (
    <div id="shopping_cart" style={{ justifyContent: "center" }}>
      <div style={{ padding: "10px 10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            background: "#161617",
            borderRadius: "12px",
            height: "130px",
          }}
        >
          <div
            id={block}
            className={border[0]}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            onClick={() => {
              console.log(border);
              if (border[0] != "border")
                setBorder(["border", "no_border", "no_border", "no_border"]);
              window.GlobalPost = "сдэк (СДЭК)";
            }}
          >
            <p>СДЭК</p>
            <img src={cdek} style={{ width: "90px", height: "30px" }}></img>
          </div>
          <div className="mail_content">
            Самый быстрый , удобный и дешевый способ доставки. Пункты выдачи
            находятся практически в каждом городе. Страны доставки: Россия,
            Беларусь, Казахстан, Армения, Киргизия.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            background: "#161617",
            borderRadius: "12px",
            height: "130px",
          }}
        >
          <div
            id={block}
            className={border[1]}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            onClick={() => {
              console.log(border);
              if (border[1] != "border")
                setBorder(["no_border", "border", "no_border", "no_border"]);
              window.GlobalPost = "почта России";
            }}
          >
            <p>Почта России</p>
            <img
              src={russian_post}
              style={{ width: "90px", height: "30px" }}
            ></img>
          </div>
          <div className="mail_content">
            Доставим туда, где нет СДЭК. Сроки и стоимость уточняются при
            оформлении. Но всегда это будет максимально дешевле и быстро на
            сколько это возможно.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            background: "#161617",
            borderRadius: "12px",
            height: "130px",
          }}
        >
          <div
            id={block}
            className={border[2]}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            onClick={() => {
              if (border[2] != "border")
                setBorder(["no_border", "no_border", "border", "no_border"]);
              window.GlobalPost = "почта по миру";
            }}
          >
            <p>Почта по миру</p>
            <img src={apple} style={{ width: "90px", height: "30px" }}></img>
          </div>
          <div className="mail_content">
            Мы работаем по всему миру. Средний чек на стоимость доставки
            международного формата - 10€.
          </div>
        </div>
        <button
          className="gold_button order_butt"
          style={{ width: "100%" }}
          // disabled={window.GlobalShoppingCart != []}
          onClick={() => {
            navigate("/order");
          }}
        >
          Далее
        </button>
      </div>
    </div>
  );
}

export default MailtypePage;
