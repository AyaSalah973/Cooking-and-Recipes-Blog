import { apiClient } from './apiClient';
import type { Recipe } from '../entities/Recipe';

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export const recipeApi = {
  getRecipes: async (limit: number = 10, skip: number = 0): Promise<RecipesResponse> => {
    return await apiClient.get<RecipesResponse>(`/recipes?limit=${limit}&skip=${skip}`);
  },

  getRecipeById: async (id: number): Promise<Recipe> => {
    return await apiClient.get<Recipe>(`/recipes/${id}`);
  },

  searchRecipes: async (query: string): Promise<RecipesResponse> => {
    return await apiClient.get<RecipesResponse>(`/recipes/search?q=${query}`);
  },
};