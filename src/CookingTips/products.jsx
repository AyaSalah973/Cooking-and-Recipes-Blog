import { useEffect, useState } from "react";
import "./products.css";

function Products() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=0")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  const newest = recipes.slice(0, 2);
  const basics = recipes.slice(2, 8);
  const nourishing = recipes.slice(8, 11);
  const tips = recipes.slice(11, 17);

  return (
    <div className="page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>OUR ESSENTIAL COOKING TIPS</h1>
        </div>
        <div className="hero-right">
          <p>Welcome to Cooks Delight's treasure trove of cooking wisdom! Whether you're a seasoned chef or just starting your culinary journey, our cooking tips are designed to elevate your skills, enhance your kitchen experience, and bring joy to your cooking adventures.</p>
        </div>
      </section>


      {/* BADGES */}
      <div className="badges-row">
        <div className="badge-item">
          <span className="badge-icon">🔪</span>
          <div>
            <strong>QUALITY TOOLS</strong>
            <p>Invest in high-quality knives, cutting boards, and cookware.</p>
          </div>
        </div>
        <div className="badge-divider" />
        <div className="badge-item">
          <span className="badge-icon">🥄</span>
          <div>
            <strong>ESSENTIAL UTENSILS</strong>
            <p>Have a variety of utensils, including spatulas, tongs, and ladles.</p>
          </div>
        </div>
        <div className="badge-divider" />
        <div className="badge-item">
          <span className="badge-icon">⚖️</span>
          <div>
            <strong>MEASURING ACCURACY</strong>
            <p>Use measuring cups and spoons for precise ingredient quantities.</p>
          </div>
        </div>
      </div>


      {/* NEWEST RECIPES */}
      <div className="newest-section">
        <div className="section-header">
          <h2>NEWEST RECIPES</h2>
          <div className="nav-arrows">
            <button className="arrow">‹</button>
            <button className="arrow">›</button>
          </div>
        </div>
        <div className="newest-grid">
          {newest.map((r) => (
            <div className="newest-card" key={r.id}>
              <div className="newest-img-wrap">
                <img src={r.image} alt={r.name} />
                <span className="vegan-badge">VEGAN<br />RECIPE</span>
              </div>
              <div className="newest-info">
                <h3>{r.name}</h3>
                <p className="newest-desc">{r.instructions?.[0] || "A delicious recipe you will love."}</p>
                <div className="card-footer">
                  <span className="meta">{r.cookTimeMinutes} MIN · {r.difficulty?.toUpperCase()} PREP · {r.servings} SERVES</span>
                  <button className="view-btn">VIEW RECIPE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* MASTERING THE BASICS */}
      <div className="basics-section">
        <div className="section-header">
          <h2>MASTERING THE BASICS</h2>
          <div className="nav-arrows">
            <button className="arrow">‹</button>
            <button className="arrow">›</button>
          </div>
        </div>
        <div className="basics-grid">
          {basics.map((r) => (
            <div className="basic-card" key={r.id}>
              <img src={r.image} alt={r.name} />
              <div className="basic-info">
                <h3>{r.name}</h3>
                <p>{r.instructions?.[0] || "A delicious recipe you will love."}</p>
                <div className="card-footer">
                  <span className="meta">{r.cookTimeMinutes} MIN · 01 JUN 23</span>
                  <button className="read-btn">READ MORE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* NOURISHING EVERY PALATE */}
      <div className="nourish-section">
        <div className="section-header">
          <h2>NOURISHING EVERY PALATE</h2>
          <div className="nav-arrows">
            <button className="arrow">‹</button>
            <button className="arrow">›</button>
          </div>
        </div>
        <div className="nourish-grid">
          {nourishing.map((r) => (
            <div className="nourish-card" key={r.id}>
              <img src={r.image} alt={r.name} />
              <div className="nourish-overlay">
                <h3>{r.name}</h3>
                <p>{r.instructions?.[0] || "A delicious recipe you will love."}</p>
                <div className="card-footer">
                  <span className="meta light">{r.cookTimeMinutes} MIN · 01 JUN 23</span>
                  <button className="read-btn white-btn">READ MORE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* TIPS & TRICKS */}
      <div className="tips-section">
        <div className="section-header">
          <h2>TIPS & TRICKS</h2>
          <div className="nav-arrows">
            <button className="arrow">‹</button>
            <button className="arrow">›</button>
          </div>
        </div>
        <div className="tips-grid">
          {tips.map((r) => (
            <div className="tip-card" key={r.id}>
              <img src={r.image} alt={r.name} />
              <div className="tip-info">
                <h3>{r.name}</h3>
                <p>{r.instructions?.[0] || "A delicious recipe you will love."}</p>
                <div className="card-footer">
                  <span className="meta">{r.cookTimeMinutes} MIN · 01 JUN 23</span>
                  <button className="read-btn">READ MORE</button>
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