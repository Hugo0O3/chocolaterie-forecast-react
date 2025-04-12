import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const Predictor = () => {
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState([]);

    useEffect(() => {
        const loadModel = async () => {
            const loaded = await tf.loadLayersModel("/model/model.json");
            setModel(loaded);
            console.log("Modèle chargé !");
        };
        loadModel();
    }, []);

    const handlePredict = () => {
        if (!model) return;

        // 👉 Exemple d'entrée codée manuellement (à adapter selon tes vraies données)
        const input = tf.tensor2d([
            [1, 0, 0, 0, 1, 0, 0,  // One-hot pour 'Fete_Proche', 'Meteo', etc.
                1, 0, 1, 0, 1]        // Booléens pour Promotion, Conge, etc.
        ]);

        const output = model.predict(input);
        output.array().then(data => setPrediction(data[0]));
    };

    return (
        <div className="chocolate-card mt-8">
            <h2 className="text-xl font-bold mb-4">Prédiction de ventes</h2>
            <button onClick={handlePredict} className="chocolate-button">Prédire</button>
            {prediction.length > 0 && (
                <div className="mt-4">
                    {prediction.map((val, i) => (
                        <p key={i}>Vente {i + 1} : {val.toFixed(2)}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Predictor;
