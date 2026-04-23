import React, { useState } from 'react';
import type { Recipe } from '../../../entities/Recipe';

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
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(recipes.length / perPage);
  const visible = recipes.slice(page * perPage, page * perPage + perPage);

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
    <div className="bg-[#f0ebe1] px-4 py-10 font-roboto border border-[#2625223D] rounded-[32px] mb-10">
      {/* Header row */}
      <div className="flex justify-between items-center mb-7 flex-wrap gap-4">
        <h2 className="font-montserrat font-extrabold text-[clamp(24px,5vw,28px)] leading-none tracking-[-0.01em] uppercase text-[#262522] m-0">
          Featured Recipes
        </h2>

        {/* Pagination arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className={`
              w-9 h-9 rounded-full border border-[#2625223D] bg-white 
              flex items-center justify-center text-base text-[#262522]
              transition-all duration-200
              ${page === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
            `}
          >
            ‹
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className={`
              w-9 h-9 rounded-full border border-[#2625223D] bg-white 
              flex items-center justify-center text-base text-[#262522]
              transition-all duration-200
              ${page >= totalPages - 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
            `}
          >
            ›
          </button>
        </div>
      </div>

      {/* Cards grid - متجاوب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {visible.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl border border-[#2625221A] overflow-hidden flex flex-col"
          >
            {/* Recipe image */}
            <div className="relative w-full h-[220px]">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover block"
              />
              {/* Rating badge */}
              <div className="absolute bottom-3 right-3 bg-[#9FDC26] text-[#141414] rounded-full w-11 h-11 flex flex-col items-center justify-center text-[11px] font-bold leading-tight">
                <span>⭐</span>
                <span>{recipe.rating}</span>
              </div>
            </div>

            {/* Card body */}
            <div className="p-4 pb-2 flex flex-col gap-1.5 flex-1">
              <h3 className="font-montserrat font-bold text-[clamp(16px,4vw,17px)] text-[#262522] m-0">
                {recipe.name}
              </h3>
              <p className="font-roboto text-[clamp(12px,3.5vw,13px)] text-[#262522] leading-[140%] m-0">
                {recipe.cuisine} cuisine · {recipe.caloriesPerServing} cal per serving
              </p>
            </div>

            {/* Card footer: info + button */}
            <div className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
              <span className="font-roboto text-[clamp(10px,3vw,11px)] text-[#262522] tracking-[0.02em] uppercase font-medium">
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes} MIN · {recipe.difficulty} ·{' '}
                {recipe.servings ?? 2} SERVES
              </span>
              <button
                className="
                  h-8 px-[18px] rounded-full border border-[#2625223D] bg-white
                  font-roboto font-semibold text-[clamp(10px,3vw,11px)] tracking-[0.08em] uppercase
                  text-[#262522] whitespace-nowrap cursor-pointer
                  transition-all duration-200 hover:bg-[#F29C33] hover:text-white hover:border-[#F29C33]
                "
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};