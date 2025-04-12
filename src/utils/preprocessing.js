// src/utils/preprocessing.js
import * as tf from "@tensorflow/tfjs";

// Mögliche Werte für Fete_Proche und Meteo – wie im Training benutzt
const HOLIDAY_OPTIONS = ["Pas_De_Fete", "Carnaval", "Paque"];
const WEATHER_OPTIONS = ["Pluie", "Ensoleille"];

/**
 * Wandelt Formulardaten in ein Eingabeformat für das Modell um.
 *
 * @param {Object} formData - Die Formulardaten (z. B. vom Formular)
 * @returns {tf.Tensor} - Ein 2D-Tensor mit einer Zeile
 */
export function encodeInputForModel(formData) {
    // One-Hot-Encoding für Fete_Proche
    const holidayEncoded = HOLIDAY_OPTIONS.map((option) =>
        formData.Fete_Proche === option ? 1 : 0
    );

    // One-Hot-Encoding für Meteo
    const weatherEncoded = WEATHER_OPTIONS.map((option) =>
        formData.Meteo === option ? 1 : 0
    );

    // Numerische / boolesche Felder
    const numericFields = [
        parseInt(formData.Jour_De_La_Semaine, 10) || 0,
        formData.Promotion ? 1 : 0,
        formData.Conge ? 1 : 0,
        formData.Fin_Du_Mois ? 1 : 0,
        formData.Evenement_Local ? 1 : 0,
    ];

    // Zusammenfügen
    const inputVector = [...holidayEncoded, ...weatherEncoded, ...numericFields];

    // 2D-Tensor erzeugen
    return tf.tensor2d([inputVector]);
}