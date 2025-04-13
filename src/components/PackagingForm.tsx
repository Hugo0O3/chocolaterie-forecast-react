
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Box, Palette, PackagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Packaging {
  id: string;
  name: string;
  description: string;
  color: string;
  material: string;
  dimensions: string;
  image: string;
  category: string;
  eco_friendly: boolean;
}

interface PackagingFormProps {
  onGenerate: (packagings: Packaging[]) => void;
  className?: string;
}

const materials = [
  "Carton",
  "Papier recyclé",
  "Plastique biodégradable",
  "Aluminium",
  "Bois",
  "Verre",
  "Tissu",
  "Métal",
  "Composite"
];

const packageCategories = [
  "Boîte cadeau",
  "Emballage individuel",
  "Lot assortiment",
  "Ballotin",
  "Sachet",
  "Tube",
  "Coffret dégustation",
  "Étui de voyage",
  "Édition limitée",
  "Packaging saisonnier"
];

const colors = [
  { id: 'chocolate_brown', name: 'Marron chocolat', value: '#5D4037' },
  { id: 'gold', name: 'Or', value: '#FFD700' },
  { id: 'silver', name: 'Argent', value: '#C0C0C0' },
  { id: 'cream', name: 'Crème', value: '#FFFDD0' },
  { id: 'dark_chocolate', name: 'Chocolat noir', value: '#3E2723' },
  { id: 'burgundy', name: 'Bordeaux', value: '#800020' },
  { id: 'forest_green', name: 'Vert forêt', value: '#228B22' },
  { id: 'navy_blue', name: 'Bleu marine', value: '#000080' },
  { id: 'purple', name: 'Violet', value: '#800080' },
  { id: 'turquoise', name: 'Turquoise', value: '#40E0D0' }
];

const PackagingForm: React.FC<PackagingFormProps> = ({ onGenerate, className }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [dimensions, setDimensions] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de génération de packagings
    const generatedPackagings: Packaging[] = [
      {
        id: `packaging-${Date.now()}-1`,
        name: name || `Emballage ${material} ${getSelectedColorName() || 'Premium'}`,
        description: description || `Un packaging élégant en ${material} avec une finition ${getSelectedColorName() || 'premium'}, idéal pour mettre en valeur vos chocolats.`,
        color: getSelectedColorValue() || '#5D4037',
        material: material || 'Carton',
        dimensions: dimensions || '10cm x 10cm x 5cm',
        image: '/placeholder.svg',
        category: category || 'Boîte cadeau',
        eco_friendly: material === 'Papier recyclé' || material === 'Plastique biodégradable' || material === 'Bois'
      },
      {
        id: `packaging-${Date.now()}-2`,
        name: `Variante ${getSelectedColorName() || 'Élégante'}`,
        description: `Une alternative ${getSelectedColorName() || 'élégante'} du design original, avec des finitions différentes mais dans le même esprit.`,
        color: getVariantColorValue(),
        material: material || 'Carton',
        dimensions: dimensions || '12cm x 8cm x 4cm',
        image: '/placeholder.svg',
        category: category || 'Boîte cadeau',
        eco_friendly: material === 'Papier recyclé' || material === 'Plastique biodégradable' || material === 'Bois'
      }
    ];
    
    onGenerate(generatedPackagings);
  };

  const getSelectedColorName = (): string => {
    const selectedColor = colors.find(c => c.id === color);
    return selectedColor ? selectedColor.name : '';
  };

  const getSelectedColorValue = (): string => {
    const selectedColor = colors.find(c => c.id === color);
    return selectedColor ? selectedColor.value : '';
  };

  const getVariantColorValue = (): string => {
    // If no color is selected, return a default color
    if (!color) return '#8D6E63';
    
    // Get the selected color
    const selectedColor = colors.find(c => c.id === color);
    if (!selectedColor) return '#8D6E63';
    
    // Convert hex to RGB to lighten/darken
    const hex = selectedColor.value.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Return a slightly different shade
    return `rgb(${Math.min(r + 20, 255)}, ${Math.min(g + 10, 255)}, ${Math.max(b - 15, 0)})`;
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6 p-6 bg-white rounded-lg shadow-md border border-chocolate-100", className)}>
      <h2 className="text-2xl font-playfair text-chocolate-800 mb-6">Concevoir un nouveau packaging</h2>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="name" className="text-chocolate-700">
            Nom du packaging
          </Label>
          <Input 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Écrin Doré, Ballotin Prestige..."
            className="chocolate-input mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-chocolate-700">
            Description
          </Label>
          <Textarea 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez l'aspect et les caractéristiques de l'emballage..."
            className="chocolate-input mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="material" className="text-chocolate-700">
            Matériau principal
          </Label>
          <Select 
            value={material} 
            onValueChange={setMaterial}
          >
            <SelectTrigger className="chocolate-input mt-1">
              <SelectValue placeholder="Sélectionnez un matériau" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((mat) => (
                <SelectItem key={mat} value={mat}>
                  {mat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="color" className="text-chocolate-700">
            Couleur dominante
          </Label>
          <Select 
            value={color} 
            onValueChange={setColor}
          >
            <SelectTrigger className="chocolate-input mt-1">
              <SelectValue placeholder="Sélectionnez une couleur" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((col) => (
                <SelectItem key={col.id} value={col.id}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: col.value }}></div>
                    {col.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="dimensions" className="text-chocolate-700">
            Dimensions
          </Label>
          <Input 
            id="dimensions"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            placeholder="Ex: 10cm x 10cm x 5cm"
            className="chocolate-input mt-1"
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-chocolate-700">
            Type de packaging
          </Label>
          <Select 
            value={category} 
            onValueChange={setCategory}
          >
            <SelectTrigger className="chocolate-input mt-1">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              {packageCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="chocolate-button w-full flex items-center justify-center"
      >
        <PackagePlus className="mr-2 h-5 w-5" />
        Créer des packagings
      </Button>
    </form>
  );
};

export default PackagingForm;
