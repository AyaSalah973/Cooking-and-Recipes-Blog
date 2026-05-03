const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', title: 'Kitchen Prep' },
  { id: 2, url: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=300&fit=crop', title: 'Cooking' },
  { id: 3, url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', title: 'Food' },
  { id: 4, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', title: 'Dish' },
  { id: 5, url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop', title: 'Ingredients' },
  { id: 6, url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop', title: 'Meal' },
  { id: 7, url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop', title: 'Recipe' },
  { id: 8, url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', title: 'Chef' },
];

export const GallerySection: React.FC = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
    }}>
      {galleryImages.map((image) => (
        <div key={image.id} style={{
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src={image.url}
            alt={image.title}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
      ))}
    </div>
  );
};