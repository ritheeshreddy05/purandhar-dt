import React from 'react';
import { useWeather } from '../hooks/useWeather';
import WeatherCard from '../components/WeatherCard';
import MarketPrices from '../components/MarketPrices';
import Recommendations from '../components/Recommendations';
import CameraInput from '../components/CameraInput'; // Importing CameraInput

const Dashboard: React.FC = () => {
  const { weather, loading, error } = useWeather();
  const [image, setImage] = React.useState<string | null>(null); // State to hold captured image

  const handleCapture = (capturedImage: string) => {
    setImage(capturedImage); // Set the captured image to state
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold text-center">Crop Disease Detection</h1>
      <div className="flex justify-center">
        <CameraInput onCapture={handleCapture} /> {/* Adding CameraInput component */}
      </div>
      {image && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-center">Captured Image:</h2>
          <img src={image} alt="Captured" className="mx-auto rounded-lg shadow-md" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weather && <WeatherCard weather={weather} />}
        <MarketPrices />
      </div>
      <Recommendations />
    </div>
  );
}

export default Dashboard;