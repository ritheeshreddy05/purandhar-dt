// Location defaults
export const DEFAULT_LOCATION = {
  city: 'Hyderabad',
  country: 'IN',
  coordinates: {
    lat: 17.3850,
    lon: 78.4867
  }
};

// API configuration
export const WEATHER_API = {
  key: import.meta.env.VITE_WEATHER_API_KEY,
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  geoUrl: 'https://api.openweathermap.org/geo/1.0'
};