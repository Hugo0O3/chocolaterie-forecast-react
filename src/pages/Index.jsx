
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChocolateHeader from '@/components/ChocolateHeader';
import ChocolateFooter from '@/components/ChocolateFooter';
import PredictionInputForm from '@/components/PredictionInputForm';
import ProductCard from '@/components/ProductCard';
import Predictor from '@/components/Predictor';
import NewRecipeForm from '@/components/NewRecipeForm';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [topProducts, setTopProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("predictions");
  const [hasPredictions, setHasPredictions] = useState(false);
  const [formData, setFormData] = useState(null);
  const [generatedRecipes, setGeneratedRecipes] = useState([]);

  const handlePredictionSubmit = (data) => {
    setFormData(data);
    toast({
      title: "Traitement en cours",
      description: "Nous calculons les prédictions de ventes...",
      duration: 3000
    });
  };

  const handlePredictionComplete = (results) => {
    // Trier les résultats par score en ordre décroissant
    const sortedResults = [...results].sort((a, b) => b.score - a.score);
    setTopProducts(sortedResults);
    setHasPredictions(true);
    
    toast({
      title: "Prédictions générées",
      description: "Les ventes estimées ont été calculées avec succès.",
      duration: 3000
    });
  };

  const handleRecipeGeneration = (recipes) => {
    setGeneratedRecipes(recipes);
    toast({
      title: "Recettes générées",
      description: `${recipes.length} nouvelles recettes ont été créées.`,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="relative z-10">
        <ChocolateHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-playfair font-bold text-chocolate-800 text-center mb-3 bg-cream-100/80 py-2 rounded-lg shadow-md">
              IA pour Chocolaterie
            </h1>
            <p className="text-lg text-chocolate-800 text-center mb-8 bg-cream-100/80 py-2 rounded-lg shadow-md">
              Prédictions de ventes et génération de recettes basées sur l'intelligence artificielle
            </p>

            <div className="bg-cream-100/90 p-6 rounded-lg shadow-xl">
              <Tabs
                defaultValue="predictions"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-8">
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
                </TabsList>

                <TabsContent value="predictions" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <PredictionInputForm onSubmit={handlePredictionSubmit} />
                      {/* Ajout du composant Predictor caché pour gérer les prédictions */}
                      <Predictor formData={formData} onPredictionComplete={handlePredictionComplete} />
                    </div>
                    <div className="lg:col-span-2">
                      {hasPredictions ? (
                        <div>
                          <h2 className="text-2xl font-playfair font-semibold text-chocolate-800 mb-6">
                            Top 10 des Produits à Promouvoir
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {topProducts.slice(0, 10).map((product, index) => (
                              <div key={product.id || index} className="relative">
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
                      <NewRecipeForm onGenerate={handleRecipeGeneration} />
                    </div>
                    <div className="lg:col-span-2">
                      {generatedRecipes.length > 0 ? (
                        <div>
                          <h2 className="text-2xl font-playfair font-semibold text-chocolate-800 mb-6">
                            Nouvelles Recettes Générées
                          </h2>
                          <div className="grid grid-cols-1 gap-6 relative">
                            {generatedRecipes.map((recipe, index) => (
                              <div key={recipe.id} className="relative">
                                <ProductCard product={{
                                  ...recipe,
                                  popularity: 80 + Math.floor(Math.random() * 20),
                                }} />
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
                            Générez des recettes
                          </h3>
                          <p className="text-chocolate-600">
                            Utilisez le formulaire pour créer de nouvelles recettes à base de chocolat avec l'aide de l'IA.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>

        <ChocolateFooter />
      </div>
    </div>
  );
};

export default Index;
