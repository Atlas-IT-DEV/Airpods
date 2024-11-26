import { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Products from "../components/products.jsx";
import TeletypeCarousel from "./../components/teletypeCarousel.jsx";
import ReviewCarousel from "./../components/reviewCarousel.jsx";
import AboutOptom from "../components/aboutOptom.jsx";
import ConnectionManagerButton from "../components/connectionManagerButton.jsx";
import { useStores } from "../store/store_context.js";
import { observer } from "mobx-react-lite";

const HeaderNotification = lazy(() =>
  import("../components/HeaderNotification.jsx")
);
const HeaderCarousel = lazy(() => import("../components/HeaderCarousel.jsx"));
const ProfileTgLink = lazy(() => import("../components/profileTgLink.jsx"));
const QuadroBlocks = lazy(() => import("../components/QuadroBlocks.jsx"));
const OurProducts = lazy(() => import("../components/ourProducts.jsx"));
const tg = window.Telegram.WebApp;
const id = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;
const MainPage = observer(() => {
  const { pageStore } = useStores();
  useEffect(() => {
    pageStore.getUser(
      tg?.initDataUnsafe?.user?.id,
      tg?.initDataUnsafe?.user?.username
    );
    console.log(
      tg?.initDataUnsafe?.user?.id,
      tg?.initDataUnsafe?.user?.username
    );
  }, []);

  return (
    <div
      id="main"
      style={{
        maxWidth: "500px",
      }}
    >
      {pageStore.cart.length != 0 && <HeaderNotification />}
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
});
export default MainPage;
