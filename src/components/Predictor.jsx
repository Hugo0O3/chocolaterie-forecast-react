
import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const Predictor = ({ formData, onPredictionComplete }) => {
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loaded = await tf.loadLayersModel("/model3/model.json");
                setModel(loaded);
                console.log("Modèle chargé avec succès !");
            } catch (error) {
                console.error("Erreur lors du chargement du modèle :", error);
            }
        };
        loadModel();
    }, []);

    useEffect(() => {
        if (model && formData) {
            handlePredict();
        }
    }, [model, formData]);

    const handlePredict = async () => {
        if (!model || !formData) return;
        
        setIsLoading(true);
        
        try {
            // Convertir formData en entrée pour le modèle
            const inputData = createInputTensor(formData);
            const inputTensor = tf.tensor2d(inputData);
            
            // Faire la prédiction
            const output = model.predict(inputTensor);
            const predictions = await output.array();
            
            console.log("Prédictions brutes:", predictions[0]);
            
            // Si onPredictionComplete est défini, appeler avec les résultats
            if (onPredictionComplete) {
                const results = predictions[0].map((val, idx) => ({
                    id: idx + 1,
                    score: val,
                }));
                onPredictionComplete(results);
            }
            
            // Nettoyage
            inputTensor.dispose();
            output.dispose();
        } catch (error) {
            console.error("Erreur lors de la prédiction:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createInputTensor = (data) => {
        // Créer un tableau avec des zéros pour toutes les catégories
        const inputArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
        // Fête proche (indices 0-5)
        if (data.nearestHoliday === "valentine") inputArray[0] = 1;
        else if (data.nearestHoliday === "easter") inputArray[1] = 1;
        else if (data.nearestHoliday === "christmas") inputArray[2] = 1;
        else if (data.nearestHoliday === "halloween") inputArray[3] = 1;
        else if (data.nearestHoliday === "mothersday") inputArray[4] = 1;
        else if (data.nearestHoliday === "fathersday") inputArray[5] = 1;
        
        // Météo (indices 6-7)
        if (data.weather === "sunny" || data.weather === "hot") inputArray[6] = 1;
        else if (data.weather === "rainy" || data.weather === "cold") inputArray[7] = 1;
        
        // Jour de la semaine (indice 8)
        if (data.isWeekend) inputArray[8] = 1;
        
        // Autres facteurs (indices 9-11)
        if (data.hasPromotion) inputArray[9] = 1;
        if (data.isHoliday) inputArray[10] = 1;
        if (data.isBeginningOfMonth) inputArray[11] = 1;
        
        return [inputArray];
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
