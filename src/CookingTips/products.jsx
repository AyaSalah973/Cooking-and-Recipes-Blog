import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./products.module.css";
import { Heart } from "lucide-react"; // أضفنا أيقونة القلب

function Products() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [newestIndex, setNewestIndex] = useState(0);
  const [basicsIndex, setBasicsIndex] = useState(0);

  const [nourishIndex, setNourishIndex] = useState(0);

  const [tipsIndex, setTipsIndex] = useState(0);

  // تحميل الوصفات والمفضلة
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  // تحميل الوصفات
  useEffect(() => {
    // تحميل الوصفات
    fetch("https://dummyjson.com/recipes?limit=0")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      });
  }, []);

  // حفظ المفضلة في localStorage عند تغييرها
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // دالة تبديل المفضلة
  const toggleFavorite = (recipeId, e) => {
    e.stopPropagation(); // لمنع الانتقال إلى صفحة الوصفة عند الضغط على القلب

    setFavorites((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  // التحقق إذا كانت الوصفة مفضلة
  const isFavorite = (recipeId) => favorites.includes(recipeId);

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
  // مكون بطاقة الوصفة الموحد مع زر المفضلة
  const RecipeCardWithFavorite = ({ recipe, variant = "newest" }) => {
    const getCardStyles = () => {
      switch (variant) {
        case "newest":
          return styles["newest-card"];
        case "basic":
          return styles["basic-card"];
        case "nourish":
          return styles["nourish-card"];
        case "tip":
          return styles["tip-card"];
        default:
          return styles["newest-card"];
      }
    };

    const getImageWrapperStyles = () => {
      switch (variant) {
        case "newest":
          return styles["newest-img-wrap"];
        case "basic":
          return styles["basic-img-wrap"];
        case "nourish":
          return styles["nourish-img-wrap"];
        case "tip":
          return styles["tip-img-wrap"];
        default:
          return styles["newest-img-wrap"];
      }
    };

    return (
      <div
        className={getCardStyles()}
        key={recipe.id}
        onClick={() => handleRecipeClick(recipe.id)}
        style={{ cursor: "pointer" }}
      >
        <div
          className={getImageWrapperStyles()}
          style={{ position: "relative" }}
        >
          <img src={recipe.image} alt={recipe.name} />

          {/* زر القلب */}
          <button
            className={styles["favorite-btn-products"]}
            onClick={(e) => toggleFavorite(recipe.id, e)}
            aria-label="Add to favorites"
          >
            <Heart
              size={18}
              fill={isFavorite(recipe.id) ? "#EE6352" : "none"}
              color={isFavorite(recipe.id) ? "#EE6352" : "#999999"}
            />
          </button>

          {/* الفيجان بادج للقسم الأول فقط */}
          {variant === "newest" && (
            <span className={styles["vegan-badge"]}>
              VEGAN
              <br />
              RECIPE
            </span>
          )}
        </div>
        <div className={styles[`${variant}-info`] || styles["newest-info"]}>
          <h3>{recipe.name}</h3>
          <p className={variant === "newest" ? styles["newest-desc"] : ""}>
            {recipe.instructions?.[0] || "A delicious recipe you will love."}
          </p>
          <div className={styles["card-footer"]}>
            <span className={styles.meta}>
              {recipe.cookTimeMinutes} MIN ·{" "}
              {recipe.difficulty?.toUpperCase() || "EASY"} PREP ·{" "}
              {recipe.servings} SERVES
            </span>
            <button
              className={styles["view-btn"]}
              onClick={(e) => {
                e.stopPropagation();
                handleRecipeClick(recipe.id);
              }}
            >
              VIEW RECIPE
            </button>
          </div>
        </div>
      </div>
    );
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
          {newest.map((recipe) => (
            <RecipeCardWithFavorite
              key={recipe.id}
              recipe={recipe}
              variant="newest"
            />
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
          {basics.map((recipe) => (
            <RecipeCardWithFavorite
              key={recipe.id}
              recipe={recipe}
              variant="basic"
            />
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
          {nourishing.map((recipe) => (
            <RecipeCardWithFavorite
              key={recipe.id}
              recipe={recipe}
              variant="nourish"
            />
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
          {tips.map((recipe) => (
            <RecipeCardWithFavorite
              key={recipe.id}
              recipe={recipe}
              variant="tip"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
