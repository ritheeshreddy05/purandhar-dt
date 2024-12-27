import React from 'react';
import { Droplets, Thermometer, Sun } from 'lucide-react';
import { IoTData } from '../../types';

interface SensorStatusProps {
  data: IoTData;
}

const SensorStatus: React.FC<SensorStatusProps> = ({ data }) => {
  const getMoistureStatus = (value: number) => {
    if (value < 35) return { text: 'Low Moisture', color: 'text-red-600', bg: 'bg-red-50' };
    if (value > 55) return { text: 'High Moisture', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'Optimal Moisture', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const getTemperatureStatus = (value: number) => {
    if (value < 25) return { text: 'Cool Temperature', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (value > 32) return { text: 'High Temperature', color: 'text-red-600', bg: 'bg-red-50' };
    return { text: 'Optimal Temperature', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const getLightStatus = (value: number) => {
    if (value < 300) return { text: 'Low Light', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (value > 800) return { text: 'High Light', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { text: 'Optimal Light', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const moistureStatus = getMoistureStatus(data.soilMoisture);
  const temperatureStatus = getTemperatureStatus(data.soilTemperature);
  const lightStatus = getLightStatus(data.lightIntensity);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${moistureStatus.bg} p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Droplets className="h-8 w-8 text-blue-600" />
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${moistureStatus.color} ${moistureStatus.bg}`}>
            {moistureStatus.text}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Soil Moisture</h3>
        <div className="flex items-baseline">
          <p className="text-3xl font-bold text-gray-900">{data.soilMoisture}</p>
          <span className="text-lg ml-1 text-gray-600">%</span>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${temperatureStatus.bg} p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Thermometer className="h-8 w-8 text-red-600" />
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${temperatureStatus.color} ${temperatureStatus.bg}`}>
            {temperatureStatus.text}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Soil Temperature</h3>
        <div className="flex items-baseline">
          <p className="text-3xl font-bold text-gray-900">{data.soilTemperature}</p>
          <span className="text-lg ml-1 text-gray-600">°C</span>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${lightStatus.bg} p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Sun className="h-8 w-8 text-yellow-600" />
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${lightStatus.color} ${lightStatus.bg}`}>
            {lightStatus.text}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Light Intensity</h3>
        <div className="flex items-baseline">
          <p className="text-3xl font-bold text-gray-900">{data.lightIntensity}</p>
          <span className="text-lg ml-1 text-gray-600">lux</span>
        </div>
      </div>
    </div>
  );
};

export default SensorStatus;