import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useState } from "react";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
const ReviewCarousel = observer(() => {
  const [swiper, setSwiper] = useState(null);
  const { pageStore } = useStores();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    pageStore.getComments();
  }, []);

  return (
    <div>
      <div id="header_production">
        <p>Отзывы о нашем магазине</p>
      </div>
      <div>
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          onSwiper={(s) => setSwiper(s)}
        >
          {pageStore.comments.map((elem) => {
            return (
              <SwiperSlide>
                <div className="review">
                  <div className="review_header">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {/*                       <img
                        className="review_avatar"
                        src={
                          elem.attributes.avatar.data != null
                            ? "https://pop.applepodsblack.ru/" +
                              elem.attributes.avatar.data.attributes.url
                            : user_def
                        }
                      /> */}
                      <div>
                        <p className="review_name">{elem.user.name}</p>
                        <p className="review_date">
                          {new Date(elem.created_at).toLocaleDateString(
                            "ru-RU",
                            options
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="review_images">
                    {elem.urls
                      .filter((elem) => elem != null)
                      .map((elem) => (
                        <img src={elem} />
                      ))}
                  </div>
                  <p className="review_comment">{elem.comment}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div id="review_button_div">
        <a class="leave_review" href="https://t.me/applepods_black_otzivi">
          Посмотреть все отзывы
        </a>
      </div>
    </div>
  );
});
export default ReviewCarousel;
