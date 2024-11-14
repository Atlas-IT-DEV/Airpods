import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function HeaderCarousel() {
  return (
    <div className="header_message_carousel">
      <Swiper
        modules={[FreeMode, Pagination, Autoplay]}
        freeMode={true}
        pagination={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div className="header_message" style={{ marginBottom: "28px" }}>
            <div id="header_message_left">
              <p id="manager_name">Артем</p>
              <p id="manager_position">Менеджер</p>
            </div>
            <div id="header_message_right">
              <p>Отправления каждый день до 20:00 по МСК</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="header_message" style={{ marginBottom: "28px" }}>
            <div id="header_message_left">
              <p id="manager_name">Артем</p>
              <p id="manager_position">Менеджер</p>
            </div>
            <div id="header_message_right">
              <p>Доставляем в любую точку мира!</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="header_message" style={{ marginBottom: "28px" }}>
            <div id="header_message_left">
              <p id="manager_name">Артем</p>
              <p id="manager_position">Менеджер</p>
            </div>
            <div id="header_message_right">
              <p>Открыт Самовывоз в Москве!</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default HeaderCarousel;
