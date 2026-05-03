// src/components/Banner.jsx
import "./Banner.css";
import { useNavigate } from 'react-router-dom'; 

function Banner() {
  const navigate = useNavigate();  

  const handleSignUpClick = () => {
    navigate('/login');
  };

  return (
    <section className="join-section">
      <div className="overlay top-circle"></div>
      <div className="overlay bottom-circle"></div>

      <p className="Banner-text">SIGN UP</p>

      <h1>
        JOIN THE FUN <br />
        CREATE ACCOUNT NOW!
      </h1>

      <p className="Banner-desc">
        Create an account to save your favorite recipes, share your own
        dishes, and enjoy a personalized cooking experience.
      </p>

      <button className="banner-btn" onClick={handleSignUpClick}>  {/* 👈 أضف onClick */}
        SIGN UP
      </button>
    </section>
  );
}

export default Banner;