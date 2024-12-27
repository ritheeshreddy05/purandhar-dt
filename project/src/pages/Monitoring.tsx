import React, { useState, useEffect } from 'react';
import { generateIoTData } from '../data/mockData';
import { IoTData } from '../types';
import SensorStatus from '../components/monitoring/SensorStatus';
import FarmerAdvice from '../components/monitoring/FarmerAdvice';

const Monitoring: React.FC = () => {
  const [data, setData] = useState<IoTData>(generateIoTData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateIoTData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">పొలం పరిస్థితి</h1>
        <p className="text-sm text-gray-500">
          చివరి నవీకరణ: {new Date().toLocaleTimeString()}
        </p>
      </div>
      
      <SensorStatus data={data} />
      <FarmerAdvice data={data} />
    </div>
  );
}

export default Monitoring;