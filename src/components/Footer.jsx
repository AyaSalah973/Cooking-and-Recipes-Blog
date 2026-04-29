import "./Footer.css";
import logo from "../assets/Images/Logo Footer.png";
import { FaTiktok, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="logo" />
        </div>

        <ul className="footer-links">
          <li>HOME</li>
          <li>RECIPES</li>
          <li>COOKING TIPS</li>
          <li>ABOUT US</li>
        </ul>

        <div className="footer-social">
          <FaTiktok />
          <FaFacebookF />
          <FaInstagram />
          <FaYoutube />
        </div>
      </div>

      <hr />

      <p className="copyright">COPYRIGHT: © 2024 COOKS DELIGHT.</p>
    </footer>
  );
}

export default Footer;
