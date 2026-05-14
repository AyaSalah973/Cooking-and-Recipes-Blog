// src/components/Footer.jsx
import "./Footer.css";
import logo from "../assets/Logo Footer.png";
import { FaTiktok, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleRecipesClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      if (data.recipes && data.recipes.length > 0) {
        const firstRecipeId = data.recipes[0].id;
        navigate(`/recipe/${firstRecipeId}`);
      }
    } catch (error) {
      console.error("Error fetching first recipe:", error);
      navigate("/");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <ul className="footer-links">
          <li>
            <Link to="/">{t("home")}</Link>
          </li>
          <li>
            <a href="#" onClick={handleRecipesClick}>
              {t("recipes")}
            </a>
          </li>
          <li>
            <Link to="/tips">{t("cookingTips")}</Link>
          </li>
          <li>
            <Link to="/about">{t("about")}</Link>
          </li>
        </ul>

        <div className="footer-social">
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>

      <hr />

      <p className="copyright">{t("copyright")}</p>
    </footer>
  );
}

export default Footer;
