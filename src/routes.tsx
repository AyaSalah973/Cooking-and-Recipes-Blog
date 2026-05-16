import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AboutPage } from './features/About/AboutPage';
// @ts-ignore
import Home from './features/About/pages/Home';
import Navbar from './shared/layout/Navbar';
// @ts-ignore
import Login from './features/login/login';
// @ts-ignore
import Register from './features/register/Register';
// @ts-ignore
import Profile from './features/profile/Profile';
// @ts-ignore
import RecipePage from './CookingRecipe/RecipePage';
// @ts-ignore
import Products from './CookingTips/products';
// @ts-ignore
import RecipesSearch from "./features/About/pages/RecipesSearch";// @ts-ignore
import Banner from './components/Banner'; 
// @ts-ignore
import Footer from './components/Footer';  

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
const ProfileLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />   {/* بس Footer من غير Banner */}
    </>
  );
};

const BlankLayout = () => {
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'recipes', element: <RecipesSearch /> }, // ← غيرنا هنا
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
  {
    path: '/profile',
    element: <ProfileLayout />,  // ✅ Layout مخصص من غير Banner
    children: [
      { index: true, element: <Profile /> },
    ],
  },
  {  // 👈 قسم جديد لصفحة التسجيل
    path: '/register',
    element: <BlankLayout />,
    children: [
      { index: true, element: <Register /> },
    ],
  },
]);