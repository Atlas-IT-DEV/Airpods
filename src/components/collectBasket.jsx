import "../components/collectBasket.css";
import ProductBasket from "./productBasket";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

const CollectBasket = observer(({ id, product, colors }) => {
  const { pageStore } = useStores();
  function aggregateItemsByIdAndColor(items) {
    const result = [];

    items.forEach((item) => {
      // Проверяем, есть ли уже объект с таким же id и color в результате
      const existingItem = result.find(
        (resItem) => resItem.id === item.id && resItem.color === item.color
      );

      if (existingItem) {
        // Если объект найден, добавляем к нему count и price
        existingItem.totalCount += item.count;
        existingItem.totalPrice += item.count * item.price;
      } else {
        // Если объекта нет, создаем новый с totalCount и totalPrice
        result.push({
          id: item.id,
          color: item.color,
          name: item.name,
          totalCount: item.count,
          totalPrice: item.count * item.price,
        });
      }
    });

    return result;
  }
  return (
    <div className="containerBasket">
      <div className="headerBasket">
        <p className="headerBasketText">Собрано в корзину</p>
        <p className="basketPrice">
          {aggregateItemsByIdAndColor(pageStore.cart)
            .filter((elem) => elem.id === id)
            .reduce((acc, elem) => acc + elem.totalPrice, 0)}
          ₽
        </p>
      </div>
      <p className="productNameText">{product?.name}</p>

      <div className="productMiniContainer">
        {aggregateItemsByIdAndColor(pageStore.cart)
          .filter((elem) => elem.id == id)
          .map((elem) => {
            return (
              <ProductBasket
                color={elem.color}
                count={elem.totalCount}
                price={elem.totalPrice}
                obj={elem}
                id={elem.id}
              />
            );
          })}
      </div>
    </div>
  );
});

export default CollectBasket;
