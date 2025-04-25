
import React from 'react';
import { Packaging } from './PackagingForm';
import { Badge } from "@/components/ui/badge";
import { Box, Ruler, Package2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackagingCardProps {
  packaging: Packaging;
}

const PackagingCard: React.FC<PackagingCardProps> = ({ packaging }) => {
  return (
    <Card className="chocolate-card flex flex-col h-full overflow-hidden">
      <div className="relative bg-cream-100 rounded-md overflow-hidden h-40 mb-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{ backgroundColor: packaging.color }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Package2 
            size={64} 
            color={packaging.color} 
            strokeWidth={1} 
            className="opacity-70"
          />
        </div>
        <div className="absolute bottom-0 right-0 bg-chocolate-600 text-white px-2 py-1 text-xs rounded-tl-md">
          {packaging.category}
        </div>
        {packaging.eco_friendly && (
          <div className="absolute top-2 left-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Éco-responsable
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg font-playfair text-chocolate-800">{packaging.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-chocolate-600 mb-3">{packaging.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-chocolate-500 mb-2">
          <div className="flex items-center">
            <Box size={14} className="mr-1 text-chocolate-400" />
            <span>{packaging.material}</span>
          </div>
          <div className="flex items-center">
            <Ruler size={14} className="mr-1 text-chocolate-400" />
            <span>{packaging.dimensions}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="mr-2 text-xs text-chocolate-500">Couleur:</div>
          <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: packaging.color }}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackagingCard;
