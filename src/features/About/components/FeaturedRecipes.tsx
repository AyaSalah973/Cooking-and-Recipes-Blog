import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../../../entities/Recipe';
import styles from '../styles/FeaturedRecipes.module.css';

interface FeaturedRecipesProps {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({
  recipes,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

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

  const handleViewRecipe = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
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

  return (
    <div className={styles.featured}>

      {/* HEADER */}
      <div className={styles['featured-header']}>

        <h2>FEATURED RECIPES</h2>

        <div className={styles.arrows}>
          <button
            onClick={prev}
            disabled={index === 0}
          >
            {"<"}
          </button>

          <button
            onClick={next}
            disabled={index + perPage >= recipes.length}
          >
            {">"}
          </button>
        </div>

      </div>

      {/* GRID */}
      <div className={styles['featured-grid']}>

        {recipes.slice(index, index + perPage).map((recipe) => (

          <div
            key={recipe.id}
            className={styles['recipe-card']}
          >

            {/* IMAGE */}
            <div className={styles['image-wrap']}>

              <img
                src={recipe.image}
                alt={recipe.name}
              />

              {/* HEART */}
              <button className={styles['heart-btn']}>

                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>

              </button>

              {/* RATING */}
              <div className={styles.rating}>
                ⭐ {recipe.rating ?? 4.8}
              </div>

            </div>

            {/* CONTENT */}
            <div className={styles['card-content']}>

              <h3>{recipe.name}</h3>

              <p>
                {recipe.instructions?.slice(0, 80)}...
              </p>

              <div className={styles['card-footer']}>

                <span>
                  {recipe.prepTimeMinutes} MIN · {recipe.servings} SERVES
                </span>

                <button
                  className={styles['view-btn']}
                  onClick={() => handleViewRecipe(recipe.id)}
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