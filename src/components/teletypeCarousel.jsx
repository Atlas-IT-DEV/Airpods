import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { useState } from "react";
import tree from "./../images/tree.jpg";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "./../components/teletype.css";
function TeletypeCarousel() {
  const [swiper, setSwiper] = useState(null);
  const [slides, setSlides] = useState(null);
  const [swiper_mount, setSwiperMount] = useState(null);
  const tg = window.Telegram.WebApp;
  // useEffect(() => {
  //   fetch("https://pop.applepodsblack.ru/api/stories?populate=deep")
  //     .then((response) => response.json())
  //     .then(function (commits) {
  //       let data = commits.data;
  //       let buffer = [];
  //       // for (let elem of data) {
  //       //   buffer.push(
  //       //     <SwiperSlide>
  //       //       <div
  //       //         className={
  //       //           window.innerWidth < 420
  //       //             ? "teletype_block_small"
  //       //             : "teletype_block"
  //       //         }
  //       //         onClick={() => {
  //       //           tg.openLink(`${elem.attributes.link}`, {
  //       //             try_instant_view: true,
  //       //           });
  //       //         }}
  //       //       >
  //       //         <img
  //       //           src={
  //       //             elem.attributes.photo.data != null
  //       //               ? "https://pop.applepodsblack.ru/" +
  //       //                 elem.attributes.photo.data.attributes.url
  //       //               : tree
  //       //           }
  //       //           style={{
  //       //             position: "absolute",
  //       //             top: "0",
  //       //             left: "0",
  //       //             objectFit: "cover",
  //       //             width: "inherit",
  //       //             height: "inherit",
  //       //             zIndex: "-1",
  //       //             borderRadius: "16px",
  //       //           }}
  //       //         ></img>
  //       //         <div>
  //       //           <p>{elem.attributes.name}</p>
  //       //         </div>
  //       //       </div>
  //       //     </SwiperSlide>
  //       //   );
  //       // }
  //       buffer.push(

  //       );

  //       setSlides(buffer);
  //     });
  // }, []);

  return (
    <div id="teletype_carousel_div">
      <div></div>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        height={255}
        onSwiper={(s) => {
          setSwiper(s);
          setSwiperMount(true);
          console.log(s);
        }}
        allowTouchMove={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div
            className={
              window.innerWidth < 420
                ? "teletype_block_new_small"
                : "teletype_block_new"
            }
            onClick={() => {
              tg.openLink(`${"dasdasd"}`, {
                try_instant_view: true,
              });
            }}
          >
            <div>
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6001 3.3999V11.657H5.34295"
                  stroke="url(#paint0_linear_163_6569)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.5395 3.3999H24.4681C25.1927 3.3999 25.8876 3.68647 26.4 4.19657C26.9123 4.70667 27.2002 5.39851 27.2002 6.1199V27.8799C27.2002 28.6013 26.9123 29.2931 26.4 29.8032C25.8876 30.3133 25.1927 30.5999 24.4681 30.5999H8.07519C7.35059 30.5999 6.65565 30.3133 6.14328 29.8032C5.6309 29.2931 5.34305 28.6013 5.34305 27.8799V11.5599L13.5395 3.3999Z"
                  stroke="url(#paint1_linear_163_6569)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.4141 19.6714L16.0283 23.0714L21.6141 15.0571"
                  stroke="url(#paint2_linear_163_6569)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_163_6569"
                    x1="13.9068"
                    y1="3.3999"
                    x2="4.91527"
                    y2="3.89535"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_163_6569"
                    x1="28.012"
                    y1="3.3999"
                    x2="4.18539"
                    y2="4.4549"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_163_6569"
                    x1="9.98262"
                    y1="13.3571"
                    x2="23.4583"
                    y2="14.1987"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                </defs>
              </svg>
              <p className="gold_text">{"Гарантия"}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={
              window.innerWidth < 420
                ? "teletype_block_new_small"
                : "teletype_block_new"
            }
            onClick={() => {
              tg.openLink(`${"dasdasd"}`, {
                try_instant_view: true,
              });
            }}
          >
            <div>
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.83301 4.25H11.333C12.8359 4.25 14.2772 4.84702 15.3399 5.90973C16.4027 6.97243 16.9997 8.41377 16.9997 9.91667V29.75C16.9997 28.6228 16.5519 27.5418 15.7549 26.7448C14.9578 25.9478 13.8768 25.5 12.7497 25.5H2.83301V4.25Z"
                  stroke="url(#paint0_linear_163_6613)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.1667 4.25H22.6667C21.1638 4.25 19.7224 4.84702 18.6597 5.90973C17.597 6.97243 17 8.41377 17 9.91667V29.75C17 28.6228 17.4478 27.5418 18.2448 26.7448C19.0418 25.9478 20.1228 25.5 21.25 25.5H31.1667V4.25Z"
                  stroke="url(#paint1_linear_163_6613)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_163_6613"
                    x1="2.30685"
                    y1="4.25"
                    x2="17.7658"
                    y2="4.72323"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_163_6613"
                    x1="16.4738"
                    y1="4.25"
                    x2="31.9328"
                    y2="4.72323"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                </defs>
              </svg>
              <p className="gold_text">{"Регламент"}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={
              window.innerWidth < 420
                ? "teletype_block_new_small"
                : "teletype_block_new"
            }
            onClick={() => {
              tg.openLink(`${"dasdasd"}`, {
                try_instant_view: true,
              });
            }}
          >
            <div>
              <svg
                width="34"
                height="35"
                viewBox="0 0 34 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_163_6617)">
                  <path
                    d="M22.5391 23.7189V5.30225H1.91406V23.7189H22.5391ZM22.5391 23.7189H32.1641V16.6356L28.0391 12.3856H22.5391V23.7189ZM11.5391 27.2606C11.5391 29.2166 10 30.8022 8.10156 30.8022C6.20308 30.8022 4.66406 29.2166 4.66406 27.2606C4.66406 25.3046 6.20308 23.7189 8.10156 23.7189C10 23.7189 11.5391 25.3046 11.5391 27.2606ZM29.4141 27.2606C29.4141 29.2166 27.875 30.8022 25.9766 30.8022C24.0781 30.8022 22.5391 29.2166 22.5391 27.2606C22.5391 25.3046 24.0781 23.7189 25.9766 23.7189C27.875 23.7189 29.4141 25.3046 29.4141 27.2606Z"
                    stroke="url(#paint0_linear_163_6617)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_163_6617"
                    x1="0.790568"
                    y1="5.30224"
                    x2="33.6903"
                    y2="7.45277"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F5EA99" />
                    <stop offset="1" stop-color="#DB9B45" />
                  </linearGradient>
                  <clipPath id="clip0_163_6617">
                    <rect
                      width="33"
                      height="34"
                      fill="white"
                      transform="translate(0.5 0.930664)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="gold_text">{"Доставка"}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default TeletypeCarousel;
