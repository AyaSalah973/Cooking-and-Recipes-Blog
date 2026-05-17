// src/features/profile/Profile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import { 
  User, Mail, Heart, Clock, LogOut, 
  ChefHat, Utensils, Sparkles, TrendingUp,
  BookOpen, Star, Flame, X 
} from 'lucide-react';
import SmartCookingMode from './SmartCookingMode';
import SmartCookingModeTab from './SmartCookingModeTab';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [favorites, setFavorites] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recentRecipesData, setRecentRecipesData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);
  const [error, setError] = useState('');
  const [showSmartMode, setShowSmartMode] = useState(false);
  const [selectedRecipeForSmartMode, setSelectedRecipeForSmartMode] = useState(null);
  
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearType, setClearType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const fetchAllRecipes = async () => {
    try {
      const response = await fetch('https://dummyjson.com/recipes?limit=100');
      const data = await response.json();
      setAllRecipes(data.recipes);

      const savedFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavs);
      const favRecipes = data.recipes.filter(recipe => savedFavs.includes(recipe.id));
      setFavoriteRecipes(favRecipes);

      const recent = JSON.parse(localStorage.getItem('recentRecipes') || '[]');
      const recentRecipesDataMapped = recent.map(id => data.recipes.find(r => r.id === id)).filter(Boolean);
      setRecentRecipesData(recentRecipesDataMapped);

      const shuffled = [...data.recipes].sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initProfile = async () => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/login');
        return;
      }
      setUser(JSON.parse(userData));
      await fetchAllRecipes();
    };
    
    initProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleIngredientSearch = async () => {
    if (!availableIngredients.trim()) return;
    
    const userIngredients = availableIngredients
      .toLowerCase()
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);
    
    if (userIngredients.length === 0) {
      setError('Please enter at least one ingredient');
      return;
    }
    
    const matched = allRecipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase());
      
      let foundCount = 0;
      const missingList = [];
      
      recipeIngredients.forEach(ri => {
        const isFound = userIngredients.some(ui => ri.includes(ui));
        if (isFound) {
          foundCount++;
        } else {
          missingList.push(ri);
        }
      });
      
      const userMatchPercentage = (foundCount / userIngredients.length) * 100;
      const recipeMatchPercentage = (foundCount / recipeIngredients.length) * 100;
      
      let finalScore;
      
      if (userMatchPercentage >= 100) {
        finalScore = 100 + recipeMatchPercentage;
      } else if (userMatchPercentage >= 50) {
        finalScore = 70 + recipeMatchPercentage;
      } else if (userMatchPercentage >= 25) {
        finalScore = 40 + recipeMatchPercentage;
      } else {
        finalScore = recipeMatchPercentage;
      }
      
      const bonus = recipeIngredients.length <= 5 ? 15 : 0;
      const missingBonus = missingList.length <= 2 ? 10 : 0;
      
      finalScore = Math.min(finalScore + bonus + missingBonus, 100);
      
      return {
        ...recipe,
        foundCount,
        totalRecipeIngredients: recipeIngredients.length,
        missingCount: missingList.length,
        missingList: missingList.slice(0, 5),
        userMatchPercentage: Math.round(userMatchPercentage),
        recipeMatchPercentage: Math.round(recipeMatchPercentage),
        finalScore: Math.round(finalScore)
      };
    });
    
    const filtered = matched
      .filter(recipe => recipe.foundCount >= 1)
      .sort((a, b) => {
        if (a.finalScore !== b.finalScore) {
          return b.finalScore - a.finalScore;
        }
        return a.totalRecipeIngredients - b.totalRecipeIngredients;
      });
    
    setSmartSuggestions(filtered.slice(0, 8));
    setError('');
  };

  const toggleFavorite = (recipeId) => {
    let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favs.includes(recipeId)) {
      favs = favs.filter(id => id !== recipeId);
    } else {
      favs.push(recipeId);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    setFavorites(favs);
    const updatedFavRecipes = allRecipes.filter(recipe => favs.includes(recipe.id));
    setFavoriteRecipes(updatedFavRecipes);
  };

  const addToRecent = (recipeId) => {
    let recent = JSON.parse(localStorage.getItem('recentRecipes') || '[]');
    recent = [recipeId, ...recent.filter(id => id !== recipeId)].slice(0, 10);
    localStorage.setItem('recentRecipes', JSON.stringify(recent));
    const updatedRecent = recent.map(id => allRecipes.find(r => r.id === id)).filter(Boolean);
    setRecentRecipesData(updatedRecent);
  };

  const handleDeleteSingleFavorite = () => {
    if (recipeToDelete) {
      toggleFavorite(recipeToDelete);
      setShowDeleteModal(false);
      setRecipeToDelete(null);
    }
  };

  const RecipeCard = ({ recipe, showDelete = false, matchData = null }) => (
    <div className={styles['recipe-card']}>
      <button 
        className={styles['favorite-btn-top']}
        onClick={() => toggleFavorite(recipe.id)}
      >
        <Heart 
          size={20} 
          fill={favorites.includes(recipe.id) ? '#EE6352' : 'none'} 
          color={favorites.includes(recipe.id) ? '#EE6352' : 'white'} 
        />
      </button>
      
      {showDelete && (
        <button 
          className={styles['delete-btn-top']}
          onClick={() => {
            setRecipeToDelete(recipe.id);
            setShowDeleteModal(true);
          }}
        >
          <X size={16} color="white" />
        </button>
      )}
      
      {matchData && (
        <div className={
          matchData.finalScore >= 80 ? styles['match-badge-excellent'] :
          matchData.finalScore >= 60 ? styles['match-badge-good'] :
          styles['match-badge-fair']
        }>
          {matchData.finalScore >= 80 ? '🌟 Excellent Match' :
           matchData.finalScore >= 60 ? '👍 Good Match' :
           '📝 Fair Match'}
          <span className={styles['match-percent']}>{matchData.finalScore}%</span>
        </div>
      )}
      
      <img 
        src={recipe.image} 
        alt={recipe.name} 
        onClick={() => {
          addToRecent(recipe.id);
          navigate(`/recipe/${recipe.id}`);
        }}
      />
      
      <div className={styles['card-content']}>
        <h3 onClick={() => {
          addToRecent(recipe.id);
          navigate(`/recipe/${recipe.id}`);
        }}>{recipe.name}</h3>
        
        <div className={styles['card-meta']}>
          <span><Clock size={14} /> {recipe.prepTimeMinutes} min</span>
          <span><Utensils size={14} /> {recipe.servings} serves</span>
          <span className={styles.difficulty}>{recipe.difficulty}</span>
        </div>
        
        <p className={styles['card-description']}>
          {recipe.instructions?.[0]?.slice(0, 80)}...
        </p>
        
        {matchData && (
          <div className={styles['match-stats']}>
            <div className={styles['stat-row']}>
              <span>📦 You have:</span>
              <strong>{matchData.foundCount}/{matchData.totalRecipeIngredients} ingredients</strong>
            </div>
            <div className={styles['stat-row']}>
              <span>🎯 Match with your items:</span>
              <strong>{matchData.userMatchPercentage}%</strong>
            </div>
          </div>
        )}
        
        {matchData?.missingList?.length > 0 && matchData.missingList.length <= 3 && (
          <div className={styles['missing-ingredients']}>
            <span className={styles['missing-label']}>🛒 You'll also need:</span>
            <div className={styles['missing-tags']}>
              {matchData.missingList.map((ing, i) => (
                <span key={i} className={styles['missing-tag']}>{ing}</span>
              ))}
            </div>
          </div>
        )}
        
        {matchData?.missingList?.length > 3 && (
          <div className={styles['missing-ingredients']}>
            <span className={styles['missing-label']}>🛒 You'll need {matchData.missingCount} more ingredients</span>
          </div>
        )}
        
        <div className={styles['card-footer']}>
          <div className={styles['tags']}>
            {recipe.mealType?.slice(0, 2).map((type, i) => (
              <span key={i} className={styles.tag}>{type}</span>
            ))}
          </div>
          
          <button 
            className={styles['view-btn']}
            onClick={() => {
              addToRecent(recipe.id);
              navigate(`/recipe/${recipe.id}`);
            }}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className={styles.loading}>Loading your profile...</div>;
  if (!user) return null;

  return (
    <div className={styles['profile-page']}>
      <div className={styles.container}>
        
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles['user-avatar']}>
            <img src={user.image || 'https://via.placeholder.com/120'} alt={user.username} />
            <h3>{user.firstName} {user.lastName}</h3>
            <p>@{user.username}</p>
          </div>
          
          <nav className={styles['sidebar-nav']}>
            <button className={activeTab === 'profile' ? styles.active : ''} onClick={() => setActiveTab('profile')}>
              <User size={18} /> My Profile
            </button>
            <button className={activeTab === 'cook' ? styles.active : ''} onClick={() => setActiveTab('cook')}>
              <ChefHat size={18} /> Cook from Ingredients
            </button>
            <button className={activeTab === 'smart' ? styles.active : ''} onClick={() => setActiveTab('smart')}>
              <Sparkles size={18} /> Smart Cooking Mode
            </button>
            <button className={activeTab === 'recommendations' ? styles.active : ''} onClick={() => setActiveTab('recommendations')}>
              <TrendingUp size={18} /> Recommendations
            </button>
            <button className={activeTab === 'favorites' ? styles.active : ''} onClick={() => setActiveTab('favorites')}>
              <Heart size={18} /> Favorites ({favoriteRecipes.length})
            </button>
            <button className={activeTab === 'recent' ? styles.active : ''} onClick={() => setActiveTab('recent')}>
              <Clock size={18} /> Recent ({recentRecipesData.length})
            </button>
          </nav>
          
          <button className={styles['logout-btn']} onClick={handleLogout}>
            <LogOut size={18} /> Sign Out
          </button>
        </aside>

        {/* Main Content */}
        <main className={styles['main-content']}>
          
          {/* My Profile Tab */}
          {activeTab === 'profile' && (
            <div className={styles.tab}>
              <h1>My Profile</h1>
              <div className={styles['profile-info']}>
                <div className={styles['info-card']}>
                  <label><Mail size={16} /> Email</label>
                  <p>{user.email}</p>
                </div>
                <div className={styles['info-card']}>
                  <label><User size={16} /> Username</label>
                  <p>{user.username}</p>
                </div>
                <div className={styles['info-card']}>
                  <label><Heart size={16} /> Favorites</label>
                  <p>{favoriteRecipes.length} saved recipes</p>
                </div>
                <div className={styles['info-card']}>
                  <label><Clock size={16} /> Recent</label>
                  <p>{recentRecipesData.length} recipes viewed</p>
                </div>
              </div>
              
              <div className={styles['stats-grid']}>
                <div className={styles.stat}>
                  <Flame size={28} color="#F29C33" />
                  <strong>{recentRecipesData.length}</strong>
                  <span>Recipes Viewed</span>
                </div>
                <div className={styles.stat}>
                  <Star size={28} color="#F29C33" />
                  <strong>{favoriteRecipes.length}</strong>
                  <span>Favorites</span>
                </div>
                <div className={styles.stat}>
                  <BookOpen size={28} color="#F29C33" />
                  <strong>{recommendations.length}</strong>
                  <span>Recommendations</span>
                </div>
              </div>
            </div>
          )}

          {/* Cook from Ingredients Tab */}
          {activeTab === 'cook' && (
            <div className={styles.tab}>
              <h1>🍳 Cook from Ingredients</h1>
              <p className={styles.tabDesc}>
                Enter the ingredients you have, and I'll find recipes you can make!
              </p>
              
              <div className={styles['info-banner']}>
                <span>💡</span>
                <p>Just type your ingredients separated by commas. The more you add, the better matches you'll get!</p>
              </div>
              
              <div className={styles['ingredient-input']}>
                <textarea
                  placeholder="Enter your ingredients separated by commas...
Example: chicken, tomato, onion, garlic, rice"
                  value={availableIngredients}
                  onChange={(e) => setAvailableIngredients(e.target.value)}
                  rows={4}
                />
                <button onClick={handleIngredientSearch}>
                  <ChefHat size={18} /> Find Recipes
                </button>
              </div>
              
              {availableIngredients.trim() && (
                <div className={styles['ingredients-count']}>
                  📝 You entered: {availableIngredients.split(',').filter(i => i.trim()).length} ingredients
                </div>
              )}
              
              {error && <div className={styles['error-message']}>{error}</div>}
              
              {smartSuggestions.length > 0 && (
                <div className={styles['suggestions-grid']}>
                  <div className={styles['results-header']}>
                    <h3>🍽️ Recipes you can make:</h3>
                    <p className={styles['results-count']}>{smartSuggestions.length} recipes found</p>
                  </div>
                  <div className={styles['favorites-grid']}>
                    {smartSuggestions.map(recipe => (
                      <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
                        matchData={{
                          finalScore: recipe.finalScore,
                          userMatchPercentage: recipe.userMatchPercentage,
                          recipeMatchPercentage: recipe.recipeMatchPercentage,
                          missingList: recipe.missingList,
                          foundCount: recipe.foundCount,
                          totalRecipeIngredients: recipe.totalRecipeIngredients
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {smartSuggestions.length === 0 && availableIngredients.trim() && !error && (
                <div className={styles['no-results']}>
                  <ChefHat size={48} strokeWidth={1.5} />
                  <h3>No recipes found</h3>
                  <p>Try adding more ingredients or check your spelling.</p>
                  <div className={styles['suggested-ingredients']}>
                    <span>Popular ingredients to try:</span>
                    <div className={styles['suggested-tags']}>
                      {['chicken', 'rice', 'tomato', 'onion', 'garlic', 'pasta'].map(ing => (
                        <button 
                          key={ing}
                          onClick={() => {
                            const newValue = availableIngredients ? `${availableIngredients}, ${ing}` : ing;
                            setAvailableIngredients(newValue);
                          }}
                        >
                          + {ing}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Smart Cooking Mode Tab */}
          {activeTab === 'smart' && (
            <SmartCookingModeTab 
              recentRecipesData={recentRecipesData}
              onSelectRecipe={(recipe) => {
                setSelectedRecipeForSmartMode(recipe);
                setShowSmartMode(true);
              }}
            />
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className={styles.tab}>
              <h1>✨ Personalized Recommendations</h1>
              <p className={styles.tabDesc}>Based on your cooking history and preferences</p>
              
              <div className={styles['favorites-grid']}>
                {recommendations.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className={styles.tab}>
              <div className={styles['tab-header']}>
                <div>
                  <h1> Your Favorite Recipes</h1>
                  <p className={styles.tabDesc}>{favoriteRecipes.length} recipes saved to your collection</p>
                </div>
                {favoriteRecipes.length > 0 && (
                  <button 
                    className={styles['clear-all-btn']}
                    onClick={() => {
                      setClearType('favorites');
                      setShowClearModal(true);
                    }}
                  >
                    <X size={16} /> Clear All
                  </button>
                )}
              </div>
              
              {favoriteRecipes.length === 0 ? (
                <div className={styles['empty-favorites']}>
                  <Heart size={64} strokeWidth={1.5} />
                  <h3>No favorites yet</h3>
                  <p>Save recipes you love and build your own delicious collection.</p>
                  <button 
                    className={styles['explore-btn']}
                    onClick={() => navigate('/recipes')}
                  >
                    EXPLORE RECIPES →
                  </button>
                </div>
              ) : (
                <div className={styles['favorites-grid']}>
                  {favoriteRecipes.map(recipe => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      showDelete={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recent Tab */}
          {activeTab === 'recent' && (
            <div className={styles.tab}>
              <div className={styles['tab-header']}>
                <div>
                  <h1>Recently Viewed</h1>
                  <p className={styles.tabDesc}>{recentRecipesData.length} recipes in your history</p>
                </div>
                {recentRecipesData.length > 0 && (
                  <button 
                    className={styles['clear-all-btn']}
                    onClick={() => {
                      setClearType('recent');
                      setShowClearModal(true);
                    }}
                  >
                    <X size={16} /> Clear All
                  </button>
                )}
              </div>
              
              {recentRecipesData.length === 0 ? (
                <div className={styles['empty-favorites']}>
                  <Clock size={64} strokeWidth={1.5} />
                  <h3>No recent recipes</h3>
                  <p>Start exploring recipes and they will appear here.</p>
                  <button 
                    className={styles['explore-btn']}
                    onClick={() => navigate('/recipes')}
                  >
                    EXPLORE RECIPES →
                  </button>
                </div>
              ) : (
                <div className={styles['favorites-grid']}>
                  {recentRecipesData.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Smart Cooking Mode Modal */}
      {showSmartMode && selectedRecipeForSmartMode && (
        <SmartCookingMode 
          recipe={selectedRecipeForSmartMode}
          onClose={() => {
            setShowSmartMode(false);
            setSelectedRecipeForSmartMode(null);
          }}
        />
      )}

      {/* Clear All Confirmation Modal */}
      {showClearModal && (
        <div className={styles['modal-overlay']} onClick={() => setShowClearModal(false)}>
          <div className={styles['modal-container']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['modal-icon']}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r="0.5" fill="#dc2626" stroke="none" />
              </svg>
            </div>
            <h3 className={styles['modal-title']}>Clear {clearType === 'favorites' ? 'Favorites' : 'History'}?</h3>
            <p className={styles['modal-message']}>
              {clearType === 'favorites' 
                ? 'Are you sure you want to remove all your favorite recipes? This action cannot be undone.'
                : 'Are you sure you want to clear your viewing history? This action cannot be undone.'}
            </p>
            <div className={styles['modal-buttons']}>
              <button 
                className={styles['modal-cancel']}
                onClick={() => setShowClearModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles['modal-confirm']}
                onClick={() => {
                  if (clearType === 'favorites') {
                    localStorage.setItem('favorites', JSON.stringify([]));
                    setFavorites([]);
                    setFavoriteRecipes([]);
                  } else if (clearType === 'recent') {
                    localStorage.setItem('recentRecipes', JSON.stringify([]));
                    setRecentRecipesData([]);
                  }
                  setShowClearModal(false);
                  setClearType(null);
                }}
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles['modal-overlay']} onClick={() => setShowDeleteModal(false)}>
          <div className={styles['modal-container']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['modal-icon']}>
              <Heart size={48} strokeWidth={1.5} color="#dc2626" />
            </div>
            <h3 className={styles['modal-title']}>Remove from Favorites?</h3>
            <p className={styles['modal-message']}>
              This recipe will be removed from your favorites. You can always add it back later.
            </p>
            <div className={styles['modal-buttons']}>
              <button 
                className={styles['modal-cancel']}
                onClick={() => {
                  setShowDeleteModal(false);
                  setRecipeToDelete(null);
                }}
              >
                Cancel
              </button>
              <button 
                className={styles['modal-confirm']}
                onClick={handleDeleteSingleFavorite}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;