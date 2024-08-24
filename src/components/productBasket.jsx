import "../components/productBasket.css";
import { binIcon } from "../images/images";

const ProductBasket = ({ color = "черный", count = 42, price = 4600 }) => {
  return (
    <div className="productBasketContainer">
      <button style={{ position: "absolute", right: 24 }}> {binIcon}</button>
      <div className="fieldProduct">
        <p className="attributeProduct">Цвет корпуса</p>
        <p className="attributeProduct">—</p>
        <p className="valueProduct">{color}</p>
      </div>
      <div className="fieldProduct">
        <p className="attributeProduct">Цвет ремешка</p>
        <p className="attributeProduct">—</p>
        <p className="valueProduct">{color}</p>
      </div>
      <div className="fieldProduct">
        <p className="attributeProduct">Количество</p>
        <p className="attributeProduct">—</p>
        <p className="valueProduct">{count}</p>
      </div>
      <div className="divideLine" />

      <div className="priceField">
        <p className="attributeProduct">Итого</p>
        <p className="endPrice">{price} ₽</p>
      </div>
    </div>
  );
};

export default ProductBasket;
