
import { Product } from '@/components/ProductCard';
import { PredictionFormData } from '@/components/PredictionInputForm';

// Une liste de produits fictifs pour simuler les données du modèle d'IA
const allProducts: Product[] = [
  {
    id: 1,
    name: "Tablette Noir Intense 85%",
    description: "Une tablette au goût prononcé avec des notes de fruits rouges et d'épices",
    popularity: 75,
    image: "/placeholder.svg",
    category: "Tablettes"
  },
  {
    id: 2,
    name: "Pralinés Noisette",
    description: "Chocolat au lait fourré d'un praliné onctueux aux noisettes torréfiées",
    popularity: 88,
    image: "/placeholder.svg",
    category: "Pralinés"
  },
  {
    id: 3,
    name: "Truffes Champagne",
    description: "Ganache légère au champagne enrobée de chocolat noir et de poudre de cacao",
    popularity: 92,
    image: "/placeholder.svg",
    category: "Truffes"
  },
  {
    id: 4,
    name: "Orangettes Confites",
    description: "Écorces d'orange confites enrobées de chocolat noir 70%",
    popularity: 68,
    image: "/placeholder.svg",
    category: "Fruits Enrobés"
  },
  {
    id: 5,
    name: "Mendiants Fruits Secs",
    description: "Palets de chocolat noir garnis d'amandes, de noisettes et de fruits confits",
    popularity: 72,
    image: "/placeholder.svg",
    category: "Mendiants"
  },
  {
    id: 6,
    name: "Ganache Framboise",
    description: "Ganache onctueuse à la framboise enrobée de chocolat noir",
    popularity: 80,
    image: "/placeholder.svg",
    category: "Ganaches"
  },
  {
    id: 7,
    name: "Rochers Praliné",
    description: "Cœur praliné croustillant enrobé de chocolat au lait et d'éclats de noisettes",
    popularity: 85,
    image: "/placeholder.svg",
    category: "Pralinés"
  },
  {
    id: 8,
    name: "Tablette Lait Caramel",
    description: "Chocolat au lait avec des éclats de caramel et une pointe de fleur de sel",
    popularity: 82,
    image: "/placeholder.svg",
    category: "Tablettes"
  },
  {
    id: 9,
    name: "Truffes Cognac",
    description: "Truffes au cognac fin et au chocolat noir corsé",
    popularity: 78,
    image: "/placeholder.svg",
    category: "Truffes"
  },
  {
    id: 10,
    name: "Tablette Blanc Vanille",
    description: "Chocolat blanc à la vanille de Madagascar et aux éclats de fèves de cacao",
    popularity: 70,
    image: "/placeholder.svg",
    category: "Tablettes"
  },
  {
    id: 11,
    name: "Bonbons Assortis",
    description: "Assortiment de bonbons au chocolat noir, lait et blanc avec différents parfums",
    popularity: 77,
    image: "/placeholder.svg",
    category: "Bonbons"
  },
  {
    id: 12,
    name: "Pâte à Tartiner Noisette",
    description: "Pâte à tartiner onctueuse au chocolat et aux noisettes torréfiées",
    popularity: 90,
    image: "/placeholder.svg",
    category: "Pâtes à tartiner"
  },
  {
    id: 13,
    name: "Tablette Noir & Poivre",
    description: "Chocolat noir rehaussé de baies de poivre de Sichuan",
    popularity: 65,
    image: "/placeholder.svg",
    category: "Tablettes"
  },
  {
    id: 14,
    name: "Cabosse Surprise",
    description: "Coque en chocolat en forme de cabosse garnie de mini-pralinés",
    popularity: 79,
    image: "/placeholder.svg",
    category: "Spécialités"
  },
  {
    id: 15,
    name: "Guimauves Chocolatées",
    description: "Guimauves moelleuses enrobées de chocolat noir ou au lait",
    popularity: 75,
    image: "/placeholder.svg",
    category: "Confiseries"
  }
];

// Fonction qui simule un modèle d'IA prédisant les 10 produits les plus susceptibles de se vendre
export const predictTopProducts = (params: PredictionFormData): Product[] => {
  // Calcul d'un score pour chaque produit en fonction des paramètres d'entrée
  const scoredProducts = allProducts.map(product => {
    let score = product.popularity;
    
    // Ajustements en fonction des paramètres
    
    // Fête la plus proche
    if (params.nearestHoliday === "valentine" && 
        (product.category === "Pralinés" || product.description.includes("cœur"))) {
      score += 15;
    } else if (params.nearestHoliday === "easter" && 
              (product.description.includes("oeuf") || product.description.includes("lapin"))) {
      score += 15;
    } else if (params.nearestHoliday === "christmas" && 
              (product.description.includes("épice") || product.description.includes("cannelle"))) {
      score += 15;
    }
    
    // Météo
    if (params.weather === "cold" && 
        (product.description.includes("chaud") || product.category === "Pâtes à tartiner")) {
      score += 10;
    } else if (params.weather === "hot" && 
              (product.description.includes("frais") || product.description.includes("fruit"))) {
      score += 10;
    }
    
    // Week-end
    if (params.isWeekend) {
      score += 5; // Les gens achètent plus de chocolat le week-end
    }
    
    // Promotion
    if (params.hasPromotion) {
      score += Math.random() * 10; // L'effet des promotions varie selon les produits
    }
    
    // Jour férié
    if (params.isHoliday) {
      score += 8; // Les ventes augmentent pendant les jours fériés
    }
    
    // Début du mois
    if (params.isBeginningOfMonth) {
      score += 7; // Les gens dépensent plus au début du mois (après paie)
    }
    
    // Événement local
    if (params.hasLocalEvent) {
      score += 6; // Plus de passage en magasin pendant les événements
    }
    
    // Ajout d'un facteur aléatoire pour rendre les prédictions moins déterministes
    score += Math.random() * 5;
    
    return { ...product, popularity: Math.min(Math.round(score), 100) };
  });
  
  // Trier par popularité décroissante et retourner les 10 premiers
  return scoredProducts.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
};
