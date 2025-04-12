import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChocolateHeader from '@/components/ChocolateHeader';
import ChocolateFooter from '@/components/ChocolateFooter';
import PredictionInputForm from '@/components/PredictionInputForm';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';
import * as tf from '@tensorflow/tfjs'; // Importation de TensorFlow.js
import { encodeInputForModel } from '@/utils/preprocessing'; // Importation de l'encodeur

let model = null;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('/model/model.json'); // Charger le modèle TensorFlow.js
    console.log("Modèle chargé !");
  }
};

const Index = () => {
  const { toast } = useToast();
  const [topProducts, setTopProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("predictions");
  const [hasPredictions, setHasPredictions] = useState(false);

  const handlePredictionSubmit = async (formData) => {
    await loadModel();

    // Encoder les données d'entrée pour le modèle
    const inputTensor = encodeInputForModel({
      Fete_Proche: formData.Fete_Proche,
      Meteo: formData.Meteo,
      Jour_De_La_Semaine: formData.Jour_De_La_Semaine,
      Promotion: formData.Promotion,
      Conge: formData.Conge,
      Fin_Du_Mois: formData.Fin_Du_Mois,
      Evenement_Local: formData.Evenement_Local
    });

    // Faire une prédiction avec le modèle
    const prediction = model.predict(inputTensor);
    const result = await prediction.array(); // [vente_1, vente_2, ..., vente_7]

    // Créer une liste des produits avec leurs scores
    const predictedProducts = result[0].map((value, index) => ({
      id: index + 1,
      name: `Produit ${index + 1}`,
      score: value
    }));

    // Mettre à jour l'état avec les prédictions
    setTopProducts(predictedProducts);
    setHasPredictions(true);

    // Afficher un toast pour informer l'utilisateur
    toast({
      title: "Prédictions générées",
      description: "Les ventes estimées ont été calculées avec succès.",
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