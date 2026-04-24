// src/routes.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AboutPage } from './features/About/AboutPage';
// @ts-ignore
import Home from './features/About/pages/Home';
import Navbar from './shared/layout/Navbar';  

// Layout component
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

// Placeholder components
const RecipesPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">All Recipes</h2>
      <p className="text-gray-600 mt-4">Coming soon...</p>
    </div>
  </div>
);

const TipsPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">Cooking Tips</h2>
      <p className="text-gray-600 mt-4">Coming soon...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'tips', element: <TipsPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);