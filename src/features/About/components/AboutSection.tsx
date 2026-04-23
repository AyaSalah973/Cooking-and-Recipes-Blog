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
    <section className=" my-16 p-4 border border-[#2625223D] rounded-[32px]">
      <div className="max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Image */}
          <div className="rounded-2xl overflow-hidden ">
            <div>
            <img 
              src="/author-image.jpg"  
              alt="Chef Joabelle Russo"
              className="w-[620px] h-[480px] rounded-[12px] object-cover opacity-100"
            />
            </div>
           {/* Follow me Card */}
  <div className="mt-4 flex items-center justify-between px-6 py-3 border border-[#262522] rounded-[24px] ">
    
    <span className="text-gray-800 font-medium text-base">
      Follow me
    </span>

    <div className="flex items-center gap-4">
      <a href="#" className="text-black hover:opacity-70 transition">
        <FaFacebookF size={18} />
      </a>

      <a href="#" className="text-black hover:opacity-70 transition">
        <FaInstagram size={18} />
      </a>

      <a href="#" className="text-black hover:opacity-70 transition">
        <FaYoutube size={18} />
      </a>
    </div>
  </div>

</div>

          {/* Right side - Content */}
          <div>
            {/* Title */}
            <div className="mb-8">
              <h2 className=" text-[40px] font-bold uppercase text-[#333333] leading-[100%] tracking-[0.01em] font-[Montserrat]">
                 FROM ITALIAN ROOTS <br />TO GLOBAL PALATES
              </h2>
              
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-5 text-gray-700">
              {paragraphs.map((paragraph, index) => (
  <p 
    key={index} 
   className="text-[14px] font-light leading-6 tracking-[0.01em] text-[#333333CC] font-roboto"
  >
    {paragraph.trim()}
  </p>
))}
              
              {/* Signature */}
              <div className="mt-8 ">
                <p className="text-gray-600">
                  Warmest regards,
                  <br />
                  <span className="font-homemade text-[21px] leading-[120%] tracking-[0.01em] text-[#333333CC]">
                    {chefName}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <GallerySection />
      </div>
      
    </section>
  );
};