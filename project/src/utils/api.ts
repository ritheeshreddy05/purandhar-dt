import { WEATHER_API } from '../config/constants';

export const checkApiKey = () => {
  if (!WEATHER_API.key || WEATHER_API.key === 'YOUR_API_KEY') {
    throw new Error('Weather API key not configured. Please add your OpenWeatherMap API key to the .env file.');
  }
};

export const fetchWithErrorHandling = async (url: string) => {
  checkApiKey();
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
};