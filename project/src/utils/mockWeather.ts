import { WeatherData } from '../types';
import { DEFAULT_LOCATION } from '../config/constants';

// Weather conditions typical for Hyderabad's climate
const descriptions = [
  'Clear sky',
  'Few clouds',
  'Scattered clouds',
  'Partly cloudy',
  'Hazy sunshine',
  'Hot and humid'
];

export const generateMockWeather = (): WeatherData => {
  const now = new Date();
  const hour = now.getHours();

  // Simulate temperature variation throughout the day
  const baseTemp = hour >= 6 && hour <= 18 ? 32 : 25; // Warmer during day
  const tempVariation = Math.random() * 5 - 2.5;
  
  // Simulate humidity variation (typically higher in morning/evening)
  const baseHumidity = hour >= 6 && hour <= 18 ? 45 : 65;
  const humidityVariation = Math.random() * 20 - 10;

  return {
    temperature: Math.round(baseTemp + tempVariation),
    humidity: Math.round(baseHumidity + humidityVariation),
    rainfall: Math.random() < 0.1 ? Math.round(Math.random() * 5) : 0, // 10% chance of rain
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    windSpeed: Math.round(Math.random() * 15 + 5), // 5-20 km/h
    location: DEFAULT_LOCATION
  };
};