
import React from 'react';

const ChocolateHeader = () => {
  return (
    <header className="w-full bg-gradient-to-r from-chocolate-800 via-chocolate-600 to-chocolate-700 py-6 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-chocolate-700">
                <path d="M9.5 8.5 7 11l2.5 2.5M14.5 8.5 17 11l-2.5 2.5M7 8a5 5 0 1 1 10 0 5 5 0 0 1-10 0"></path>
                <path d="M7 8a5 5 0 1 1 10 0 5 5 0 0 1-10 0M10 22a8 8 0 0 0 4 0M8 22a10 10 0 0 1 8 0M7 17.8a8 8 0 0 1-1-3.8"></path>
                <path d="M17 17.8a8 8 0 0 0 1-3.8"></path>
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-cream-100">ChocolaterieForecast</h1>
          </div>
          <div className="text-cream-100 italic font-playfair text-xl">
            La science au service du chocolat
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChocolateHeader;
