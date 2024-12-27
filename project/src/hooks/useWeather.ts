import { useState, useEffect } from 'react';
import { WeatherData } from '../types';
import { generateMockWeather } from '../utils/mockWeather';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateWeather = () => {
      try {
        const mockWeather = generateMockWeather(); // Using mock data
        setWeather(mockWeather);
        setError(null);
      } catch (err) {
        setError('Failed to generate weather data');
      } finally {
        setLoading(false);
      }
    };

    updateWeather();
    const interval = setInterval(updateWeather, 5000); // Update every 5 seconds for demo

    return () => clearInterval(interval);
  }, []);

  return { weather, loading, error };
};