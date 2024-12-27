import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, RefreshCw } from 'lucide-react';
import { marketPrices } from '../data/mockData';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const MarketPrices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [language, setLanguage] = useState<'en' | 'te'>('en'); // Language state

  const translations = {
    en: {
      title: "Market Prices",
      refresh: "Refresh",
      searchPlaceholder: "Search crops...",
      allTrends: "All Trends",
      increasing: "Increasing",
      decreasing: "Decreasing",
      stable: "Stable",
      items: "items",
      lastUpdated: "Last updated: ",
      languageToggle: "Switch to Telugu",
      cropNames: {
        "Wheat": "గోధుమలు",
        "Rice": "అన్నం",
        "Sugarcane": "చక్కెర కంచు",
        "Cotton": "కాటన్",
        "Maize": "మక్కజొన్న"
      }
    },
    te: {
      title: "మార్కెట్ ధరలు",
      refresh: "తాజా చేయండి",
      searchPlaceholder: "పంటలను శోధించండి...",
      allTrends: "అన్ని ధోరణులు",
      increasing: "పెరుగుతున్న",
      decreasing: "తగ్గుతున్న",
      stable: "స్థిర",
      items: "అంశాలు",
      lastUpdated: "చివరిగా నవీకరించబడింది: ",
      languageToggle: "Switch to English",
      cropNames: {
        "గోధుమలు": "Wheat",
        "అన్నం": "Rice",
        "చక్కెర కంచు": "Sugarcane",
        "కాటన్": "Cotton",
        "మక్కజొన్న": "Maize"
      }
    }
  };

  const filteredPrices = marketPrices
    .filter(item => {
      const cropName = language === 'en' ? item.crop : translations.te.cropNames[item.crop as keyof typeof translations.te.cropNames] || item.crop;
      return cropName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter(item => selectedFilter === 'all' ? true : item.trend === selectedFilter);

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{translations[language].title}</h2>
        <button 
          className="flex items-center space-x-1 text-green-600 hover:text-green-700"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-4 w-4" />
          <span className="text-sm">{translations[language].refresh}</span>
        </button>
        <button 
          className="text-sm text-blue-600 hover:text-blue-700"
          onClick={toggleLanguage}
        >
          {translations[language].languageToggle}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={translations[language].searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">{translations[language].allTrends}</option>
          <option value="up">{translations[language].increasing}</option>
          <option value="down">{translations[language].decreasing}</option>
          <option value="stable">{translations[language].stable}</option>
        </select>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {filteredPrices.map((item) => {
          const cropName = language === 'en' ? item.crop : translations.te.cropNames[item.crop as keyof typeof translations.te.cropNames] || item.crop;
          return (
            <div 
              key={item.crop} 
              className="flex items-center justify-between border-b pb-3 hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-medium text-lg">{cropName}</span>
                <span className="text-sm text-gray-500">per {item.unit}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className={`font-semibold text-lg ${getTrendColor(item.trend)}`}>
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.trend === 'up' ? '+' : ''}{item.changePercentage}% from yesterday
                  </span>
                </div>
                <div className={`${getTrendColor(item.trend)}`}>
                  {item.trend === 'up' && <TrendingUp className="h-5 w-5" />}
                  {item.trend === 'down' && <TrendingDown className="h-5 w-5" />}
                  {item.trend === 'stable' && <Minus className="h-5 w-5" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <span>{filteredPrices.length} {translations[language].items}</span>
        <span>{translations[language].lastUpdated} {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

export default MarketPrices;