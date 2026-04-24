// src/shared/layout/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css"; // تأكد من وجود ملف CSS أو قم بتعديل المسار

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "HOME", path: "/" },
    { name: "RECIPES", path: "/recipes" },
    { name: "COOKING TIPS", path: "/tips" },
    { name: "ABOUT US", path: "/about" },
  ];

  return (
    <>
      {/* ====== DESKTOP + MOBILE NAVBAR ====== */}
      <div className="navbar-wrapper">
        <div className="navbar">
          {/* LEFT: Logo */}
          <div className="navbar-left">
            <div className="logo-icon">
              <div className="logo-circle-outer"></div>
              <div className="logo-circle-mid"></div>
              <div className="logo-circle-inner"></div>
            </div>
            <span className="logo-text">Cooks<br/>Delight</span>
          </div>

          {/* CENTER: Desktop Links */}
          <div className="navbar-links">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? "nav-link active" : "nav-link"}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: Search + Hamburger */}
          <div className="navbar-right">
            {/* Search Icon */}
            <div className="search-box">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="#262522" strokeWidth="2"/>
                <path d="M12 12L16 16" stroke="#262522" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Hamburger (Mobile only) */}
            <div className="menu-icon" onClick={() => setMenuOpen(true)}>
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect width="22" height="2.5" rx="1.25" fill="#262522"/>
                <rect y="6.5" width="22" height="2.5" rx="1.25" fill="#262522"/>
                <rect y="13" width="22" height="2.5" rx="1.25" fill="#262522"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ====== MOBILE DRAWER ====== */}
      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="drawer-header">
              <div className="drawer-logo-row">
                <div className="logo-icon logo-icon-sm">
                  <div className="logo-circle-outer"></div>
                  <div className="logo-circle-mid"></div>
                  <div className="logo-circle-inner"></div>
                </div>
                <span className="drawer-logo-text">Cooks<br/>Delight</span>
              </div>
              <button className="drawer-close-btn" onClick={() => setMenuOpen(false)}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 1.5L11.5 11.5" stroke="#F29C33" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M11.5 1.5L1.5 11.5" stroke="#F29C33" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="drawer-links">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={location.pathname === link.path ? "drawer-link active" : "drawer-link"}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Footer: Search + Signup */}
            <div className="drawer-footer">
              <div className="drawer-search-circle">
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="#F0EBE1" strokeWidth="2"/>
                  <path d="M12 12L16 16" stroke="#F0EBE1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <button className="drawer-signup-btn">SIGN UP NOW!</button>
            </div>

            {/* Social Icons */}
            <div className="drawer-socials">
              <a href="#" className="social-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.11 6.48 14.29 6.29C14.48 6.11 14.73 6 15 6H18V2Z" stroke="#F0EBE1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="#F0EBE1" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="4" stroke="#F0EBE1" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="#F0EBE1"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="4" stroke="#F0EBE1" strokeWidth="1.8"/>
                  <path d="M10 9L16 12L10 15V9Z" fill="#F0EBE1"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}