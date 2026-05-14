import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Banner() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/login");
  };

  const { t } = useTranslation();

  return (
    <section className="join-section">
      <div className="overlay top-circle"></div>
      <div className="overlay bottom-circle"></div>

      <p className="Banner-text">
        {t("signup")}
      </p>

      <h1>
        {t("joinFun")}
        <br />
        {t("createAccount")}
      </h1>

      <p className="Banner-desc">
        {t("bannerDescription")}
      </p>

      <button
        className="banner-btn"
        onClick={handleSignUpClick}
      >
        {t("signup")}
      </button>
    </section>
  );
}

export default Banner;