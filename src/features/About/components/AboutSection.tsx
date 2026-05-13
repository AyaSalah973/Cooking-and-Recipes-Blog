import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { GallerySection } from "./GallerySection";
import "./AboutSection.css";

interface AboutSectionProps {
  content: string;
  chefName: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  content,
  chefName,
}) => {
  const paragraphs = content.split("\n\n");

  return (
    <section className="about-section">

      <div className="about-grid">

        {/* LEFT */}
        <div className="about-left">

          <div>
            <img
              src="/author-image.jpg"
              alt="Chef Joabelle Russo"
              className="about-image"
            />
          </div>

          {/* FOLLOW BAR */}
          <div className="follow-bar">

            <span className="follow-text">
              Follow Me
            </span>

            <div className="social-links">

              <a href="#">
                <FaFacebookF size={16} />
              </a>

              <a href="#">
                <FaInstagram size={16} />
              </a>

              <a href="#">
                <FaYoutube size={16} />
              </a>

            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="about-right">

          <h2 className="about-title">
            FROM ITALIAN ROOTS TO GLOBAL PALATES
          </h2>

          <div className="about-content">

            {paragraphs.map((paragraph, index) => (
              <p key={index} className="about-paragraph">
                {paragraph.trim()}
              </p>
            ))}

          </div>

          {/* SIGNATURE */}
          <div className="signature-box">

            <p className="signature-text">
              Warmest regards,
              <br />

              <span className="chef-signature">
                {chefName}
              </span>
            </p>

          </div>
        </div>
      </div>

      <GallerySection />
    </section>
  );
};