import styles from "./RecipePage.module.css";
import clockIcon from "../assets/icons/clockIcon.png";
import lockIcon from "../assets/icons/lockIcon.png";
import plateIcon from "../assets/icons/plateIcon.png";
import Vector from "../assets/icons/Vector.png";
import Vector1 from "../assets/icons/Vector1.png";

import { useEffect, useState } from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import SimilarRecipes from "../components/SimilarRecipes.jsx";

import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

function RecipePage() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  const [translatedRecipe, setTranslatedRecipe] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const { t, i18n } = useTranslation();

  /* FETCH RECIPE */
  useEffect(() => {

    fetch(`https://dummyjson.com/recipes/${id}`)

      .then((res) => res.json())

      .then((data) => {

        setRecipe(data);

        setLoading(false);

      })

      .catch((error) => {

        console.error(
          "Error fetching recipe:",
          error
        );

        setLoading(false);

      });

  }, [id]);

  /* TRANSLATIONS */
  const translatedDifficulty = {
    Easy: t("easy"),
    Medium: t("medium"),
    Hard: t("hard"),
  };

  const translatedMealType = {
    Breakfast: t("breakfast"),
    Lunch: t("lunch"),
    Dinner: t("dinner"),
    Snack: t("snack"),
  };

  /* TRANSLATE RECIPE */
  useEffect(() => {

    if (!recipe || i18n.language !== "ar") {
      return;
    }

    const translateText = async (text) => {

      try {

        const response = await fetch(
            "https://translate.argosopentech.com/translate",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              q: text,
              source: "en",
              target: "ar",
              format: "text",
            }),
          }
        );

        const data = await response.json();

        return data.translatedText;

      } catch (error) {

        console.error(
          "Translation error:",
          error
        );

        return text;
      }
    };

    const translateRecipe = async () => {

      const translatedInstructions =
        await Promise.all(
          recipe.instructions.map((step) =>
            translateText(step)
          )
        );

      const translatedIngredients =
        await Promise.all(
          recipe.ingredients.map((item) =>
            translateText(item)
          )
        );

      const translatedName =
        await translateText(recipe.name);

      setTranslatedRecipe({
        ...recipe,

        name: translatedName,

        instructions: translatedInstructions,

        ingredients: translatedIngredients,
      });
    };

    translateRecipe();

  }, [recipe, i18n.language]);

  /* LOADING */
  if (loading) {

    return (
      <h2 className={styles["loading-text"]}>
        {t("loadingRecipe")}
      </h2>
    );
  }

  /* ERROR */
  if (!recipe) {

    return (
      <h2 className={styles["error-text"]}>
        {t("recipeNotFound")}
      </h2>
    );
  }

  /* CURRENT RECIPE */
  const currentRecipe =
    translatedRecipe || recipe;

  return (

    <div
      className={`${styles.page} ${
        document.body.classList.contains("dark")
          ? styles.dark
          : ""
      }`}
    >

      {/* RECIPE CARD */}
      <div className={styles.container}>

        <div className={styles["recipe-card"]}>

          <span className={styles.badge}>
            {t("recipe")}
          </span>

          <h1 className={styles.title}>
            {currentRecipe.name}
          </h1>

          <p className={styles.desc}>
            {t("recipeDescription", {
              name: currentRecipe.name,
            })}
          </p>

          {/* INFO */}
          <div className={styles["info-row"]}>

            <span className={styles["info-item"]}>
              <img src={clockIcon} alt="clock" />

              {recipe.cookTimeMinutes}
              {" "}
              {t("minutes")}
            </span>

            <span>•</span>

            <span className={styles["info-item"]}>
              <img src={lockIcon} alt="lock" />

              {
                translatedDifficulty[
                  recipe.difficulty
                ] || t("easy")
              }
            </span>

            <span>•</span>

            <span className={styles["info-item"]}>
              <img src={plateIcon} alt="plate" />

              {recipe.servings}
              {" "}
              {t("servings")}
            </span>

          </div>

          {/* IMAGE */}
          <img
            src={currentRecipe.image}
            alt={currentRecipe.name}
            className={styles["recipe-img"]}
          />

          {/* BOTTOM */}
          <div className={styles["bottom-row"]}>

            <img src={Vector} alt="vector" />
            <img src={Vector} alt="vector" />
            <img src={Vector} alt="vector" />
            <img src={Vector} alt="vector" />
            <img src={Vector1} alt="vector1" />

            <span>•</span>

            <span>
              {recipe.reviewCount || 0}
              {" "}
              {t("reviews")}
            </span>

            <span>•</span>

            <div className={styles.tags}>

              <span
                className={`${styles.tag} ${styles.red}`}
              >
                {
                  translatedMealType[
                    recipe.mealType?.[0]
                  ] || t("main")
                }
              </span>

              <span>•</span>

              <span
                className={`${styles.tag} ${styles.green}`}
              >
                {recipe.cuisine || t("international")}
              </span>

            </div>
          </div>

          {/* DETAILS */}
          <div className={styles["recipe-details"]}>

            {/* LEFT */}
            <div className={styles["left-side"]}>

              <h2>
                {t("instructions")}
              </h2>

              <div className={styles.steps}>

                {currentRecipe.instructions?.map(
                  (step, index) => (

                    <p key={index}>

                      <strong>
                        {t("step")}
                        {" "}
                        {index + 1})
                      </strong>

                      {" "}
                      {step}

                    </p>
                  )
                )}

              </div>

              {/* SHARE */}
              <div className={styles["share-box"]}>

                <span className={styles["share-text"]}>
                  {t("share")}
                </span>

                <FaFacebookF
                  className={styles["social-icon"]}
                />

                <FaInstagram
                  className={styles["social-icon"]}
                />

                <FaYoutube
                  className={styles["social-icon"]}
                />

              </div>
            </div>

            {/* RIGHT */}
            <div className={styles["right-side"]}>

              <div className={styles.box1}>

                <h3>
                  {t("ingredients")}
                </h3>

                <ul>

                  {currentRecipe.ingredients?.map(
                    (item, index) => (

                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}

                </ul>
              </div>

              {/* NUTRITION */}
              <div className={styles.box2}>

                <h3>
                  {t("nutritionalValue")}
                </h3>

                <p>
                  {t("perServing")}
                </p>

                <p>
                  <strong>
                    {t("calories")}
                  </strong>

                  {" "}
                  ~
                  {recipe.caloriesPerServing}
                </p>

              </div>

              <small>
                {t("noteNutritionalValues")}
              </small>

            </div>
          </div>
        </div>
      </div>

      {/* SIMILAR */}
      <SimilarRecipes currentId={recipe.id} />

    </div>
  );
}

export default RecipePage;