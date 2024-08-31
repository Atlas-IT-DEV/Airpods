import { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Products from "../components/products.jsx";
import TeletypeCarousel from "./../components/teletypeCarousel.jsx";
import ReviewCarousel from "./../components/reviewCarousel.jsx";
import AboutOptom from "../components/aboutOptom.jsx";
import ConnectionManagerButton from "../components/connectionManagerButton.jsx";
import { getAllUsers } from "./../fetches.js";

const HeaderNotification = lazy(() =>
  import("../components/HeaderNotification.jsx")
);
const HeaderCarousel = lazy(() => import("../components/HeaderCarousel.jsx"));
const ProfileTgLink = lazy(() => import("../components/profileTgLink.jsx"));
const QuadroBlocks = lazy(() => import("../components/QuadroBlocks.jsx"));
const OurProducts = lazy(() => import("../components/ourProducts.jsx"));
window.GlobalSale = 0;
window.GlobalPost = "сдэк";
const tg = window.Telegram.WebApp;
const id = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;
fetch("https://pop.applepodsblack.ru/api/carts")
  .then((response) => response.json())
  .then(function (commits) {
    let data = commits.data;
    console.log(data);
    for (let elem of data) {
      if (elem.attributes.tgid == id) {
        window.GlobalDbId = elem.id;
        let orders = elem.attributes.orders;
        let colors = elem.attributes.colors;
        for (let id of Object.values(orders)) {
          window.GlobalShoppingCart.push(Number(id));
        }
        if (colors != null || colors != undefined) {
          for (let color of Object.values(colors)) {
            window.GlobalProductColors.push(color);
          }
        }

        break;
      } else {
        window.GlobalShoppingCart = [];
      }
    }
  });
function MainPage() {
  const [notification, setNotification] = useState("");

  //пример
  useEffect(() => {
    if (window.GlobalShoppingCart.length != 0)
      setNotification(<HeaderNotification />);
  }, []);

  return (
    <div
      id="main"
      style={{
        maxWidth: "500px",
      }}
    >
      {notification}
      <Suspense fallback={<div></div>}>
        <HeaderCarousel />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <ProfileTgLink />
      </Suspense>
      <div style={{ margin: "16px" }}>
        <TeletypeCarousel />
      </div>
      <div>
        <AboutOptom />
      </div>
      <div>
        <ConnectionManagerButton />
      </div>
      <Suspense fallback={<div></div>}>
        <QuadroBlocks />
      </Suspense>
      <Products />
      <ReviewCarousel />
    </div>
  );
}
export default MainPage;
