import React from 'react';
import { useWeather } from '../hooks/useWeather';
import WeatherCard from '../components/WeatherCard';
import MarketPrices from '../components/MarketPrices';
import Recommendations from '../components/Recommendations';

const Dashboard: React.FC = () => {
  const { weather, loading, error } = useWeather();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weather && <WeatherCard weather={weather} />}
        <MarketPrices />
      </div>
      <Recommendations />
    </div>
  );
}

export default Dashboard;