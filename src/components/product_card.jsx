import { useState } from "react";
import { useNavigate } from "react-router";
import cart from "../images/shopping-cart.svg";
import fav_inact from "../images/fav.svg";
import fav_act from "../images/fav_act.svg";
import { observer } from "mobx-react-lite";
import { Image } from "@chakra-ui/react";

const ProductCard = observer(({ id, url, price, name }) => {
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);
  return (
    <div className="card">
      <div
        className="card_image"
        onClick={() =>
          navigate("/product", {
            state: { product_id: id },
          })
        }
      >
        <img src={url} />
      </div>
      <div className="card_info">
        <div
          className="card_price_info"
          onClick={() =>
            navigate("/product", {
              state: { product_id: id },
            })
          }
        >
          <p className="card_price">{price} ₽</p>
          <p className="card_description">{name}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "8px",
          }}
        >
          <button
            style={{
              background:
                "linear-gradient(93.15deg, #F5EA99 -3.52%, #DB9B45 100%)",
              padding: "8px 0",
              borderRadius: "8px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <Image src={cart} />
          </button>
          <button onClick={() => setFavourite(!favourite)}>
            <Image
              src={favourite ? fav_act : fav_inact}
              w={"46px"}
              height={"46px"}
            />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
