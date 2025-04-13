
import React, { useState, useEffect } from "react";
import { useToast } from '@/hooks/use-toast';

const Predictor = ({ formData, onPredictionComplete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (formData) {
            handlePredict();
        }
    }, [formData]);

    const handlePredict = async () => {
        if (!formData) return;
        
        setIsLoading(true);
        
        try {
            // Simuler un délai pour l'effet de prédiction
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Logique simplifiée de prédiction
            const predictions = generatePredictions(formData);
            
            console.log("Prédictions calculées:", predictions);
            
            if (onPredictionComplete) {
                onPredictionComplete(predictions);
            }
            
            toast({
                title: "Prédictions générées",
                description: "Les ventes estimées ont été calculées avec succès.",
                duration: 3000
            });
        } catch (error) {
            console.error("Erreur lors de la prédiction:", error);
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors du calcul des prédictions.",
                variant: "destructive",
                duration: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const generatePredictions = (data) => {
        // Calculer des scores pour 10 produits en fonction des paramètres
        const results = [];
        
        // Générer des scores basés sur les paramètres du formulaire
        for (let i = 1; i <= 10; i++) {
            let baseScore = Math.random() * 0.3 + 0.6; // Score de base entre 0.6 et 0.9
            
            // Ajuster le score en fonction des paramètres
            if (data.nearestHoliday === "valentine" || data.nearestHoliday === "christmas") {
                baseScore += 0.05;
            }
            
            if (data.hasPromotion) {
                baseScore += 0.07;
            }
            
            if (data.isWeekend) {
                baseScore += 0.03;
            }
            
            if (data.isHoliday) {
                baseScore += 0.04;
            }
            
            if (data.isBeginningOfMonth) {
                baseScore += 0.06;
            }
            
            if (data.hasLocalEvent) {
                baseScore += 0.04;
            }
            
            // Ajouter un peu d'aléatoire pour différencier les scores
            baseScore += (Math.random() * 0.1) - 0.05;
            
            // Limiter le score à 1
            baseScore = Math.min(baseScore, 0.98);
            
            results.push({
                id: i,
                score: baseScore,
                name: `Produit ${i}`,
                category: getRandomCategory(i)
            });
        }
        
        // Trier par score décroissant
        return results.sort((a, b) => b.score - a.score);
    };

    const getRandomCategory = (id) => {
        const categories = [
            "Tablettes", "Pralinés", "Truffes", "Fruits Enrobés", "Mendiants", 
            "Ganaches", "Pâtes à tartiner", "Bonbons", "Confiseries", "Spécialités"
        ];
        
        // Utiliser l'ID pour une distribution uniforme des catégories
        return categories[id % categories.length];
    };

    return (
        <div className="prediction-status">
            {isLoading && (
                <div className="text-center p-4">
                    <div className="animate-spin h-8 w-8 border-4 border-chocolate-600 rounded-full border-t-transparent mx-auto mb-2"></div>
                    <p>Prédiction en cours...</p>
                </div>
            )}
        </div>
    );
};

export default Predictor;
