
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChocolateHeader from '@/components/ChocolateHeader';
import ChocolateFooter from '@/components/ChocolateFooter';
import PredictionInputForm, { PredictionFormData } from '@/components/PredictionInputForm';
import NewRecipeForm, { Recipe } from '@/components/NewRecipeForm';
import ProductCard, { Product } from '@/components/ProductCard';
import RecipeCard from '@/components/RecipeCard';
import PackagingForm, { Packaging } from '@/components/PackagingForm';
import PackagingCard from '@/components/PackagingCard';
import { predictTopProducts } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [newRecipes, setNewRecipes] = useState<Recipe[]>([]);
  const [newPackagings, setNewPackagings] = useState<Packaging[]>([]);
  const [activeTab, setActiveTab] = useState<string>("predictions");
  const [hasPredictions, setHasPredictions] = useState<boolean>(false);
  const [hasRecipes, setHasRecipes] = useState<boolean>(false);
  const [hasPackagings, setHasPackagings] = useState<boolean>(false);

  const handlePredictionSubmit = (data: PredictionFormData) => {
    // Simulons un appel à un modèle d'IA
    setTimeout(() => {
      const predictedProducts = predictTopProducts(data);
      setTopProducts(predictedProducts);
      setHasPredictions(true);
      
      toast({
        title: "Prédictions générées",
        description: "Les 10 produits susceptibles de se vendre le mieux ont été calculés.",
        duration: 3000,
      });
    }, 800);
  };

  const handleRecipeGenerate = (recipes: Recipe[]) => {
    // Simulons un appel à un modèle d'IA pour générer des recettes
    setTimeout(() => {
      setNewRecipes(recipes);
      setHasRecipes(true);
      
      toast({
        title: "Nouvelles recettes créées",
        description: "2 nouvelles recettes de chocolat ont été générées avec succès.",
        duration: 3000,
      });
    }, 800);
  };

  const handlePackagingGenerate = (packagings: Packaging[]) => {
    // Simulons un appel à un modèle d'IA pour générer des packagings
    setTimeout(() => {
      setNewPackagings(packagings);
      setHasPackagings(true);
      
      toast({
        title: "Nouveaux packagings créés",
        description: "2 nouveaux designs d'emballage ont été générés avec succès.",
        duration: 3000,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ChocolateHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-chocolate-800 text-center mb-3">
            IA pour Chocolaterie
          </h1>
          <p className="text-lg text-chocolate-600 text-center mb-8">
            Prédictions de ventes et génération de recettes basées sur l'intelligence artificielle
          </p>
          
          <Tabs 
            defaultValue="predictions" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger 
                value="predictions" 
                className="text-lg font-playfair py-3 data-[state=active]:bg-chocolate-600 data-[state=active]:text-white"
              >
                Prédictions de Ventes
              </TabsTrigger>
              <TabsTrigger 
                value="recipes" 
                className="text-lg font-playfair py-3 data-[state=active]:bg-chocolate-600 data-[state=active]:text-white"
              >
                Nouvelles Recettes
              </TabsTrigger>
              <TabsTrigger 
                value="packagings" 
                className="text-lg font-playfair py-3 data-[state=active]:bg-chocolate-600 data-[state=active]:text-white"
              >
                Nouveaux Packagings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="predictions" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <PredictionInputForm onSubmit={handlePredictionSubmit} />
                </div>
                <div className="lg:col-span-2">
                  {hasPredictions ? (
                    <div>
                      <h2 className="text-2xl font-playfair font-semibold text-chocolate-800 mb-6">
                        Top 10 des Produits à Promouvoir
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {topProducts.map((product, index) => (
                          <div key={product.id} className="relative">
                            <ProductCard product={product} rank={index + 1} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-cream-100 rounded-lg border border-chocolate-200">
                      <img 
                        src="/placeholder.svg" 
                        alt="Chocolat" 
                        className="w-32 h-32 mb-6 opacity-30 animate-float"
                      />
                      <h3 className="text-2xl font-playfair text-chocolate-700 mb-3">
                        Faites une prédiction
                      </h3>
                      <p className="text-chocolate-600">
                        Utilisez le formulaire pour générer une prédiction des produits qui se vendront le mieux en fonction des paramètres.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recipes" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <NewRecipeForm onGenerate={handleRecipeGenerate} />
                </div>
                <div className="lg:col-span-2">
                  {hasRecipes ? (
                    <div>
                      <h2 className="text-2xl font-playfair font-semibold text-chocolate-800 mb-6">
                        Nouvelles Recettes Générées
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {newRecipes.map((recipe) => (
                          <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-cream-100 rounded-lg border border-chocolate-200">
                      <img 
                        src="/placeholder.svg" 
                        alt="Chocolat" 
                        className="w-32 h-32 mb-6 opacity-30 animate-float"
                      />
                      <h3 className="text-2xl font-playfair text-chocolate-700 mb-3">
                        Créez de nouvelles recettes
                      </h3>
                      <p className="text-chocolate-600">
                        Utilisez le formulaire pour générer de nouvelles recettes de chocolat basées sur vos préférences.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="packagings" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <PackagingForm onGenerate={handlePackagingGenerate} />
                </div>
                <div className="lg:col-span-2">
                  {hasPackagings ? (
                    <div>
                      <h2 className="text-2xl font-playfair font-semibold text-chocolate-800 mb-6">
                        Nouveaux Packagings Générés
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {newPackagings.map((packaging) => (
                          <PackagingCard key={packaging.id} packaging={packaging} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-cream-100 rounded-lg border border-chocolate-200">
                      <img 
                        src="/placeholder.svg" 
                        alt="Packaging" 
                        className="w-32 h-32 mb-6 opacity-30 animate-float"
                      />
                      <h3 className="text-2xl font-playfair text-chocolate-700 mb-3">
                        Créez de nouveaux packagings
                      </h3>
                      <p className="text-chocolate-600">
                        Utilisez le formulaire pour concevoir de nouveaux emballages pour vos chocolats.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <ChocolateFooter />
    </div>
  );
};

export default Index;
