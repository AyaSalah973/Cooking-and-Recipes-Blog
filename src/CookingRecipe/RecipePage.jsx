import "./RecipePage.css";
import clockIcon from "../assets/icons/clockIcon.png";
import lockIcon from "../assets/icons/lockIcon.png";
import plateIcon from "../assets/icons/plateIcon.png";
import Vector from "../assets/icons/Vector.png";
import Vector1 from "../assets/icons/Vector1.png";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import SimilarRecipes from "../components/SimilarRecipes.jsx";

function RecipePage() {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes/1")
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, []);

  if (!recipe) return <h2>Loading...</h2>;
  <SimilarRecipes currentId={recipe.id} />;

  return (
    <div className="container">
      <div className="recipe-card">
        <span className="badge">RECIPE</span>
        <h1>{recipe.name}</h1>
        <p className="desc">
          Welcome to Cooks Delight, where culinary dreams come alive! Today, we
          embark on a journey of flavors with a dish that promises to elevate
          your dining experience – our Classic Margherita Pizza.
        </p>
        <div className="info-row">
          <span className="info-item">
            <img src={clockIcon} alt="clock" />
            {recipe.cookTimeMinutes} MINUTES
          </span>

          <span>•</span>

          <span className="info-item">
            <img src={lockIcon} alt="lock" />
            EASY DIFFICULTY
          </span>

          <span>•</span>

          <span className="info-item">
            <img src={plateIcon} alt="plate" />
            {recipe.servings} SERVES
          </span>
        </div>
        <img src={recipe.image} alt="recipe" className="recipe-img" />
        <div className="bottom-row">
          <img src={Vector} alt="vector" />
          <img src={Vector} alt="vector" />
          <img src={Vector} alt="vector" />
          <img src={Vector} alt="vector" />
          <img src={Vector1} alt="vector1" />
          <span>•</span>
          <span>{recipe.reviewCount} REVIEWS</span>
          <span>•</span>
          <div className="tags">
            <span className="tag red">{recipe.mealType[0]}</span>
            <span>•</span>
            <span className="tag green">{recipe.cuisine}</span>
          </div>
        </div>
        <div className="recipe-details">
          <div className="left-side">
            <h2>INSTRUCTIONS</h2>

            <div className="steps">
              {recipe.instructions.map((step, index) => (
                <p key={index}>
                  <strong>Step {index + 1})</strong> {step}
                </p>
              ))}
            </div>
            <div className="share-box">
              <span className="share-text">SHARE</span>
              <FaFacebookF className="social-icon" />
              <FaInstagram className="social-icon" />
              <FaYoutube className="social-icon" />
            </div>
          </div>

          <div className="right-side">
            <div className="box1">
              <h3>INGREDIENTS</h3>

              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="box2">
              <h3>NUTRITIONAL VALUE</h3>

              <p>Per serving:</p>
              <p>
                <strong>Calories:</strong> ~{recipe.caloriesPerServing}
              </p>
            </div>

            <small>
              NOTE: Nutritional values are approximate and may vary based on
              portion sizes.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
