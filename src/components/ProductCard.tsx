
import React from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  popularity: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  rank?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, rank }) => {
  return (
    <div className="chocolate-card flex flex-col h-full relative">
      {rank && (
        <div className="absolute -top-3 -left-3 bg-chocolate-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg z-10">
          {rank}
        </div>
      )}
      <div className="relative bg-cream-100 rounded-md overflow-hidden h-40 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 bg-chocolate-600 text-white px-2 py-1 text-xs rounded-tl-md">
          {product.category}
        </div>
      </div>
      <h3 className="text-lg font-playfair font-semibold text-chocolate-800 mb-2">{product.name}</h3>
      <p className="text-sm text-chocolate-600 mb-3 flex-grow">{product.description}</p>
      <div className="mt-auto">
        <div className="flex items-center">
          <div className="text-xs text-chocolate-500 mr-2">Popularité:</div>
          <div className="flex-grow bg-cream-100 rounded-full h-2">
            <div 
              className="bg-caramel-400 h-2 rounded-full" 
              style={{ width: `${product.popularity}%` }}
            ></div>
          </div>
          <div className="text-xs text-chocolate-500 ml-2">{product.popularity}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
