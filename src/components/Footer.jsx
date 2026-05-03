// src/components/Footer.jsx
import "./Footer.css";
import logo from "../assets/Logo Footer.png";  
import { FaTiktok, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';  
import { useState } from 'react';  

function Footer() {
  const navigate = useNavigate(); 

  // دالة لزر RECIPES - يجيب أول وصفة (نفس اللي في Navbar)
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
            <Link to="/">HOME</Link>
          </li>
          <li>
            <a href="#" onClick={handleRecipesClick}>RECIPES</a>  {/* 👈 نفس وظيفة Navbar */}
          </li>
          <li>
            <Link to="/tips">COOKING TIPS</Link>
          </li>
          <li>
            <Link to="/about">ABOUT US</Link>
          </li>
        </ul>

        <div className="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>

      <hr />

      <p className="copyright">COPYRIGHT: © 2024 COOKS DELIGHT.</p>
    </footer>
  );
}

export default Footer;