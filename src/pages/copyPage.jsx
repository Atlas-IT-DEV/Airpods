import selectEl from "../components/copy";
import tutorial from "./../images/tutorial.MP4";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

import guidePoster from "./../images/guide.jpeg";
const CopyPage = observer(() => {
  const { pageStore } = useStores();
  return (
    <div id="copy">
      <div>
        <p id="header_copy" style={{ paddingBottom: "10px" }}>
          Детали вашего заказа:
        </p>
        <p style={{ lineHeight: "25px", letterSpacing: "0px" }}>
          Проверьте введенные данные. После нажатия на кнопку подтвердить данные
          будут автоматически скопированы в буфер обмена, как только вы будете
          перенаправлены в чат с менеджером вставьте скопированное и отправьте
          нашему менеджеру.
        </p>
      </div>
      <textarea
        id="details"
        defaultValue={pageStore.result}
        className="gray_input"
        style={{
          height: "auto",
          minHeight: "260px",
          padding: "10px",
          resize: "none",
        }}
      ></textarea>

      <a
        href="https://t.me/apb_opt"
        style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
        onClick={selectEl}
      >
        <button className="gold_button" style={{ width: "100%" }}>
          Подтвердить
        </button>
      </a>
      <p className="video_guide">Видео гайд</p>
      <video
        src={tutorial}
        style={{
          borderRadius: "16px",
          border: "2px solid var(--Yellow-gradient, #f5ea99)",
          height: "400px",
        }}
        preload="auto"
        controls={true}
        poster={guidePoster}
      ></video>
    </div>
  );
});
export default CopyPage;
