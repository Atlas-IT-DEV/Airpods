import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import delete_cart from "./../images/delete_cart.svg";
import { binIcon } from "../images/images";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import CartProduct from "../components/cart_product";

const ShoppingCart = observer(() => {
  const { pageStore } = useStores();
  const navigate = useNavigate();
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
  function aggregateItemsById(items) {
    const result = [];

    items.forEach((item) => {
      // Проверяем, есть ли уже объект с таким же id и color в результате
      const existingItem = result.find((resItem) => resItem.id === item.id);

      if (existingItem) {
        // Если объект найден, добавляем к нему count и price
        existingItem.totalCount += item.count;
        existingItem.totalPrice += item.count * item.price;
      } else {
        // Если объекта нет, создаем новый с totalCount и totalPrice
        result.push({
          id: item.id,
          name: item.name,
          totalCount: item.count,
          totalPrice: item.count * item.price,
        });
      }
    });

    return result;
  }

  return (
    <div id="shopping_cart">
      <div style={{ backgroundColor: "#1C1C1E" }}>
        {
          // <div id="sale_notification">
          //   <p id="gold_sale">Получите скидку 10%</p>
          //   <p id="sale_if">
          //     При оформлении от 2-х позиций товаров вы получаете скидку 10%!
          //   </p>
          // </div>
        }
        <div id="cart_header">
          <p>Корзина</p>
          <p
            id="delete"
            onClick={() => {
              pageStore.updateCart([]);
            }}
          >
            Очистить корзину
          </p>
        </div>
        <div id="cart_cards">
          {aggregateItemsById(pageStore.cart).map((elem) => {
            return <CartProduct id={elem.id} />;
          })}
        </div>
        {/* <div id="result_sale">
          <p>Скидка</p>
          <p>-10%</p>
        </div> */}
        <div id="result_price">
          <p>Итого</p>
          <p>
            {aggregateItemsByIdAndColor(pageStore.cart).reduce(
              (acc, elem) => acc + elem.totalPrice,
              0
            )}{" "}
            ₽
          </p>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <button
          className="gold_button order_butt"
          style={{ width: "100%" }}
          disabled={pageStore.cart.length == 0}
          onClick={() => {
            navigate("/mailtype");
          }}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
});
export default ShoppingCart;
