import React from 'react';
import './Recipes.css';

// استيراد الصور من assets
import firstCard from '../assets/first card.png';
import secCard from '../assets/sec-card.png';
import thiCard from '../assets/thi-card.png';
import forthCard from '../assets/forth-card.png';
import fifCard from '../assets/fif-card.png';
import sixCard from '../assets/six-card.png';

// استيراد الأيقونات
import Logo from '../assets/Logo.svg';
//import facebookIcon from '../assets/facebook.svg';
//import instaIcon from '../assets/insta.svg';
//import tiktokIcon from '../assets/tiktok.svg';
//import youtubeIcon from '../assets/youtube.svg';

const recipesData = [
    { title: "Savory Herb-Infused Chicken", desc: "Indulge in the rich and savory symphony of flavors with our Savory Herb-Infused Chicken.", info: "40 MIN - EASY PREP - 3 SERVES", img: firstCard },
    { title: "Lemon Garlic Grilled Chicken", desc: "Experience the perfect blend of zesty lemon and aromatic garlic with this roasted chicken recipe.", info: "1 HOUR - HARD PREP - 4 SERVES", img: secCard },
    { title: "Quinoa Veggie Stir-Fry", desc: "Quick, wholesome, and bursting with flavors, it's perfect for a healthy weeknight dinner.", info: "30 MIN - EASY PREP - 3 SERVES", img: thiCard },
    { title: "Berry Bliss Smoothie Bowl", desc: "This berry smoothie bowl is not only visually appealing but also a powerhouse of antioxidants.", info: "10 MIN - EASY PREP - 2 SERVES", img: forthCard },
    { title: "Spaghetti Aglio e Olio", desc: "A minimalist yet flavorful dish with garlic, olive oil, and a hint of red pepper flakes.", info: "20 MIN - EASY PREP - 2 SERVES", img: fifCard },
    { title: "Grilled Veggies with Sauce", desc: "Served with a zesty chimichurri sauce it's a perfect addition to your outdoor gatherings.", info: "25 MIN - MEDIUM PREP - 6 SERVES", img: sixCard },
];

const Recipes = () => {
return (
    <div className="page-wrapper">
    <header className="main-header">
        <h1>DISPLAYING RESULTS FOR: <span className="highlight">MA</span></h1>
        <p className="results-count">12 RECIPES FOUND</p>
    </header>

    <main className="recipes-grid">
        {recipesData.map((recipe, index) => (
        <div key={index} className="recipe-card">
            <div className="image-container">
            <img src={recipe.img} alt={recipe.title} />
            </div>
            <div className="card-content">
            <h3>{recipe.title}</h3>
        <p>{recipe.desc}</p>
            <div className="card-footer">
                <span className="meta">{recipe.info}</span>
                <button className="view-recipe">VIEW RECIPE</button>
            </div>
            </div>
            </div>
        ))}
    </main>
    </div>
);
};

export default Recipes;