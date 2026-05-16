// src/features/profile/SmartCookingModeTab.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SmartCookingModeTab.module.css';
import { Sparkles } from 'lucide-react';

const SmartCookingModeTab = ({ recentRecipesData, onSelectRecipe }) => {
  const navigate = useNavigate();
  const [smartMode, setSmartMode] = useState(false);

  return (
    <div className={styles.tab}>
      {/* Header */}
      <div className={styles['smart-header']}>
        <div className={styles['smart-title']}>
          <h1>🧠 Smart Cooking Mode</h1>
          <p className={styles['smart-subtitle']}>Your AI-powered cooking assistant</p>
        </div>
        
        {/* Toggle Switch */}
        <div className={styles['mode-toggle']}>
          <span className={smartMode ? styles['toggle-on'] : styles['toggle-off']}>
            {smartMode ? 'AI Assistant ON' : 'AI Assistant OFF'}
          </span>
          <button 
            className={`${styles['toggle-btn']} ${smartMode ? styles.active : ''}`}
            onClick={() => setSmartMode(!smartMode)}
          >
            <div className={styles['toggle-slider']} />
          </button>
        </div>
      </div>
      
      <p className={styles.tabDesc}>
        Get step-by-step guidance, cooking tips, and smart suggestions while you cook.
      </p>

      {/* Smart Features Grid */}
      <div className={styles['smart-features']}>
        <div className={styles['feature-card']}>
          <div className={styles['feature-icon']}>🎯</div>
          <h3>Step-by-Step Guidance</h3>
          <p>Follow along with interactive cooking instructions</p>
          <div className={styles['feature-tag']}>Interactive</div>
        </div>
        <div className={styles['feature-card']}>
          <div className={styles['feature-icon']}>⏱️</div>
          <h3>Smart Timers</h3>
          <p>Automatic timers for each cooking step</p>
          <div className={styles['feature-tag']}>Precision</div>
        </div>
        <div className={styles['feature-card']}>
          <div className={styles['feature-icon']}>💡</div>
          <h3>Pro Tips</h3>
          <p>Get expert advice while you cook</p>
          <div className={styles['feature-tag']}>Expert</div>
        </div>
        <div className={styles['feature-card']}>
          <div className={styles['feature-icon']}>🔄</div>
          <h3>Substitutions</h3>
          <p>Smart ingredient alternatives</p>
          <div className={styles['feature-tag']}>Flexible</div>
        </div>
      </div>

      {/* Smart Mode Active */}
      {smartMode && (
        <div className={styles['smart-active']}>
          <div className={styles['smart-active-header']}>
            <span className={styles['pulse-dot']}></span>
            <h3>Smart Assistant is Active</h3>
          </div>
          <p>Choose a recipe to start guided cooking mode</p>
          
          {recentRecipesData.length > 0 ? (
            <div className={styles['recipe-options']}>
              <h4>📋 Your Recent Recipes</h4>
              <div className={styles['recent-cooking']}>
                {recentRecipesData.slice(0, 4).map(recipe => (
                  <button 
                    key={recipe.id} 
                    className={styles['cook-btn']} 
                    onClick={() => {
                      onSelectRecipe(recipe);
                      setSmartMode(false);
                    }}
                  >
                    <img src={recipe.image} alt={recipe.name} className={styles['cook-btn-img']} />
                    <span>{recipe.name}</span>
                    <Sparkles size={14} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles['no-recent-recipes']}>
              <p>📭 No recipes viewed yet</p>
              <button 
                className={styles['browse-btn']}
                onClick={() => navigate('/recipes')}
              >
                Browse Recipes →
              </button>
            </div>
          )}
          
          <div className={styles['smart-tip']}>
            <span>💡</span>
            <p>Tip: The more you cook, the better your recommendations become!</p>
          </div>
        </div>
      )}

      {/* Smart Mode Inactive */}
      {!smartMode && (
        <div className={styles['smart-inactive']}>
          <div className={styles['inactive-icon']}>🧠</div>
          <h3>Ready to start smart cooking?</h3>
          <p>Turn on the AI Assistant to get step-by-step guidance, timers, and pro tips while you cook.</p>
          <button 
            className={styles['activate-btn']}
            onClick={() => setSmartMode(true)}
          >
            Activate Smart Mode →
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartCookingModeTab;