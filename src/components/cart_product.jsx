import "../components/productBasket.css";
import { bin } from "../images/images";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import { VStack, HStack, Image, Text } from "@chakra-ui/react";

const CartProduct = observer(
  ({
    color = "Черный",
    count = 42,
    image = "https://avatars.mds.yandex.net/i?id=7fe380be9fa8d64d4612f0f00ec6dcbf_l-5279616-images-thumbs&n=13",
    price = 4600,
    id,
    obj,
  }) => {
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
      <VStack
        background={"linear-gradient(315deg, #1c1c1e 0%, #48484a 100%)"}
        borderRadius={"16px"}
        padding={"16px"}
        width={"100%"}
        align={"flex-start"}
        position={"relative"}
        marginTop={"16px"}
      >
        <HStack width={"100%"} justify={"space-between"} spacing={"16px"}>
          <Image
            width={"96px"}
            height={"96px"}
            borderRadius={"8px"}
            objectFit={"cover"}
            src={pageStore.products.filter((elem) => elem.id == id)[0].url}
          />
          <VStack justify={"space-between"} height={"96px"} minWidth={"200px"}>
            <HStack
              width={"100%"}
              align={"flex-start"}
              justify={"space-between"}
              position={"relative"}
            >
              <Text minWidth={"168px"} color={"white"}>
                {pageStore.products.filter((elem) => elem.id == id)[0].name}
              </Text>
              <button
                style={{ marginTop: 6 }}
                onClick={() => {
                  let copy_cart = Array.from(pageStore.cart);
                  console.log(id, color, copy_cart);

                  pageStore.updateCart(
                    copy_cart.filter((elem) => !(elem.id === id))
                  );
                }}
              >
                {" "}
                {bin}
              </button>
            </HStack>
            <HStack
              width={"100%"}
              align={"flex-end"}
              justify={"right"}
              position={"relative"}
              p={0}
            >
              <VStack
                background={"linear-gradient(134deg, #f5ea99 0%, #db9b45 100%)"}
                backgroundClip={"text"}
                p={0}
              >
                <p className="endPrice" style={{ color: "transparent" }}>
                  {Math.floor(
                    pageStore.products.filter((elem) => elem.id == id)[0].price
                  )}{" "}
                  ₽
                </p>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        {aggregateItemsByIdAndColor(pageStore.cart)
          .filter((elem) => elem.id == id)
          .map((elem) => {
            return (
              <>
                <div className="divideLine" />
                <VStack
                  width={"100%"}
                  position={"relative"}
                  align={"flex-start"}
                >
                  <HStack width={"100%"} justify={"space-between"}>
                    <div className="fieldProduct">
                      <p className="attributeProduct">Цвет корпуса</p>
                      <p className="attributeProduct">—</p>
                      <p className="valueProduct">{elem.color}</p>
                    </div>
                    <button
                      onClick={() => {
                        let copy_cart = Array.from(pageStore.cart);
                        console.log(id, color, copy_cart);
                        pageStore.updateCart(
                          copy_cart.filter(
                            (el) => !(el.id === id && el.color === elem.color)
                          )
                        );
                      }}
                    >
                      {" "}
                      {bin}
                    </button>
                  </HStack>

                  <HStack width={"100%"} justify={"space-between"}>
                    <div className="fieldProduct">
                      <p className="attributeProduct">Количество</p>
                      <p className="attributeProduct">—</p>
                      <p className="valueProduct">{elem.totalCount}</p>
                    </div>
                    <VStack
                      background={
                        "linear-gradient(134deg, #f5ea99 0%, #db9b45 100%)"
                      }
                      backgroundClip={"text"}
                    >
                      <p className="endPrice" style={{ color: "transparent" }}>
                        {elem.totalPrice} ₽
                      </p>
                    </VStack>
                  </HStack>
                </VStack>
              </>
            );
          })}

        <div className="divideLine" />
      </VStack>
    );
  }
);

export default CartProduct;
