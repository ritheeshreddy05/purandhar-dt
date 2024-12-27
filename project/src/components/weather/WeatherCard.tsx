import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { WeatherData } from '../../types';
import LocationDisplay from './LocationDisplay';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Cloud className="h-6 w-6 mr-2 text-blue-500" />
        Current Weather
      </h2>
      <LocationDisplay location={weather.location} />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Thermometer className="h-5 w-5 mr-2 text-red-500" />
          <span>{weather.temperature}°C</span>
        </div>
        <div className="flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-blue-500" />
          <span>{weather.humidity}% Humidity</span>
        </div>
        <div className="flex items-center">
          <Wind className="h-5 w-5 mr-2 text-gray-500" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center">
          <Cloud className="h-5 w-5 mr-2 text-gray-500" />
          <span>{weather.description}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;