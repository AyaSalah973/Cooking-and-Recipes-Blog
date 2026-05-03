import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import type { Recipe } from '../../../entities/Recipe';
import styles from './FeaturedRecipes.module.css'; // Import CSS module

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
      <div className={styles['featured-header']}>
        <h2>FEATURED RECIPES</h2>
        <div className={styles.arrows}>
          <button onClick={prev} disabled={index === 0}>{"<"}</button>
          <button onClick={next} disabled={index + perPage >= recipes.length}>{">"}</button>
        </div>
      </div>
      <div className={styles['featured-grid']}>
        {recipes.slice(index, index + perPage).map((recipe) => (
          <div key={recipe.id} className={styles['recipe-card']}>
            <img src={recipe.image} alt={recipe.name} />
            <div className={styles['card-content']}>
              <h3>{recipe.name}</h3>
              <p>{recipe.instructions?.slice(0, 80)}...</p>
              <div className={styles['card-footer']}>
                <span>{recipe.prepTimeMinutes} MIN · {recipe.servings} SERVES</span>
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