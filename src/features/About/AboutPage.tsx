import React from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedRecipes } from './components/FeaturedRecipes';
import { useRecipes } from './hooks/useRecipes';
import { homeService } from './services/AboutService';

export const AboutPage: React.FC = () => {
  const { recipes, loading, error } = useRecipes(6);
  const aboutData = homeService.getAboutData();

  return (
    <main className="mt-10 px-4 max-w-6xl mx-auto">
      <HeroSection title={aboutData.heroTitle} />
      <AboutSection content={aboutData.aboutContent} chefName={aboutData.signatureChef} />
      <FeaturedRecipes recipes={recipes} loading={loading} error={error} />
    </main>
  );
};

