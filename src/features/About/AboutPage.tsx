// AboutPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedRecipes } from './components/FeaturedRecipes';
import { useRecipes } from './hooks/useRecipes';
import { homeService } from './services/AboutService';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { recipes, loading, error } = useRecipes(6);
  const aboutData = homeService.getAboutData();
  
  // State للمفضلة
  const [favorites, setFavorites] = useState<number[]>([]);

  // تحميل المفضلة من localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // دالة toggleFavorite
  const toggleFavorite = (recipeId: number) => {
    let newFavorites: number[];
    if (favorites.includes(recipeId)) {
      newFavorites = favorites.filter(id => id !== recipeId);
    } else {
      newFavorites = [...favorites, recipeId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // دالة للذهاب لصفحة الوصفة
  const handleRecipeClick = (recipeId: number) => {
    // حفظ في recent recipes
    const recent = JSON.parse(localStorage.getItem('recentRecipes') || '[]');
    const newRecent = [recipeId, ...recent.filter((id: number) => id !== recipeId)].slice(0, 10);
    localStorage.setItem('recentRecipes', JSON.stringify(newRecent));
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <main className="main-content">
      <HeroSection title={aboutData.heroTitle} />
      <AboutSection content={aboutData.aboutContent} chefName={aboutData.signatureChef} />
      <FeaturedRecipes 
        recipes={recipes} 
        loading={loading} 
        error={error}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onRecipeClick={handleRecipeClick}
      />
    </main>
  );
};