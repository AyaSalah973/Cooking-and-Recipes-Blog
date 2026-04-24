import { useState, useEffect } from 'react';
import { recipeApi } from '../../../services/recipeApi';
import type { Recipe } from '../../../entities/Recipe';

interface UseRecipesReturn {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export const useRecipes = (limit: number = 6): UseRecipesReturn => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await recipeApi.getRecipes(limit);
        setRecipes(response.recipes);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to load recipes. Please try again later.';
        setError(errorMessage);
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [limit]);

  return { recipes, loading, error };
};