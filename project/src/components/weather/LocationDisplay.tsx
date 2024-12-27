import React from 'react';
import { MapPin, Globe, Navigation } from 'lucide-react';
import { LocationData } from '../../types';

interface LocationDisplayProps {
  location: LocationData;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ location }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6 hover:bg-blue-100 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 rounded-full p-2">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">
              {location.city}
            </span>
            <div className="flex items-center space-x-2 text-gray-600">
              <Globe className="h-4 w-4" />
              <span className="text-sm">{location.country}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
          <Navigation className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {location.coordinates.lat.toFixed(2)}°N, {location.coordinates.lon.toFixed(2)}°E
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;