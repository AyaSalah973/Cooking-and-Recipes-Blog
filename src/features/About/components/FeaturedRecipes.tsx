// FeaturedRecipes.tsx - النسخة الكاملة
import React from 'react';
import type { Recipe } from '../../../entities/Recipe';
import styles from '../styles/FeaturedRecipes.module.css';

interface FeaturedRecipesProps {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  favorites: number[];
  onToggleFavorite: (recipeId: number) => void;
  onRecipeClick: (recipeId: number) => void;
}

export const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({
  recipes,
  loading,
  error,
  favorites,
  onToggleFavorite,
  onRecipeClick,
}) => {
  const [index, setIndex] = React.useState(0);
  const perPage = 2;

  const next = () => {
    if (index + perPage < recipes.length) {
      setIndex(index + perPage);
    }
  };

  const prev = () => {
    if (index - perPage >= 0) {
      setIndex(index - perPage);
    }
  };

  const handleHeartClick = (e: React.MouseEvent, recipeId: number) => {
    e.stopPropagation(); // منع انتشار الحدث للكارد
    onToggleFavorite(recipeId);
  };

  const handleCardClick = (recipeId: number) => {
    onRecipeClick(recipeId);
  };

  if (loading) {
    return (
      <div className="text-center py-12 font-roboto text-[#26252299]">
        <div className="inline-block w-8 h-8 border-3 border-[#F29C33] border-t-transparent rounded-full animate-spin" />
        <p className="mt-3">Loading delicious recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-12">
        {error}
      </div>
    );
  }

  const displayedRecipes = recipes.slice(index, index + perPage);

  if (displayedRecipes.length === 0) {
    return null;
  }

  return (
    <div className={styles.featured}>
      <div className={styles['featured-header']}>
        <h2>FEATURED RECIPES</h2>
        <div className={styles.arrows}>
          <button onClick={prev} disabled={index === 0}>
            {"<"}
          </button>
          <button onClick={next} disabled={index + perPage >= recipes.length}>
            {">"}
          </button>
        </div>
      </div>

      <div className={styles['featured-grid']}>
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className={styles['recipe-card']}
            onClick={() => handleCardClick(recipe.id)}
          >
            <div className={styles['image-wrap']}>
              <img src={recipe.image} alt={recipe.name} />
              
              <button 
                className={`${styles['heart-btn']} ${favorites.includes(recipe.id) ? styles.active : ''}`}
                onClick={(e) => handleHeartClick(e, recipe.id)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={favorites.includes(recipe.id) ? "currentColor" : "none"}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <div className={styles.rating}>
                ⭐ {recipe.rating ?? 4.8}
              </div>
            </div>

            <div className={styles['card-content']}>
              <h3>{recipe.name}</h3>
              <p>{recipe.instructions?.[0]?.slice(0, 80)}...</p>
              
              <div className={styles['card-footer']}>
                <span>
                  {recipe.prepTimeMinutes} MIN · {recipe.servings} SERVES
                </span>
                <button 
                  className={styles['view-btn']}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(recipe.id);
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
  );
};