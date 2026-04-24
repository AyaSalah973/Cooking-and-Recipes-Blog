import React from 'react';
 
interface HeroSectionProps {
  title: string;
}
 
export const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
    
  return (
    <div className="bg-[#f0ebe1] ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
 
        {/* Left: Big Title */}
        <h1
          className="flex-1 uppercase"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '73px',
            lineHeight: '100%',
            letterSpacing: '-1%',
            color: '#262522',
            
          }}
        >
          {title}
        </h1>
 
        {/* Right: Description + Button */}
        <div className="flex-1 flex flex-col gap-6">
          <p
            className="font-roboto text-[#26252299] leading-[140%] tracking-[0.01em]"
            style={{
              fontSize: 'clamp(16px, 4vw, 21px)',
              fontWeight: 400,
            }}
          >
            Bonjour and welcome to the heart of my kitchen! I'm Isabella Russo,
            the culinary enthusiast behind this haven of flavors, Cooks Delight.
            Join me on a gastronomic journey where each dish carries a story, and
            every recipe is a crafted symphony of taste.
          </p>
 
          <button 
            className="
              w-[166px] h-[38px] px-6 py-3 rounded-full bg-[#F29C33] border-none cursor-pointer
              font-roboto font-semibold text-[13px] tracking-[1px] uppercase text-[#080808]
              flex items-center justify-center gap-2.5 whitespace-nowrap
              transition-all duration-300 hover:bg-[#e88a20] hover:scale-105 active:scale-95
            "
          >
            Explore Recipes
          </button>
        </div>
 
      </div>
    </div>
  );
};
 