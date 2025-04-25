
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  category: string;
  complexity: 'facile' | 'moyenne' | 'difficile';
  image: string;
}

interface NewRecipeFormProps {
  onGenerate: (recipes: Recipe[]) => void;
  className?: string;
}

const categories = [
  "Tablettes",
  "Pralinés",
  "Truffes",
  "Ganaches",
  "Chocolats fourrés",
  "Chocolats aux fruits",
  "Chocolats aux épices",
  "Bonbons au chocolat",
  "Mendiants",
  "Snacks chocolatés"
];

const complexityLevels = [
  { id: 'facile', name: 'Facile' },
  { id: 'moyenne', name: 'Moyenne' },
  { id: 'difficile', name: 'Difficile' }
];

const NewRecipeForm: React.FC<NewRecipeFormProps> = ({ onGenerate, className }) => {
  const [baseIngredients, setBaseIngredients] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [complexity, setComplexity] = useState<string>('');
  const [specialFeature, setSpecialFeature] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de génération de recettes
    const generatedRecipes: Recipe[] = [
      {
        id: `recipe-${Date.now()}-1`,
        name: `${getRandomElement(['Délice', 'Fusion', 'Création', 'Trésor'])} ${getRandomElement(['Chocolaté', 'de Cacao', 'Noir', 'Intense'])}`,
        description: `Une création ${complexity || 'unique'} ${specialFeature ? `avec une touche de ${specialFeature}` : ''} qui ravira vos papilles avec des saveurs subtiles et intenses.`,
        ingredients: baseIngredients.split(',').map(ing => ing.trim()).filter(ing => ing),
        category: selectedCategory || getRandomElement(categories),
        complexity: (complexity as 'facile' | 'moyenne' | 'difficile') || 'moyenne',
        image: '/placeholder.svg',
      },
      {
        id: `recipe-${Date.now()}-2`,
        name: `${getRandomElement(['Symphonie', 'Écrin', 'Songe', 'Paradis'])} ${getRandomElement(['Gourmand', 'Fondant', 'Velouté', 'Crémeux'])}`,
        description: `Une recette ${complexity || 'innovante'} ${specialFeature ? `où le ${specialFeature} se marie parfaitement au chocolat` : ''} pour offrir une expérience gustative unique.`,
        ingredients: baseIngredients.split(',').map(ing => ing.trim()).filter(ing => ing),
        category: selectedCategory || getRandomElement(categories),
        complexity: (complexity as 'facile' | 'moyenne' | 'difficile') || 'moyenne',
        image: '/placeholder.svg',
      }
    ];
    
    onGenerate(generatedRecipes);
  };

  const getRandomElement = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6 p-6 bg-white rounded-lg shadow-md border border-chocolate-100", className)}>
      <h2 className="text-2xl font-playfair text-chocolate-800 mb-6">Générer de nouvelles recettes</h2>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="baseIngredients" className="text-chocolate-700">
            Ingrédients de base (séparés par des virgules)
          </Label>
          <Textarea 
            id="baseIngredients"
            value={baseIngredients}
            onChange={(e) => setBaseIngredients(e.target.value)}
            placeholder="Ex: chocolat noir 70%, noisettes, écorce d'orange, vanille..."
            className="chocolate-input mt-1"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-chocolate-700">
            Catégorie
          </Label>
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="chocolate-input mt-1">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="complexity" className="text-chocolate-700">
            Niveau de complexité
          </Label>
          <Select 
            value={complexity} 
            onValueChange={setComplexity}
          >
            <SelectTrigger className="chocolate-input mt-1">
              <SelectValue placeholder="Sélectionnez un niveau" />
            </SelectTrigger>
            <SelectContent>
              {complexityLevels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="specialFeature" className="text-chocolate-700">
            Caractéristique spéciale
          </Label>
          <Input 
            id="specialFeature"
            value={specialFeature}
            onChange={(e) => setSpecialFeature(e.target.value)}
            placeholder="Ex: fleur de sel, poivre, fruits rouges..."
            className="chocolate-input mt-1"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="chocolate-button w-full flex items-center justify-center"
      >
        <Wand2 className="mr-2 h-5 w-5" />
        Générer des recettes
      </Button>
    </form>
  );
};

export default NewRecipeForm;
