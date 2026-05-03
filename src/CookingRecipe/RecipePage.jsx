import styles from "./RecipePage.module.css";
import clockIcon from "../assets/icons/clockIcon.png";
import lockIcon from "../assets/icons/lockIcon.png";
import plateIcon from "../assets/icons/plateIcon.png";
import Vector from "../assets/icons/Vector.png";
import Vector1 from "../assets/icons/Vector1.png";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import SimilarRecipes from "../components/SimilarRecipes.jsx";
import { useParams } from "react-router-dom";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className={styles['loading-text']}>Loading recipe...</h2>;
  if (!recipe) return <h2 className={styles['error-text']}>Recipe not found!</h2>;

  return (
    <div className={styles.page}>

      {/* RECIPE CARD أول */}
      <div className={styles.container}>
        <div className={styles['recipe-card']}>
          <span className={styles.badge}>RECIPE</span>
          <h1 className={styles.title}>{recipe.name}</h1>
          <p className={styles.desc}>
            Welcome to Cooks Delight, where culinary dreams come alive! Today, we
            embark on a journey of flavors with a dish that promises to elevate
            your dining experience – our {recipe.name}.
          </p>

          <div className={styles['info-row']}>
            <span className={styles['info-item']}>
              <img src={clockIcon} alt="clock" />
              {recipe.cookTimeMinutes} MINUTES
            </span>
            <span>•</span>
            <span className={styles['info-item']}>
              <img src={lockIcon} alt="lock" />
              {recipe.difficulty || "EASY"} DIFFICULTY
            </span>
            <span>•</span>
            <span className={styles['info-item']}>
              <img src={plateIcon} alt="plate" />
              {recipe.servings} SERVES
            </span>
          </div>

          <img src={recipe.image} alt={recipe.name} className={styles['recipe-img']} />

          <div className={styles['bottom-row']}>
            <img src={Vector} alt="vector" />
            <img src={Vector} alt="vector" />
            <img src={Vector} alt="vector" />
            <img src={Vector} alt="vector" />
            <img src={Vector1} alt="vector1" />
            <span>•</span>
            <span>{recipe.reviewCount || 0} REVIEWS</span>
            <span>•</span>
            <div className={styles.tags}>
              <span className={`${styles.tag} ${styles.red}`}>{recipe.mealType?.[0] || "MAIN"}</span>
              <span>•</span>
              <span className={`${styles.tag} ${styles.green}`}>{recipe.cuisine || "INTERNATIONAL"}</span>
            </div>
          </div>

          <div className={styles['recipe-details']}>
            <div className={styles['left-side']}>
              <h2>INSTRUCTIONS</h2>
              <div className={styles.steps}>
                {recipe.instructions?.map((step, index) => (
                  <p key={index}>
                    <strong>Step {index + 1})</strong> {step}
                  </p>
                ))}
              </div>
              <div className={styles['share-box']}>
                <span className={styles['share-text']}>SHARE</span>
                <FaFacebookF className={styles['social-icon']} />
                <FaInstagram className={styles['social-icon']} />
                <FaYoutube className={styles['social-icon']} />
              </div>
            </div>

            <div className={styles['right-side']}>
              <div className={styles.box1}>
                <h3>INGREDIENTS</h3>
                <ul>
                  {recipe.ingredients?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.box2}>
                <h3>NUTRITIONAL VALUE</h3>
                <p>Per serving:</p>
                <p><strong>Calories:</strong> ~{recipe.caloriesPerServing}</p>
                {recipe.proteinPerServe && <p><strong>Protein:</strong> ~{recipe.proteinPerServe}g</p>}
                {recipe.carbsPerServe && <p><strong>Carbs:</strong> ~{recipe.carbsPerServe}g</p>}
                {recipe.fatPerServe && <p><strong>Fat:</strong> ~{recipe.fatPerServe}g</p>}
              </div>

              <small>
                NOTE: Nutritional values are approximate and may vary based on portion sizes.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* SIMILAR RECIPES تاني */}
      <SimilarRecipes currentId={recipe.id} />

    </div>
  );
}

export default RecipePage;