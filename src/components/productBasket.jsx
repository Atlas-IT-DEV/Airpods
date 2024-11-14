import "../components/productBasket.css";
import { binIcon } from "../images/images";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

const ProductBasket = ({
  color = "Черный",
  count = 42,
  price = 4600,
  id,
  obj,
}) => {
  const { pageStore } = useStores();
  return (
    <div className="productBasketContainer">
      <button
        style={{ position: "absolute", right: 24 }}
        onClick={() => {
          let copy_cart = Array.from(pageStore.cart);
          console.log(id, color, copy_cart);

          pageStore.updateCart(
            copy_cart.filter(
              (elem) => !(elem.id === id && elem.color === color)
            )
          );
        }}
      >
        {" "}
        {binIcon}
      </button>

      <div className="fieldProduct">
        <p className="attributeProduct">Цвет корпуса</p>
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
