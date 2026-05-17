// src/components/Navbar.tsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiMoon, FiSun, FiUser, FiChevronDown, FiHeart, FiLogOut, FiClock, FiChevronRight, FiCompass, FiTrendingUp, FiZap, FiUserCheck, FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import logo from "../../assets/Logo (1).svg";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData) as User;
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setProfileDropdownOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  const { t, i18n } = useTranslation();

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  /* FETCH RECIPES */
  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=50")
      .then((res) => res.json())
      .then((data) => setAllRecipes(data.recipes));
  }, []);

  /* GOOGLE TRANSLATE */
  useEffect(() => {
    const addGoogleTranslate = () => {
      if (!document.getElementById("google_translate_script")) {
        const script = document.createElement("script");
        script.id = "google_translate_script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    };
    addGoogleTranslate();
  }, []);

  /* SEARCH */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim()) {
      const filtered = allRecipes.filter((recipe: any) =>
        recipe.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowOverlay(true);
    } else {
      setSearchResults([]);
      setShowOverlay(false);
    }
  };

  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
    setShowOverlay(false);
    setSearchInput("");
    setSearchResults([]);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSearchInput("");
    setSearchResults([]);
  };

  const toggleDarkMode = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    }
    setProfileDropdownOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    if (lang === "en") {
      document.cookie = "googtrans=/ar/en";
    } else {
      document.cookie = "googtrans=/en/ar";
    }
    window.location.reload();
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  const handleProfileNavigation = (tab: string) => {
    navigate('/profile', { state: { activeTab: tab } });
    setProfileDropdownOpen(false);
  };

  const links = [
    { name: t("home"), path: "/" },
    { name: t("recipes"), path: "/recipes" },
    { name: t("cookingTips"), path: "/tips" },
    { name: t("aboutUs"), path: "/about" },
  ];

  const handleRecipesClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      if (data.recipes && data.recipes.length > 0) {
        navigate(`/recipe/${data.recipes[0].id}`);
      }
    } catch {
      navigate("/recipes");
    }
    setMenuOpen(false);
  };

  const isActiveLink = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/recipes" && location.pathname.startsWith("/recipe")) return true;
    if (path === "/tips") return location.pathname === "/tips";
    if (path === "/about") return location.pathname === "/about";
    return false;
  };

  // Profile navigation items for dropdown (including Dark Mode and Language)
  const profileNavItems = [
    { id: 'profile', name: 'My Profile', icon: <FiUserCheck size={18} /> },
    
  ];

  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar">
          {/* LEFT */}
          <div className="navbar-left">
            <div className="logo-icon">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <span className="logo-text">
              Cooks
              <br />
              Delight
            </span>
          </div>

          {/* CENTER */}
          <div className="navbar-links">
            {links.map((link) => {
              if (link.path === "/recipes") {
                return (
                  <a
                    key={link.path}
                    href="#"
                    onClick={handleRecipesClick}
                    className={isActiveLink(link.path) ? "nav-link active" : "nav-link"}
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={isActiveLink(link.path) ? "nav-link active" : "nav-link"}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* RIGHT - تم إزالة Dark Mode و Language Switch من هنا */}
          <div className="navbar-right">
            {/* SEARCH BOX */}
            <div className="search-box">
              <button className="search-icon-btn" title="Search" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="#262522" strokeWidth="2" />
                  <path d="M12 12L16 16" stroke="#262522" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <input
                type="text"
                placeholder={t("searchRecipes")}
                value={searchInput}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>

            {/* Mobile Search Icon */}
            <button className="mobile-search-icon" onClick={() => setShowOverlay(true)} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Profile Dropdown - يحتوي على كل شيء: Profile Options + Dark Mode + Language + Logout */}
            {isAuthenticated && (
              <div className="navbar-profile desktop-only" ref={profileDropdownRef}>
                <button
                  type="button"
                  className="navbar-profile-trigger"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={profileDropdownOpen}
                  aria-label="Open profile menu"
                >
                  <img
                    src={user?.image || 'https://via.placeholder.com/32'}
                    alt="avatar"
                    className="navbar-avatar"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const fallback = img.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="navbar-avatar-fallback" style={{ display: "none" }}>
                    {user?.username?.slice(0, 2).toUpperCase() || 'U'}
                  </div>
                  <FiChevronDown className={`navbar-profile-chevron ${profileDropdownOpen ? "open" : ""}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="navbar-profile-dropdown" role="menu">
                    {/* User Info Header */}
                    <div className="profile-dropdown-header">
                      <img src={user?.image || 'https://via.placeholder.com/48'} alt={user?.username} className="dropdown-avatar" />
                      <div className="dropdown-user-info">
                        <span className="dropdown-user-name">{user?.firstName} {user?.lastName}</span>
                        <span className="dropdown-user-email">{user?.email}</span>
                      </div>
                    </div>
                    
                    <div className="profile-dropdown-divider" />
                    
                    {/* Profile Navigation Items */}
                    {profileNavItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="profile-dropdown-item"
                        onClick={() => handleProfileNavigation(item.id)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </button>
                    ))}
                    
                    <div className="profile-dropdown-divider" />
                    
                    {/* Dark Mode Toggle - موجود هنا الآن */}
                    <button 
                      type="button" 
                      className="profile-dropdown-item"
                      onClick={toggleDarkMode}
                    >
                      {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                      <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    
                    {/* Language Selection - موجود هنا الآن */}
                    <div className="profile-dropdown-language">
                      <div className="profile-dropdown-item language-label">
                        <FiGlobe size={18} />
                        <span>Language</span>
                      </div>
                      <div className="language-options">
                        <button
                          className={`lang-option ${i18n.language === "en" ? "active" : ""}`}
                          onClick={() => handleLanguageChange("en")}
                        >
                          English
                        </button>
                        <button
                          className={`lang-option ${i18n.language === "ar" ? "active" : ""}`}
                          onClick={() => handleLanguageChange("ar")}
                        >
                          العربية
                        </button>
                      </div>
                    </div>
                    
                    <div className="profile-dropdown-divider" />
                    
                    {/* Logout Button */}
                    <button type="button" className="profile-dropdown-item logout" onClick={handleLogout}>
                      <FiLogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* If not authenticated, show login button */}
            {!isAuthenticated && (
              <button className="navbar-login-btn" onClick={() => navigate('/login')}>
                Sign In
              </button>
            )}

            {/* Hamburger Menu Icon */}
            <div className="menu-icon" onClick={() => setMenuOpen(true)}>
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect width="22" height="2.5" rx="1.25" fill="currentColor" />
                <rect y="6.5" width="22" height="2.5" rx="1.25" fill="currentColor" />
                <rect y="13" width="22" height="2.5" rx="1.25" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {showOverlay && (
        <div className="search-overlay" onClick={closeOverlay}>
          <div className="search-overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="search-overlay-header">
              <h2 className="search-overlay-title">
                {t("displayingResults")}{" "}
                <span style={{ color: "#F29C33" }}>{searchInput.toUpperCase()}</span>
              </h2>
              <p className="search-overlay-count">{searchResults.length} {t("recipesFound")}</p>
              <button className="search-overlay-close" onClick={closeOverlay}>✕</button>
            </div>

            {searchResults.length === 0 ? (
              <p style={{ color: "#666", fontFamily: "'Roboto', sans-serif" }}>
                {t("noRecipesFound")} "{searchInput}"
              </p>
            ) : (
              <div className="search-results-grid">
                {searchResults.map((recipe: any) => (
                  <div key={recipe.id} className="search-result-card" onClick={() => handleRecipeClick(recipe.id)}>
                    <img src={recipe.image} alt={recipe.name} className="search-result-img" />
                    <div className="search-result-info">
                      <h3 className="search-result-name">{recipe.name}</h3>
                      <p className="search-result-meta">
                        {recipe.prepTimeMinutes} MIN · {recipe.difficulty?.toUpperCase()} · {recipe.servings} SERVES
                      </p>
                      <button className="search-result-btn">{t("viewRecipe")}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-logo-row">
                <div className="logo-icon logo-icon-sm">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
                <span className="drawer-logo-text">Cooks<br />Delight</span>
              </div>
              <button type="button" className="drawer-close-btn" onClick={() => setMenuOpen(false)}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 1.5L11.5 11.5" stroke="#F29C33" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M11.5 1.5L1.5 11.5" stroke="#F29C33" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="drawer-links">
              {links.map((link) => {
                if (link.name === "RECIPES" || link.name === "الوصفات") {
                  return (
                    <a key={link.path} href="#" onClick={handleRecipesClick} className={isActiveLink(link.path) ? "drawer-link active" : "drawer-link"}>
                      {link.name}
                    </a>
                  );
                }
                return (
                  <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} className={isActiveLink(link.path) ? "drawer-link active" : "drawer-link"}>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Profile section in mobile drawer */}
            {isAuthenticated && user && (
              <div className="drawer-profile-section">
                <div className="drawer-user-info">
                  <img src={user.image || 'https://via.placeholder.com/40'} alt={user.username} className="drawer-avatar" />
                  <div>
                    <span className="drawer-user-name">{user.firstName} {user.lastName}</span>
                    <span className="drawer-user-email">{user.email}</span>
                  </div>
                </div>
                
                {/* Profile Links */}
                <div className="drawer-profile-links">
                  {profileNavItems.map((item) => (
                    <button
                      key={item.id}
                      className="drawer-profile-link"
                      onClick={() => {
                        handleProfileNavigation(item.id);
                        setMenuOpen(false);
                      }}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      <FiChevronRight size={16} />
                    </button>
                  ))}
                </div>
                
                {/* Dark Mode in Mobile Drawer */}
                <button className="drawer-dark-mode-btn" onClick={toggleDarkMode}>
                  {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                
                {/* Language in Mobile Drawer */}
                <div className="drawer-language-section">
                  <div className="drawer-language-label">
                    <FiGlobe size={18} />
                    <span>Language</span>
                  </div>
                  <div className="drawer-language-options">
                    <button
                      className={i18n.language === "en" ? "active" : ""}
                      onClick={() => {
                        handleLanguageChange("en");
                        setMenuOpen(false);
                      }}
                    >
                      English
                    </button>
                    <button
                      className={i18n.language === "ar" ? "active" : ""}
                      onClick={() => {
                        handleLanguageChange("ar");
                        setMenuOpen(false);
                      }}
                    >
                      العربية
                    </button>
                  </div>
                </div>
                
                <button className="drawer-logout-btn" onClick={handleLogout}>
                  <FiLogOut size={18} /> Logout
                </button>
              </div>
            )}

            {!isAuthenticated && (
              <button className="drawer-signup-btn" onClick={() => { navigate("/login"); setMenuOpen(false); }}>
                SIGN UP NOW!
              </button>
            )}

            <div className="drawer-socials">
              <a href="#" className="social-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.11 6.48 14.29 6.29C14.48 6.11 14.73 6 15 6H18V2Z" stroke="#F0EBE1" strokeWidth="1.8" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="#F0EBE1" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="#F0EBE1" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="#F0EBE1" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="4" stroke="#F0EBE1" strokeWidth="1.8" />
                  <path d="M10 9L16 12L10 15V9Z" fill="#F0EBE1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}