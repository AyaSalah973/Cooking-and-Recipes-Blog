import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Recipe {
  id: number;
  name: string;
  image: string;
  instructions: string[];
  prepTimeMinutes: number;
  difficulty: string;
  servings: number;
}

export default function RecipesSearch() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/recipes?limit=50")
      .then(res => res.json())
      .then(data => {
        const filtered = query
          ? data.recipes.filter((r: Recipe) =>
              r.name.toLowerCase().includes(query.toLowerCase())
            )
          : data.recipes;
        setRecipes(filtered);
        setLoading(false);
      });
  }, [query]);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '0 20px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(24px, 4vw, 36px)',
          color: '#262522',
          margin: 0,
          textTransform: 'uppercase',
        }}>
          DISPLAYING RESULTS FOR:{' '}
          <span style={{ color: '#F29C33' }}>{query.toUpperCase()}</span>
        </h1>
        <p style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: '13px',
          color: '#999',
          marginTop: '8px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          {recipes.length} RECIPES FOUND
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p style={{ fontFamily: "'Roboto', sans-serif", color: '#666' }}>
          No recipes found for "{query}"
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(38,37,34,0.1)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '16px' }}>
                <h3 style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#262522',
                  margin: '0 0 8px',
                }}>
                  {recipe.name}
                </h3>
                <p style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: '13px',
                  color: '#666',
                  margin: '0 0 16px',
                  lineHeight: '1.5',
                }}>
                  {recipe.instructions?.[0]?.slice(0, 80)}...
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: '11px',
                    color: '#262522',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}>
                    {recipe.prepTimeMinutes} MIN · {recipe.difficulty?.toUpperCase()} · {recipe.servings} SERVES
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/recipe/${recipe.id}`); }}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '24px',
                      border: '1px solid #262522',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    VIEW RECIPE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}