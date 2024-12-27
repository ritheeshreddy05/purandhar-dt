import { useState, useEffect } from 'react';
import { LocationData } from '../types';
import { DEFAULT_LOCATION, WEATHER_API } from '../config/constants';
import { fetchWithErrorHandling } from '../utils/api';

export const useGeolocation = () => {
  const [location, setLocation] = useState<LocationData>(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocationDetails = async (latitude: number, longitude: number) => {
      try {
        const url = `${WEATHER_API.geoUrl}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${WEATHER_API.key}`;
        const [locationData] = await fetchWithErrorHandling(url);
        
        if (!locationData) {
          throw new Error('No location data found');
        }

        setLocation({
          city: locationData.name,
          country: locationData.country,
          coordinates: { lat: latitude, lon: longitude }
        });
      } catch (err) {
        console.warn('Using default location:', err);
        setLocation(DEFAULT_LOCATION);
      } finally {
        setLoading(false);
      }
    };

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      getLocationDetails(latitude, longitude);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.warn('Geolocation error:', error.message);
      setLocation(DEFAULT_LOCATION);
      setLoading(false);
    };

    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      setLocation(DEFAULT_LOCATION);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 5000,
      maximumAge: 300000 // 5 minutes
    });
  }, []);

  return { location, loading, error };
};