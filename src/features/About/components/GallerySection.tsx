import React from 'react';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=500&fit=crop',
    title: 'Authentic Italian Pasta',
    description: 'Handcrafted pasta with traditional recipes'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=500&fit=crop',
    title: 'Wood-Fired Pizza',
    description: 'Neapolitan-style pizza with fresh ingredients'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=600&h=500&fit=crop',
    title: 'Decadent Desserts',
    description: 'Traditional Tiramisu and Panna Cotta'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=500&fit=crop',
    title: 'Fresh Market Ingredients',
    description: 'Locally sourced produce and herbs'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=500&fit=crop',
    title: 'Seafood Risotto',
    description: 'Creamy risotto with fresh seafood'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=600&h=500&fit=crop',
    title: 'Italian Wine Selection',
    description: 'Premium wines from Tuscany'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=500&fit=crop',
    title: 'Grilled Meats',
    description: 'Perfectly grilled steak and lamb'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop',
    title: 'Chef Special',
    description: 'Daily chef\'s special creations'
  }
];

export const GallerySection: React.FC = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-base font-bold mb-1">{image.title}</h3>
                  <p className="text-xs text-gray-200">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};