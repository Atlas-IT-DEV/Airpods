import "../components/connectionManagerButton.css";
import { connectManagerIcon } from "../images/images";

const ConnectionManagerButton = () => {
  return (
    <a href="https://t.me/apb_opt">
      <div className="button-connect">
        <p className="button-connect-text">Связь с менеджером</p>
        {connectManagerIcon}
      </div>
    </a>
  );
};

export default ConnectionManagerButton;
