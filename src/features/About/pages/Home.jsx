// src/pages/Home.jsx (أو المسار الصحيح لملف Home)

import styles from "./Home.module.css";
import heroImg from "../../../assets/image_1.png";
import image2 from "../../../assets/image_2.jpg";
import image3 from "../../../assets/image_3.jpg";
import image4 from "../../../assets/image_4.png";
import { Milk, Soup, Hamburger, Cookie, Popcorn, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const MEAL_CATEGORIES = [
  { name: "BREAKFAST", icon: Milk },
  { name: "LUNCH", icon: Soup },
  { name: "DINNER", icon: Hamburger },
  { name: "DESSERT", icon: Cookie },
  { name: "SNACK", icon: Popcorn },
];

export default function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [favorites, setFavorites] = useState([]);

  // تحميل الوصفات والمفضلة عند بدء التشغيل
  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=100")
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes);
      });
    
    // تحميل المفضلة من localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // تحديث localStorage عند تغيير المفضلة
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleViewRecipe = (recipeId) => navigate(`/recipe/${recipeId}`);

  // دالة تبديل المفضلة
  const toggleFavorite = (recipeId, e) => {
    e.stopPropagation(); // لمنع الانتقال إلى صفحة الوصفة عند الضغط على القلب
    
    setFavorites(prev => {
      if (prev.includes(recipeId)) {
        return prev.filter(id => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  // التحقق إذا كانت الوصفة مفضلة
  const isFavorite = (recipeId) => favorites.includes(recipeId);

  const next = () => { if (index + 2 < recipes.length) setIndex(index + 2); };
  const prev = () => { if (index - 2 >= 0) setIndex(index - 2); };

  const FILTER_CATEGORIES = ["ALL","Breakfast","Lunch","Dinner","Dessert","Snack"];

  const normalizeCategory = (name) => {
    if (!name) return "ALL";
    const lower = name.toLowerCase();
    if (lower === "all") return "ALL";
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const filteredRecipes = normalizeCategory(selectedCategory) === "ALL"
    ? recipes
    : recipes.filter(r => r.mealType?.some(
        type => normalizeCategory(type) === normalizeCategory(selectedCategory)
      ));

  const scrollToSection = () => {
    const element = document.getElementById("recipes");
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Component Recipe Card مع زر المفضلة
  const RecipeCard = ({ recipe }) => (
    <div className={styles['recipe-card']}>
      <div className={styles['card-image-wrapper']}>
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          onClick={() => handleViewRecipe(recipe.id)}
        />
        <button 
          className={`${styles['favorite-btn']} ${isFavorite(recipe.id) ? styles['favorite-active'] : ''}`}
          onClick={(e) => toggleFavorite(recipe.id, e)}
          aria-label="Add to favorites"
        >
          <Heart 
            size={18} 
            fill={isFavorite(recipe.id) ? "#EE6352" : "none"} 
            color={isFavorite(recipe.id) ? "#EE6352" : "#666"} 
          />
        </button>
      </div>
      <div className={styles['card-content']}>
        <h3 onClick={() => handleViewRecipe(recipe.id)}>{recipe.name}</h3>
        <p>{recipe.instructions?.[0]?.slice(0, 80)}...</p>
        <div className={styles['card-footer']}>
          <span>{recipe.prepTimeMinutes} MIN · {recipe.servings} SERVES</span>
          <button className={styles['view-btn']} onClick={() => handleViewRecipe(recipe.id)}>VIEW RECIPE</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.home}>

      {/* HERO */}
      <div className={styles.hero}>
        <img src={heroImg} alt="hero" className={styles['hero-img']} />
        <div className={styles['hero-overlay']}>
          <h1>UNLEASH CULINARY EXCELLENCE</h1>
          <p>Explore a world of flavors, discover handcrafted recipes, and let the aroma of our passion for cooking fill your kitchen</p>
          <div className={styles['hero-buttons']}>
            <button className={styles['btn-primary']} onClick={() => navigate('/login')}>SIGN UP NOW!</button>
            <button className={styles['btn-secondary']} onClick={() => navigate('/recipes')}>EXPLORE RECIPES</button>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className={styles.categories}>
        <div className={styles['categories-left']}>
          <span className={styles.tag}>EXPLORE</span>
          <h2>OUR DIVERSE PALETTE</h2>
          <p>If you are a breakfast enthusiast, a connoisseur of savory delights, or on the lookout for irresistible desserts, our curated selection has something to satisfy every palate.</p>
          <button className={styles['see-more']} onClick={() => { setSelectedCategory("ALL"); scrollToSection(); }}>SEE MORE</button>
        </div>
        <div className={styles['categories-right']}>
          {MEAL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div className={styles['category-item']} key={idx}
                onClick={() => { setSelectedCategory(normalizeCategory(cat.name)); scrollToSection(); }}
                style={{ cursor: "pointer" }}>
                <Icon size={32} />
                <span>{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURED */}
      <div className={styles.featured}>
        <div className={styles['featured-header']}>
          <h2>FEATURED RECIPES</h2>
          <div className={styles.arrows}>
            <button onClick={prev}>{"<"}</button>
            <button onClick={next}>{">"}</button>
          </div>
        </div>
        <div className={styles['featured-grid']}>
          {recipes.slice(index, index + 2).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* RECIPES SECTION */}
      <div id="recipes" className={styles['recipes-section']}>
        <div className={styles['recipes-header']}>
          <span className={styles.tag}>RECIPES</span>
          <h2>EMBARK ON A JOURNEY</h2>
          <p>With our diverse collection of recipes we have something to satisfy every palate.</p>
          <div className={styles['filter-buttons']}>
            {FILTER_CATEGORIES.map((cat) => (
              <button key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={normalizeCategory(selectedCategory) === normalizeCategory(cat) ? styles['active-filter'] : ""}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className={styles['recipes-grid']}>
          {filteredRecipes.slice(0, 6).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* ABOUT PREVIEW */}
      <div className={styles['about-preview']}>
        <div className={styles['about-left']}>
          <span className={styles.tag}>ABOUT US</span>
          <h2>OUR CULINARY CHRONICLE</h2>
          <p>Our journey is crafted with dedication, creativity, and an unrelenting commitment to delivering delightful culinary experiences.</p>
          <button className={styles['read-more-btn']} onClick={() => navigate('/about')}>READ MORE</button>
        </div>
        <img src={image2} alt="food detail" className={styles['img-small']} />
        <img src={image3} alt="chef cooking" className={styles['img-tall']} />
        <img src={image4} alt="cooking process" className={styles['img-wide']} />
      </div>

    </div>
  );
}