// src/routes.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AboutPage } from './features/About/AboutPage';
// @ts-ignore
import Home from './features/About/pages/Home';
import Navbar from './shared/layout/Navbar';
// @ts-ignore
import Login from './login/login';
// @ts-ignore
import RecipePage from './CookingRecipe/RecipePage';
// @ts-ignore
import Products from './CookingTips/products';
// @ts-ignore
import Banner from './components/Banner'; 
// @ts-ignore
import Footer from './components/Footer';  

// Layout component with Navbar, Banner, and Footer
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Banner />  
      <Footer />   
    </>
  );
};

// Blank layout for login page (no navbar, banner, footer)
const BlankLayout = () => {
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recipes', element: <Products /> },
      { path: 'tips', element: <Products /> },
      { path: 'recipe/:id', element: <RecipePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    path: '/login',
    element: <BlankLayout />,
    children: [
      { index: true, element: <Login /> },
    ],
  },
]);