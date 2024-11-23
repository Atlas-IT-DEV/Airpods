import "../components/aboutOptom.css";
import { arrowRightIcon, boxIcon } from "../images/images";

const AboutOptom = () => {
  return (
    <div className="container">
      <div>
        <p className="header-text">Оптом дешевле!</p>
        <p className="main-text">
          Магазин для тех, кому мало одной пары наушников
        </p>
      </div>
      <div className="boxes">
        <div className="box">
          {boxIcon}
          {boxIcon}
          {boxIcon}
        </div>

        <div className="box">
          {boxIcon}
          {boxIcon}
          {boxIcon}
        </div>
      </div>
    </div>
  );
};

export default AboutOptom;
