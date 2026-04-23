import { createBrowserRouter } from 'react-router-dom';

import { AboutPage } from './features/About/AboutPage';

// Placeholder components for other pages
// eslint-disable-next-line react-refresh/only-export-components
const RecipesPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">All Recipes</h2>
      <p className="text-gray-600 mt-4">Coming soon...</p>
    </div>
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
const ContactPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
      <p className="text-gray-600 mt-4">Coming soon...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AboutPage />,
    children: [
      { index: true, element: <AboutPage /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);