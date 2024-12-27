import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, Sun, Umbrella, Clock } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  // Dummy data for weather
  const dummyWeather = {
    temperature: 25,
    description: 'Sunny',
    feelsLike: 27,
    humidity: 60,
    windSpeed: 15,
    uvIndex: 5,
    precipitation: 10,
    cloudCover: 20,
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Cloud className="h-6 w-6 mr-2 text-blue-500" />
          Current Weather
        </h2>
        <div className="text-sm text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>Updated {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {dummyWeather.temperature}°C
          </div>
          <div className="text-xl text-gray-600 capitalize">{dummyWeather.description}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <Thermometer className="h-8 w-8 mr-3 text-red-500" />
          <div>
            <div className="text-sm text-gray-500">Feels Like</div>
            <div className="font-semibold">{dummyWeather.feelsLike}°C</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <Droplets className="h-8 w-8 mr-3 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Humidity</div>
            <div className="font-semibold">{dummyWeather.humidity}%</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <Wind className="h-8 w-8 mr-3 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Wind Speed</div>
            <div className="font-semibold">{dummyWeather.windSpeed} km/h</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <Sun className="h-8 w-8 mr-3 text-yellow-500" />
          <div>
            <div className="text-sm text-gray-500">UV Index</div>
            <div className="font-semibold">{dummyWeather.uvIndex}</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <Umbrella className="h-8 w-8 mr-3 text-purple-500" />
          <div>
            <div className="text-sm text-gray-500">Precipitation</div>
            <div className="font-semibold">{dummyWeather.precipitation}%</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
          <Cloud className="h-8 w-8 mr-3 text-gray-500" />
          <div>
            <div className="text-sm text-gray-500">Cloud Cover</div>
            <div className="font-semibold">{dummyWeather.cloudCover}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;