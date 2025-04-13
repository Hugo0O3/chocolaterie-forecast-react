
// Map of chocolate categories to their respective images
const categoryImages: Record<string, string> = {
  "Tablettes": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=500&auto=format&fit=crop",
  "Pralinés": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=500&auto=format&fit=crop",
  "Truffes": "https://images.unsplash.com/photo-1548907040-4d2e36ee5435?q=80&w=500&auto=format&fit=crop",
  "Fruits Enrobés": "https://images.unsplash.com/photo-1560179406-63702e5607ba?q=80&w=500&auto=format&fit=crop",
  "Mendiants": "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=500&auto=format&fit=crop",
  "Ganaches": "https://images.unsplash.com/photo-1610611424854-5e29d0466fc7?q=80&w=500&auto=format&fit=crop",
  "Pâtes à tartiner": "https://images.unsplash.com/photo-1607920592519-bab2a4e799b4?q=80&w=500&auto=format&fit=crop",
  "Bonbons": "https://images.unsplash.com/photo-1581798459219-306e5fecc55d?q=80&w=500&auto=format&fit=crop",
  "Confiseries": "https://images.unsplash.com/photo-1599599377756-6c2a54e4d1c6?q=80&w=500&auto=format&fit=crop",
  "Spécialités": "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=500&auto=format&fit=crop",
  "Chocolats fourrés": "https://images.unsplash.com/photo-1582776240892-e503f6a81eb0?q=80&w=500&auto=format&fit=crop",
  "Chocolats aux fruits": "https://images.unsplash.com/photo-1579694835214-adc1e8e2604a?q=80&w=500&auto=format&fit=crop",
  "Chocolats aux épices": "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=500&auto=format&fit=crop",
  "Snacks chocolatés": "https://images.unsplash.com/photo-1614088685112-0697dbc56a8f?q=80&w=500&auto=format&fit=crop"
};

// Default fallback image for categories not in the map
const defaultImage = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=500&auto=format&fit=crop";

/**
 * Get an image URL based on the chocolate category
 * 
 * @param {string} category - The chocolate category
 * @returns {string} - URL to the category image
 */
export const getCategoryImage = (category: string): string => {
  return categoryImages[category] || defaultImage;
};
