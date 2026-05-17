// src/components/SimilarRecipes.jsx
import "./SimilarRecipes.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import badge from "../assets/icons/badge.svg";

function SimilarRecipes({ currentId }) {
  const [recipes, setRecipes] = useState([]);
  const [index, setIndex] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        // Filter out the current recipe only
        const filteredRecipes = data.recipes.filter(
          (recipe) => recipe.id !== currentId
        );
        setRecipes(filteredRecipes);
      });
  }, [currentId]);

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
    window.scrollTo(0, 0);
  };

  const next = () => {
    if (index + 2 < recipes.length) {
      setIndex(index + 2);
    }
  };

  const prev = () => {
    if (index - 2 >= 0) {
      setIndex(index - 2);
    }
  };

  if (recipes.length === 0) {
    return null;
  }

  return (
    <section className="similar-section">
      <div className="section-head">
        <h2>SIMILAR RECIPES</h2>
        <div className="arrows">
          <button onClick={prev}>{"<"}</button>
          <button onClick={next}>{">"}</button>
        </div>
      </div>

      {/* ✅ Grid structure identical to Featured Recipes */}
      <div className="featured-grid-similar">
        {recipes.slice(index, index + 2).map((item) => (
          <div className="recipe-card-similar" key={item.id}>
            <div className="image-wrapper-similar">
              <img src={item.image} alt={item.name} className="recipe-img-similar" />
              {/* ✅ Badge conditionally rendered */}
              {item.tags?.some((tag) =>
                [
                  "vegan",
                  "vegetarian",
                  "plant-based",
                  "veg",
                  "meatless",
                  "dairy-free",
                ].includes(tag.toLowerCase())
              ) && <img src={badge} alt="badge" className="recipe-badge-similar" />}
            </div>
            <div className="card-content-similar">
              <h3>{item.name}</h3>
              <p>{item.instructions?.[0]?.slice(0, 80)}...</p>
              <div className="card-footer-similar">
                <span>{item.prepTimeMinutes} MIN · {item.servings} SERVES</span>
                <button 
                  className="view-btn-similar" 
                  onClick={() => handleViewRecipe(item.id)}
                >
                  VIEW RECIPE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SimilarRecipes;