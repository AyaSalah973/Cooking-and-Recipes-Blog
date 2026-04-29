import "./SimilarRecipes.css";
import { useEffect, useState } from "react";
import badge from "../assets/icons/badge.svg";

function SimilarRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes.slice(1)));
  }, []);

  const nextSlide = () => {
    if (start + 2 < recipes.length) {
      setStart(start + 1);
    }
  };

  const prevSlide = () => {
    if (start > 0) {
      setStart(start - 1);
    }
  };

  return (
    <section className="similar-section">
      <div className="section-head">
        <h2>SIMILAR RECIPES</h2>

        <div className="arrows">
          <button onClick={prevSlide}>‹</button>
          <button onClick={nextSlide}>›</button>
        </div>
      </div>

      <div className="recipes-grid">
        {recipes.slice(start, start + 2).map((item) => (
          <div className="recipe-box" key={item.id}>
            <img src={item.image} alt={item.name} />
            {item.tags?.some((tag) =>
              [
                "vegan",
                "vegetarian",
                "plant-based",
                "veg",
                "meatless",
                "dairy-free",
              ].includes(tag.toLowerCase()),
            ) && <img src={badge} alt="badge" className="recipe-badge" />}

            <div className="recipe-content">
              <h3>{item.name}</h3>

              <p>{item.instructions[0]}</p>

              <div className="recipe-footer">
                <span>
                  {item.prepTimeMinutes} MIN · {item.difficulty} ·{" "}
                  {item.servings} SERVES
                </span>

                <button>VIEW RECIPE</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SimilarRecipes;
