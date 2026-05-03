import React from 'react';
 
interface HeroSectionProps {
  title: string;
}
 
export const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  return (
    <div style={{ padding: '48px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>

        <h1 style={{
          flex: 1,
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(42px, 6vw, 73px)',
          lineHeight: '100%',
          letterSpacing: '-1px',
          textTransform: 'uppercase',
          color: '#262522',
          margin: 0,
        }}>
          {title}
        </h1>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 'clamp(14px, 2vw, 17px)',
            fontWeight: 400,
            lineHeight: '140%',
            color: '#26252299',
            margin: 0,
          }}>
            Bonjour and welcome to the heart of my kitchen! I'm Isabella Russo,
            the culinary enthusiast behind this haven of flavors, Cooks Delight.
            Join me on a gastronomic journey where each dish carries a story, and
            every recipe is a crafted symphony of taste.
          </p>

          <button style={{
            width: '166px',
            height: '38px',
            borderRadius: '24px',
            background: '#F29C33',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#080808',
          }}>
            Explore Recipes
          </button>
        </div>
      </div>
    </div>
  );
};