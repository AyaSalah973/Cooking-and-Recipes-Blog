import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./products.module.css";

function Products() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [newestIndex, setNewestIndex] = useState(0);
  const [basicsIndex, setBasicsIndex] = useState(0);

  const [nourishIndex, setNourishIndex] = useState(0);

  const [tipsIndex, setTipsIndex] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=0")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  const newest = recipes.slice(newestIndex, newestIndex + 2);
  const basics = recipes.slice(basicsIndex, basicsIndex + 3);

  const nourishing = recipes.slice(nourishIndex, nourishIndex + 2);

  const tips = recipes.slice(tipsIndex, tipsIndex + 3);

  const handleRecipeClick = (recipeId) => navigate(`/recipe/${recipeId}`);
  const nextNewest = () => {
    if (newestIndex + 2 < recipes.length) {
      setNewestIndex(newestIndex + 2);
    } else {
      setNewestIndex(0);
    }
  };

  const prevNewest = () => {
    if (newestIndex - 2 >= 0) {
      setNewestIndex(newestIndex - 2);
    } else {
      setNewestIndex(recipes.length - 2);
    }
  };
  /* BASICS */

  const nextBasics = () => {
    if (basicsIndex + 3 < recipes.length) {
      setBasicsIndex(basicsIndex + 1);
    } else {
      setBasicsIndex(0);
    }
  };

  const prevBasics = () => {
    if (basicsIndex > 0) {
      setBasicsIndex(basicsIndex - 1);
    } else {
      setBasicsIndex(recipes.length - 3);
    }
  };

  /* NOURISH */

  const nextNourish = () => {
    if (nourishIndex + 2 < recipes.length) {
      setNourishIndex(nourishIndex + 1);
    } else {
      setNourishIndex(0);
    }
  };

  const prevNourish = () => {
    if (nourishIndex > 0) {
      setNourishIndex(nourishIndex - 1);
    } else {
      setNourishIndex(recipes.length - 2);
    }
  };

  /* TIPS */

  const nextTips = () => {
    if (tipsIndex + 3 < recipes.length) {
      setTipsIndex(tipsIndex + 1);
    } else {
      setTipsIndex(0);
    }
  };

  const prevTips = () => {
    if (tipsIndex > 0) {
      setTipsIndex(tipsIndex - 1);
    } else {
      setTipsIndex(recipes.length - 3);
    }
  };
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles["hero-left"]}>
          <h1>OUR ESSENTIAL COOKING TIPS</h1>
        </div>
        <div className={styles["hero-right"]}>
          <p>
            Welcome to Cooks Delight's treasure trove of cooking wisdom! Whether
            you're a seasoned chef or just starting your culinary journey, our
            cooking tips are designed to elevate your skills, enhance your
            kitchen experience, and bring joy to your cooking adventures.
          </p>
        </div>
      </section>

      {/* BADGES */}
      <div className={styles["badges-row"]}>
        <div className={styles["badge-item"]}>
          <span className={styles["badge-icon"]}>🔪</span>
          <div>
            <strong>QUALITY TOOLS</strong>
            <p>Invest in high-quality knives, cutting boards, and cookware.</p>
          </div>
        </div>
        <div className={styles["badge-divider"]} />
        <div className={styles["badge-item"]}>
          <span className={styles["badge-icon"]}>🥄</span>
          <div>
            <strong>ESSENTIAL UTENSILS</strong>
            <p>
              Have a variety of utensils, including spatulas, tongs, and ladles.
            </p>
          </div>
        </div>
        <div className={styles["badge-divider"]} />
        <div className={styles["badge-item"]}>
          <span className={styles["badge-icon"]}>⚖️</span>
          <div>
            <strong>MEASURING ACCURACY</strong>
            <p>
              Use measuring cups and spoons for precise ingredient quantities.
            </p>
          </div>
        </div>
      </div>

      {/* NEWEST RECIPES */}
      <div className={styles["newest-section"]}>
        <div className={styles["section-header"]}>
          <h2>NEWEST RECIPES</h2>
          <div className={styles["nav-arrows"]}>
            <button className={styles.arrow} onClick={prevNewest}>
              ‹
            </button>

            <button className={styles.arrow} onClick={nextNewest}>
              ›
            </button>
          </div>
        </div>
        <div className={styles["newest-grid"]}>
          {newest.map((r) => (
            <div
              className={styles["newest-card"]}
              key={r.id}
              onClick={() => handleRecipeClick(r.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles["newest-img-wrap"]}>
                <img src={r.image} alt={r.name} />
                <span className={styles["vegan-badge"]}>
                  VEGAN
                  <br />
                  RECIPE
                </span>
              </div>
              <div className={styles["newest-info"]}>
                <h3>{r.name}</h3>
                <p className={styles["newest-desc"]}>
                  {r.instructions?.[0] || "A delicious recipe you will love."}
                </p>
                <div className={styles["card-footer"]}>
                  <span className={styles.meta}>
                    {r.cookTimeMinutes} MIN · {r.difficulty?.toUpperCase()} PREP
                    · {r.servings} SERVES
                  </span>
                  <button
                    className={styles["view-btn"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRecipeClick(r.id);
                    }}
                  >
                    VIEW RECIPE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MASTERING THE BASICS */}
      <div className={styles["basics-section"]}>
        <div className={styles["section-header"]}>
          <h2>MASTERING THE BASICS</h2>
          <div className={styles["nav-arrows"]}>
            <button className={styles.arrow} onClick={prevBasics}>
              ‹
            </button>

            <button className={styles.arrow} onClick={nextBasics}>
              ›
            </button>
          </div>
        </div>
        <div className={styles["basics-grid"]}>
          {basics.map((r) => (
            <div
              className={styles["basic-card"]}
              key={r.id}
              onClick={() => handleRecipeClick(r.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={r.image} alt={r.name} />
              <div className={styles["basic-info"]}>
                <h3>{r.name}</h3>
                <p>
                  {r.instructions?.[0] || "A delicious recipe you will love."}
                </p>
                <div className={styles["card-footer"]}>
                  <span className={styles.meta}>
                    {r.cookTimeMinutes} MIN · 01 JUN 23
                  </span>
                  <button
                    className={styles["read-btn"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRecipeClick(r.id);
                    }}
                  >
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOURISHING EVERY PALATE */}
      <div className={styles["nourish-section"]}>
        <div className={styles["section-header"]}>
          <h2>NOURISHING EVERY PALATE</h2>
          <div className={styles["nav-arrows"]}>
            <button className={styles.arrow} onClick={prevNourish}>
              ‹
            </button>

            <button className={styles.arrow} onClick={nextNourish}>
              ›
            </button>
          </div>
        </div>
        <div className={styles["nourish-grid"]}>
          {nourishing.map((r) => (
            <div
              className={styles["nourish-card"]}
              key={r.id}
              onClick={() => handleRecipeClick(r.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={r.image} alt={r.name} />
              <div className={styles["nourish-overlay"]}>
                <h3>{r.name}</h3>
                <p>
                  {r.instructions?.[0] || "A delicious recipe you will love."}
                </p>
                <div className={styles["card-footer"]}>
                  <span className={`${styles.meta} ${styles.light}`}>
                    {r.cookTimeMinutes} MIN · 01 JUN 23
                  </span>
                  <button
                    className={`${styles["read-btn"]} ${styles["white-btn"]}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRecipeClick(r.id);
                    }}
                  >
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TIPS & TRICKS */}
      <div className={styles["tips-section"]}>
        <div className={styles["section-header"]}>
          <h2>TIPS & TRICKS</h2>
          <div className={styles["nav-arrows"]}>
            <button className={styles.arrow} onClick={prevTips}>
              ‹
            </button>

            <button className={styles.arrow} onClick={nextTips}>
              ›
            </button>
          </div>
        </div>
        <div className={styles["tips-grid"]}>
          {tips.map((r) => (
            <div
              className={styles["tip-card"]}
              key={r.id}
              onClick={() => handleRecipeClick(r.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={r.image} alt={r.name} />
              <div className={styles["tip-info"]}>
                <h3>{r.name}</h3>
                <p>
                  {r.instructions?.[0] || "A delicious recipe you will love."}
                </p>
                <div className={styles["card-footer"]}>
                  <span className={styles.meta}>
                    {r.cookTimeMinutes} MIN · 01 JUN 23
                  </span>
                  <button
                    className={styles["read-btn"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRecipeClick(r.id);
                    }}
                  >
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
