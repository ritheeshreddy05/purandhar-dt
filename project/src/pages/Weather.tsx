import React from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useWeather } from '../hooks/useWeather';
import WeatherCard from '../components/weather/WeatherCard';
import { Cloud, Droplets, Wind } from 'lucide-react';

const Weather: React.FC = () => {
  const { location, loading: locationLoading } = useGeolocation();
  const { weather, loading: weatherLoading, error } = useWeather(location);

  if (locationLoading || weatherLoading) {
    return <div className="text-center">Loading weather data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Weather Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherCard weather={weather} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Weather Impact</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Cloud className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Crop Conditions in {weather.location.city}</h3>
              </div>
              <p className="text-gray-600">
                Current weather conditions are {weather.description.toLowerCase()}, 
                which is {weather.temperature > 25 ? 'warm' : 'moderate'} for crop growth.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Droplets className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Irrigation Needs</h3>
              </div>
              <p className="text-gray-600">
                With {weather.humidity}% humidity and {weather.rainfall}mm rainfall,
                {weather.humidity < 60 ? ' additional irrigation may be needed.' : ' soil moisture levels should be adequate.'}
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Wind className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="font-medium">Wind Advisory</h3>
              </div>
              <p className="text-gray-600">
                Wind speed of {weather.windSpeed} km/h is
                {weather.windSpeed > 20 ? ' high. Consider protecting sensitive crops.' : ' normal for agricultural activities.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;