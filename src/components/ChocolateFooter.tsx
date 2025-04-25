
import React from 'react';

const ChocolateFooter = () => {
  return (
    <footer className="w-full bg-chocolate-900 text-cream-100 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-playfair">ChocolaterieForecast</h3>
            <p className="text-sm text-cream-300 mt-1">Prévision des tendances chocolatées</p>
          </div>
          <div className="text-sm">
            <p>© {new Date().getFullYear()} ChocolaterieForecast. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ChocolateFooter;
