import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
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

  const { t, i18n } = useTranslation();

  /* FETCH RECIPES */
  useEffect(() => {

    fetch("https://dummyjson.com/recipes?limit=50")

      .then((res) => res.json())

      .then((data) => setAllRecipes(data.recipes));

  }, []);

  /* GOOGLE TRANSLATE */
  useEffect(() => {

    const addGoogleTranslate = () => {

      if (
        !document.getElementById(
          "google_translate_script"
        )
      ) {

        const script =
          document.createElement("script");

        script.id =
          "google_translate_script";

        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

        script.async = true;

        document.body.appendChild(script);
      }

      window.googleTranslateElementInit =
        () => {

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
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const value = e.target.value;

    setSearchInput(value);

    if (value.trim()) {

      navigate(
        `/recipes?search=${encodeURIComponent(value)}`
      );

    } else {

      navigate("/recipes");
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

  /* DARK MODE */
  const toggleDarkMode = () => {

    if (document.body.classList.contains("dark")) {

      document.body.classList.remove("dark");

      setDarkMode(false);

    } else {

      document.body.classList.add("dark");

      setDarkMode(true);
    }
  };

  /* NAV LINKS */
  const links = [
    { name: t("home"), path: "/" },

    { name: t("recipes"), path: "/recipes" },

    { name: t("cookingTips"), path: "/tips" },

    { name: t("aboutUs"), path: "/about" },
  ];

  const handleRecipesClick = async (
    e: React.MouseEvent
  ) => {

    e.preventDefault();

    try {

      const response =
        await fetch("https://dummyjson.com/recipes");

      const data = await response.json();

      if (
        data.recipes &&
        data.recipes.length > 0
      ) {

        navigate(
          `/recipe/${data.recipes[0].id}`
        );
      }

    } catch {

      navigate("/recipes");
    }

    setMenuOpen(false);
  };

  const isActiveLink = (path: string) => {

    if (path === "/")
      return location.pathname === "/";

    if (
      path === "/recipes" &&
      location.pathname.startsWith("/recipe")
    )
      return true;

    if (path === "/tips")
      return location.pathname === "/tips";

    if (path === "/about")
      return location.pathname === "/about";

    return false;
  };

  return (
    <>
      <div className="navbar-wrapper">

        <div className="navbar">

          {/* LEFT */}
          <div className="navbar-left">

            <div className="logo-icon">

              <div className="logo-circle-outer"></div>

              <div className="logo-circle-mid"></div>

              <div className="logo-circle-inner"></div>

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
                    className={
                      isActiveLink(link.path)
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={
                    isActiveLink(link.path)
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  {link.name}
                </Link>
              );
            })}

          </div>

          {/* RIGHT */}
          <div className="navbar-right">

            {/* DARK MODE */}
            <button
              type="button"
              className="dark-btn"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* LANGUAGE */}
            <div className="lang-switch">

              <button
                className={
                  i18n.language === "en"
                    ? "active-lang"
                    : ""
                }
                onClick={() => {

                  i18n.changeLanguage("en");

                  document.cookie =
                    "googtrans=/ar/en";

                  window.location.reload();
                }}
              >
                EN
              </button>

              <button
                className={
                  i18n.language === "ar"
                    ? "active-lang"
                    : ""
                }
                onClick={() => {

                  i18n.changeLanguage("ar");

                  document.cookie =
                    "googtrans=/en/ar";

                  window.location.reload();
                }}
              >
                عربي
              </button>

            </div>

            {/* SEARCH */}
            <div className="search-box">

              <button
                className="search-icon-btn"
                title="Search"
                aria-label="Search"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >

                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="5.5"
                    stroke="#262522"
                    strokeWidth="2"
                  />

                  <path
                    d="M12 12L16 16"
                    stroke="#262522"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

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

            {/* MENU */}
            <div
              className="menu-icon"
              onClick={() => setMenuOpen(true)}
            >

              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
              >

                <rect
                  width="22"
                  height="2.5"
                  rx="1.25"
                  fill="#262522"
                />

                <rect
                  y="6.5"
                  width="22"
                  height="2.5"
                  rx="1.25"
                  fill="#262522"
                />

                <rect
                  y="13"
                  width="22"
                  height="2.5"
                  rx="1.25"
                  fill="#262522"
                />

              </svg>

            </div>

          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {showOverlay && (

        <div
          className="search-overlay"
          onClick={closeOverlay}
        >

          <div
            className="search-overlay-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="search-overlay-header">

              <h2 className="search-overlay-title">

                {t("displayingResults")}{" "}

                <span style={{ color: "#F29C33" }}>
                  {searchInput.toUpperCase()}
                </span>

              </h2>

              <p className="search-overlay-count">
                {searchResults.length}{" "}
                {t("recipesFound")}
              </p>

              <button
                className="search-overlay-close"
                onClick={closeOverlay}
              >
                ✕
              </button>

            </div>

            {searchResults.length === 0 ? (

              <p
                style={{
                  color: "#666",
                  fontFamily:
                    "'Roboto', sans-serif",
                }}
              >
                {t("noRecipesFound")} "
                {searchInput}"
              </p>

            ) : (

              <div className="search-results-grid">

                {searchResults.map(
                  (recipe: any) => (

                    <div
                      key={recipe.id}
                      className="search-result-card"
                      onClick={() =>
                        handleRecipeClick(recipe.id)
                      }
                    >

                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="search-result-img"
                      />

                      <div className="search-result-info">

                        <h3 className="search-result-name">
                          {recipe.name}
                        </h3>

                        <p className="search-result-meta">

                          {recipe.prepTimeMinutes}
                          {" "}
                          MIN ·{" "}

                          {recipe.difficulty?.toUpperCase()}
                          {" "}
                          · {recipe.servings} SERVES

                        </p>

                        <button className="search-result-btn">
                          {t("viewRecipe")}
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
}