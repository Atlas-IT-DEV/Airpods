import "../components/collectBasket.css";
import ProductBasket from "./productBasket";

const CollectBasket = ({
  price = 5000,
  name_product = "Apple AirPods Max Silver",
}) => {
  return (
    <div className="containerBasket">
      <div className="headerBasket">
        <p className="headerBasketText">Собрано в корзину</p>
        <p className="basketPrice">{price} ₽</p>
      </div>
      <p className="productNameText">{name_product}</p>

      <div className="productMiniContainer">
        <ProductBasket />
        <ProductBasket />
      </div>
    </div>
  );
};

export default CollectBasket;
