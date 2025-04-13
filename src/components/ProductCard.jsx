
import React from 'react';
import { getCategoryImage } from '../utils/chocolateCategories';

const ProductCard = ({ product, rank }) => {
  // Déterminer la catégorie en fonction du rang
  const categories = [
    "Tablettes", "Pralinés", "Truffes", "Fruits Enrobés", "Mendiants", 
    "Ganaches", "Pâtes à tartiner", "Bonbons", "Confiseries", "Spécialités"
  ];
  
  // Construire un objet produit complet si ce n'est qu'un score
  const displayProduct = typeof product === 'object' && product.name 
    ? product 
    : {
        id: rank || Math.random(),
        name: `Produit ${rank || 1}`,
        description: `Ce produit est prédit comme étant populaire selon nos algorithmes. Score de prédiction: ${typeof product === 'number' ? product.toFixed(2) : (product.score ? product.score.toFixed(2) : '?')}`,
        popularity: typeof product === 'number' ? Math.round(product * 100) : (product.score ? Math.round(product.score * 100) : 50),
        image: "/placeholder.svg",
        category: product.category || categories[rank ? (rank - 1) % categories.length : 0]
      };

  return (
    <div className="chocolate-card flex flex-col h-full">
      {rank && (
        <div className="absolute -top-3 -left-3 bg-chocolate-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
          {rank}
        </div>
      )}
      <div className="relative bg-cream-100 rounded-md overflow-hidden h-40 mb-4">
        <img 
          src={getCategoryImage(displayProduct.category)} 
          alt={displayProduct.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 bg-chocolate-600 text-white px-2 py-1 text-xs rounded-tl-md">
          {displayProduct.category}
        </div>
      </div>
      <h3 className="text-lg font-playfair font-semibold text-chocolate-800 mb-2">{displayProduct.name}</h3>
      <p className="text-sm text-chocolate-600 mb-3 flex-grow">{displayProduct.description}</p>
      <div className="mt-auto">
        <div className="flex items-center">
          <div className="text-xs text-chocolate-500 mr-2">Popularité:</div>
          <div className="flex-grow bg-cream-100 rounded-full h-2">
            <div 
              className="bg-caramel-400 h-2 rounded-full" 
              style={{ width: `${displayProduct.popularity}%` }}
            ></div>
          </div>
          <div className="text-xs text-chocolate-500 ml-2">{displayProduct.popularity}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
