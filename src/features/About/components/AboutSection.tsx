import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { GallerySection } from './GallerySection';

interface AboutSectionProps {
  content: string;
  chefName: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content, chefName }) => {
  const paragraphs = content.split('\n\n');

  return (
    <section style={{ margin: '32px 0', padding: '24px', borderRadius: '32px' }}>
      
      {/* Grid: Image + Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'start',
        marginBottom: '48px',
      }}>

        {/* Left - Image + Follow me */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
            <img 
              src="/author-image.jpg"  
              alt="Chef Joabelle Russo"
              style={{
                width: '100%',
                maxWidth: '620px',
                height: 'auto',
                aspectRatio: '620 / 480',
                borderRadius: '12px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            </div>

          {/* Follow me bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 24px',
            border: '1px solid #262522',
            borderRadius: '24px',
          }}>
            <span style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#262522',
            }}>
              Follow Me
            </span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="#" style={{ color: '#262522', display: 'flex' }}>
                <FaFacebookF size={16} />
              </a>
              <a href="#" style={{ color: '#262522', display: 'flex' }}>
                <FaInstagram size={16} />
              </a>
              <a href="#" style={{ color: '#262522', display: 'flex' }}>
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right - Text Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            lineHeight: '110%',
            textTransform: 'uppercase',
            color: '#262522',
            margin: 0,
          }}>
            FROM ITALIAN ROOTS TO GLOBAL PALATES
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: '1.75',
                letterSpacing: '0.01em',
                color: 'rgba(51, 51, 51, 0.8)',
                margin: 0,
              }}>
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div style={{ marginTop: '8px' }}>
            <p style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: '14px',
              color: 'rgba(51, 51, 51, 0.7)',
              margin: 0,
              lineHeight: '1.6',
            }}>
              Warmest regards,
              <br />
              <span style={{
                fontFamily: "'Homemade Apple', cursive",
                fontSize: '20px',
                color: 'rgba(51, 51, 51, 0.85)',
              }}>
                {chefName}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <GallerySection />
    </section>
  );
};