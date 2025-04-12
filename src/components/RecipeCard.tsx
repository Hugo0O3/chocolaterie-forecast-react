
import React from 'react';
import { Recipe } from './NewRecipeForm';
import { Tag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const complexityColors = {
    facile: 'bg-green-100 text-green-800',
    moyenne: 'bg-orange-100 text-orange-800',
    difficile: 'bg-red-100 text-red-800'
  };

  return (
    <div className="chocolate-card flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative">
      <div className="absolute -top-3 -right-3">
        <Badge className={`${complexityColors[recipe.complexity]} font-medium`}>
          {recipe.complexity}
        </Badge>
      </div>
      <div className="bg-cream-100 rounded-md overflow-hidden h-48 mb-4">
        <img
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-chocolate-600 text-white font-medium">
            {recipe.category}
          </Badge>
        </div>
      </div>
      <h3 className="text-xl font-playfair font-semibold text-chocolate-800 mb-2">{recipe.name}</h3>
      <p className="text-sm text-chocolate-600 mb-4">{recipe.description}</p>
      
      <div className="mt-auto">
        <h4 className="text-sm font-medium text-chocolate-700 flex items-center mb-2">
          <Tag className="mr-1 h-4 w-4" />
          Ingrédients:
        </h4>
        <div className="flex flex-wrap gap-1">
          {recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => (
              <span 
                key={index} 
                className="inline-block bg-cream-200 text-chocolate-700 px-2 py-1 text-xs rounded-full"
              >
                {ingredient}
              </span>
            ))
          ) : (
            <span className="text-xs text-chocolate-500 italic">Pas d'ingrédients spécifiés</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
