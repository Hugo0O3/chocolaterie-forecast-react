
import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  CloudSnow, 
  CloudSun, 
  BadgePercent, 
  Calendar, 
  MapPin, 
  Check 
} from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';

export interface PredictionFormData {
  nearestHoliday: string;
  weather: string;
  isWeekend: boolean;
  hasPromotion: boolean;
  isHoliday: boolean;
  isBeginningOfMonth: boolean;
  hasLocalEvent: boolean;
}

interface PredictionInputFormProps {
  onSubmit: (data: PredictionFormData) => void;
  className?: string;
}

const holidays = [
  { id: "valentine", name: "Saint-Valentin", date: "2025-02-14" },
  { id: "easter", name: "Pâques", date: "2025-04-20" },
  { id: "christmas", name: "Noël", date: "2025-12-25" },
  { id: "halloween", name: "Halloween", date: "2025-10-31" },
  { id: "mothersday", name: "Fête des mères", date: "2025-05-25" },
  { id: "fathersday", name: "Fête des pères", date: "2025-06-15" },
];

const weatherOptions = [
  { id: "sunny", name: "Ensoleillé", icon: CloudSun },
  { id: "rainy", name: "Pluvieux", icon: CloudSnow },
  { id: "cold", name: "Froid", icon: CloudSnow },
  { id: "hot", name: "Chaud", icon: CloudSun },
  { id: "mild", name: "Tempéré", icon: CloudSun },
];

const PredictionInputForm: React.FC<PredictionInputFormProps> = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState<PredictionFormData>({
    nearestHoliday: "",
    weather: "",
    isWeekend: false,
    hasPromotion: false,
    isHoliday: false,
    isBeginningOfMonth: false,
    hasLocalEvent: false,
  });

  // Trouve la fête la plus proche
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Calculer les différences de dates
    const holidaysWithDiff = holidays.map(holiday => {
      const holidayDate = new Date(holiday.date);
      const diffTime = holidayDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { ...holiday, diffDays: diffDays > 0 ? diffDays : 365 + diffDays }; // Si négatif, ça signifie l'année prochaine
    });
    
    // Trier par proximité
    holidaysWithDiff.sort((a, b) => a.diffDays - b.diffDays);
    
    // Mettre à jour le state avec la fête la plus proche
    if (holidaysWithDiff.length > 0) {
      setFormData(prev => ({
        ...prev,
        nearestHoliday: holidaysWithDiff[0].id
      }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof PredictionFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6 p-6 bg-white rounded-lg shadow-md border border-chocolate-100", className)}>
      <h2 className="text-2xl font-playfair text-chocolate-800 mb-6">Paramètres de prédiction</h2>
      
      {/* Fête la plus proche */}
      <div className="space-y-2">
        <Label htmlFor="nearestHoliday" className="flex items-center text-chocolate-700">
          <CalendarDays className="mr-2 h-5 w-5 text-chocolate-500" />
          Fête la plus proche
        </Label>
        <Select 
          value={formData.nearestHoliday} 
          onValueChange={(value) => handleChange('nearestHoliday', value)}
        >
          <SelectTrigger className="chocolate-input">
            <SelectValue placeholder="Sélectionnez une fête" />
          </SelectTrigger>
          <SelectContent>
            {holidays.map((holiday) => (
              <SelectItem key={holiday.id} value={holiday.id}>
                {holiday.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Météo */}
      <div className="space-y-2">
        <Label htmlFor="weather" className="flex items-center text-chocolate-700">
          <CloudSun className="mr-2 h-5 w-5 text-chocolate-500" />
          Météo
        </Label>
        <Select 
          value={formData.weather} 
          onValueChange={(value) => handleChange('weather', value)}
        >
          <SelectTrigger className="chocolate-input">
            <SelectValue placeholder="Sélectionnez la météo" />
          </SelectTrigger>
          <SelectContent>
            {weatherOptions.map((weather) => (
              <SelectItem key={weather.id} value={weather.id}>
                <div className="flex items-center">
                  <weather.icon className="mr-2 h-4 w-4" />
                  {weather.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Checkbox 
            id="isWeekend" 
            checked={formData.isWeekend}
            onCheckedChange={(checked) => handleChange('isWeekend', !!checked)}
            className="chocolate-checkbox"
          />
          <Label htmlFor="isWeekend" className="flex items-center text-chocolate-700 cursor-pointer">
            <Calendar className="mr-2 h-5 w-5 text-chocolate-500" />
            Week-end
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox 
            id="hasPromotion" 
            checked={formData.hasPromotion}
            onCheckedChange={(checked) => handleChange('hasPromotion', !!checked)}
            className="chocolate-checkbox"
          />
          <Label htmlFor="hasPromotion" className="flex items-center text-chocolate-700 cursor-pointer">
            <BadgePercent className="mr-2 h-5 w-5 text-chocolate-500" />
            Promotion en cours
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox 
            id="isHoliday" 
            checked={formData.isHoliday}
            onCheckedChange={(checked) => handleChange('isHoliday', !!checked)}
            className="chocolate-checkbox"
          />
          <Label htmlFor="isHoliday" className="flex items-center text-chocolate-700 cursor-pointer">
            <CalendarDays className="mr-2 h-5 w-5 text-chocolate-500" />
            Jour férié / Congé
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox 
            id="isBeginningOfMonth" 
            checked={formData.isBeginningOfMonth}
            onCheckedChange={(checked) => handleChange('isBeginningOfMonth', !!checked)}
            className="chocolate-checkbox"
          />
          <Label htmlFor="isBeginningOfMonth" className="flex items-center text-chocolate-700 cursor-pointer">
            <Calendar className="mr-2 h-5 w-5 text-chocolate-500" />
            Début du mois
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox 
            id="hasLocalEvent" 
            checked={formData.hasLocalEvent}
            onCheckedChange={(checked) => handleChange('hasLocalEvent', !!checked)}
            className="chocolate-checkbox"
          />
          <Label htmlFor="hasLocalEvent" className="flex items-center text-chocolate-700 cursor-pointer">
            <MapPin className="mr-2 h-5 w-5 text-chocolate-500" />
            Événement local en ce moment
          </Label>
        </div>
      </div>

      <button type="submit" className="chocolate-button w-full flex items-center justify-center">
        <Check className="mr-2 h-5 w-5" />
        Générer les prédictions
      </button>
    </form>
  );
};

export default PredictionInputForm;
