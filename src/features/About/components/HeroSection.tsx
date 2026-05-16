import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";

interface HeroSectionProps {
  title: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__inner">

        {/* LEFT */}
        <div className="hero__left">
          <h1 className="hero__heading">
            {title}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="hero__right">

          <p className="hero__text">
            Bonjour and welcome to the heart of my kitchen! I'm Isabella Russo,
            the culinary enthusiast behind this haven of flavors, Cooks Delight.
            Join me on a gastronomic journey where each dish carries a story,
            and every recipe is a crafted symphony of taste.
          </p>

          <button
            className="hero__btn"
            onClick={() => navigate("/recipes")}
          >
            EXPLORE RECIPES
          </button>

        </div>

      </div>
    </section>
  );
};