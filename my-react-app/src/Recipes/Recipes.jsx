// D:\course guru\Cooking_task\Cooking-and-Recipes-Blog\my-react-app\src\Recipes\Recipes.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Recipes.css';

// استيراد الصور من assets
import firstCard from '../assets/first card.png';
import secCard from '../assets/sec-card.png';
import thiCard from '../assets/thi-card.png';
import forthCard from '../assets/forth-card.png';
import fifCard from '../assets/fif-card.png';
import sixCard from '../assets/six-card.png';

const allRecipesData = [
    { id: 1, title: "Savory Herb-Infused Chicken", desc: "Indulge in the rich and savory symphony of flavors with our Savory Herb-Infused Chicken.", info: "40 MIN - EASY PREP - 3 SERVES", img: firstCard },
    { id: 2, title: "Lemon Garlic Grilled Chicken", desc: "Experience the perfect blend of zesty lemon and aromatic garlic with this roasted chicken recipe.", info: "1 HOUR - HARD PREP - 4 SERVES", img: secCard },
    { id: 3, title: "Quinoa Veggie Stir-Fry", desc: "Quick, wholesome, and bursting with flavors, it's perfect for a healthy weeknight dinner.", info: "30 MIN - EASY PREP - 3 SERVES", img: thiCard },
    { id: 4, title: "Berry Bliss Smoothie Bowl", desc: "This berry smoothie bowl is not only visually appealing but also a powerhouse of antioxidants.", info: "10 MIN - EASY PREP - 2 SERVES", img: forthCard },
    { id: 5, title: "Spaghetti Aglio e Olio", desc: "A minimalist yet flavorful dish with garlic, olive oil, and a hint of red pepper flakes.", info: "20 MIN - EASY PREP - 2 SERVES", img: fifCard },
    { id: 6, title: "Grilled Veggies with Sauce", desc: "Served with a zesty chimichurri sauce it's a perfect addition to your outdoor gatherings.", info: "25 MIN - MEDIUM PREP - 6 SERVES", img: sixCard },
];

const Recipes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [filteredRecipes, setFilteredRecipes] = useState(allRecipesData);
    const [searchQuery, setSearchQuery] = useState('');
    
    // استخراج معامل البحث من URL عند تحميل الصفحة أو تغييرها
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('search') || '';
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setFilteredRecipes(allRecipesData);
        } else {
            const filtered = allRecipesData.filter(recipe =>
                recipe.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredRecipes(filtered);
        }
    }, [location.search]);

    // دالة للتعامل مع الضغط على VIEW RECIPE
    const handleViewRecipe = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div className="page-wrapper">
            <header className="main-header">
                <h1>
                    DISPLAYING RESULTS FOR: 
                    <span className="highlight">
                        {searchQuery ? searchQuery.toUpperCase() : "ALL RECIPES"}
                    </span>
                </h1>
                <p className="results-count">
                    {filteredRecipes.length} {filteredRecipes.length === 1 ? 'RECIPE' : 'RECIPES'} FOUND
                </p>
            </header>

            <main className="recipes-grid">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <div className="image-container">
                                <img src={recipe.img} alt={recipe.title} />
                            </div>
                            <div className="card-content">
                                <h3>{recipe.title}</h3>
                                <p>{recipe.desc}</p>
                                <div className="card-footer">
                                    <span className="meta">{recipe.info}</span>
                                    <button 
                                        className="view-recipe"
                                        onClick={() => handleViewRecipe(recipe.id)}
                                    >
                                        VIEW RECIPE
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No recipes found matching "{searchQuery}"</p>
                        <button 
                            className="clear-search"
                            onClick={() => navigate('/recipes')}
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Recipes;