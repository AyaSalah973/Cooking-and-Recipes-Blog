import "./Home.css";
import heroImg from "../../../assets/image_1.png";
import image2 from "../../../assets/image_2.jpg";
import image3 from "../../../assets/image_3.jpg";
import image4 from "../../../assets/image_4.png";
import { Milk, Soup, Hamburger, Cookie, Popcorn } from "lucide-react";
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

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data.recipes));
  }, []);

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

  const FILTER_CATEGORIES = [
    "ALL",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  // ✅ دالة توحيد الأسماء
  const normalizeCategory = (name) => {
    if (!name) return "ALL";
    const lower = name.toLowerCase();
    if (lower === "all") return "ALL";
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // ✅ منطق الفلترة باستخدام الأسماء الموحدة
  const filteredRecipes =
    normalizeCategory(selectedCategory) === "ALL"
      ? recipes
      : recipes.filter(
          (r) => r.mealType?.some(
            type => normalizeCategory(type) === normalizeCategory(selectedCategory)
          )
        );

  // ✅ فانكشن السكرول
  const scrollToSection = () => {
    const element = document.getElementById("recipes");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="home">
      {/* HERO SECTION */}
      <div className="hero">
        <img src={heroImg} alt="hero" className="hero-img" />
        <div className="hero-overlay">
          <h1>UNLEASH CULINARY EXCELLENCE</h1>
          <p>
            Explore a world of flavors, discover handcrafted recipes, and let
            the aroma of our passion for cooking fill your kitchen
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">SIGN UP NOW!</button>
            <button className="btn-secondary">EXPLORE RECIPES</button>
          </div>
        </div>
      </div>
      
      {/* CATEGORIES SECTION */}
      <div className="categories">
        <div className="categories-left">
          <span className="tag">EXPLORE</span>
          <h2>OUR DIVERSE PALETTE</h2>
          <p>
            If you are a breakfast enthusiast, a connoisseur of savory delights,
            or on the lookout for irresistible desserts, our curated selection
            has something to satisfy every palate.
          </p>
          <button 
            className="see-more" 
            onClick={() => {
              setSelectedCategory("ALL");
              scrollToSection();
            }}
          >
            SEE MORE
          </button>
        </div>

        <div className="categories-right">
          {/* ✅ التصنيفات من اليمين - باستخدام التوحيد */}
          {MEAL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                className="category-item" 
                key={idx}
                onClick={() => {
                  const normalized = normalizeCategory(cat.name);
                  setSelectedCategory(normalized);
                  scrollToSection();
                }}
                style={{ cursor: "pointer" }}
              >
                <Icon size={32} />
                <span>{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURED RECIPES */}
      <div className="featured">
        <div className="featured-header">
          <h2>FEATURED RECIPES</h2>
          <div className="arrows">
            <button onClick={prev}>{"<"}</button>
            <button onClick={next}>{">"}</button>
          </div>
        </div>

        <div className="featured-grid">
          {recipes.slice(index, index + 2).map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <div className="card-content">
                <h3>{recipe.name}</h3>
                <p>{recipe.instructions?.slice(0, 80)}...</p>
                <div className="card-footer">
                  <span>
                    {recipe.prepTimeMinutes} MIN · {recipe.servings} SERVES
                  </span>
                  <button className="view-btn">VIEW RECIPE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECIPES SECTION */}
      <div id="recipes" className="recipes-section">
        
        <div className="recipes-header">
          <span className="tag">RECIPES</span>
          <h2>EMBARK ON A JOURNEY</h2>
          <p>
            With our diverse collection of recipes we have something
            to satisfy every palate.
          </p>

          {/* ✅ أزرار الفلتر - باستخدام التوحيد في المقارنة */}
          <div className="filter-buttons">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={
                  normalizeCategory(selectedCategory) === normalizeCategory(cat) 
                    ? "active-filter" 
                    : ""
                }
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="recipes-grid">
          {filteredRecipes.slice(0, 6).map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <div className="card-content">
                <h3>{recipe.name}</h3>
                <p>{recipe.instructions?.slice(0, 80)}...</p>
                <div className="card-footer">
                  <span>
                    {recipe.prepTimeMinutes} MIN · {recipe.servings} SERVES
                  </span>
                  <button className="view-btn">VIEW RECIPE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="about-preview">

        {/* TEXT */}
        <div className="about-left">
          <span className="tag">ABOUT US</span>
          <h2>OUR CULINARY CHRONICLE</h2>

          <p>
            Our journey is crafted with dedication, creativity, and an
            unrelenting commitment to delivering delightful culinary
            experiences. Join us in savoring the essence of every dish
            and the stories that unfold.
          </p>

          <button 
            className="read-more-btn"
            onClick={() => navigate('/about')}  
          >
            READ MORE
          </button>
        </div>

        {/* الصور */}
        <img
          src={image2}
          alt="food detail"
          className="img-small"
        />

        <img
          src={image3}
          alt="chef cooking"
          className="img-tall"
        />

        <img
          src={image4}
          alt="cooking process"
          className="img-wide"
        />

      </div>
    </div>
  );
}


