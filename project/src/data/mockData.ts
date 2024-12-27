import { MarketPrice, IoTData, Recommendation } from '../types';

export const marketPrices: MarketPrice[] = [
  { 
    crop: 'Paddy',
    price: 2150,
    unit: 'quintal',
    trend: 'up',
    lastUpdated: new Date().toISOString()
  },
  { 
    crop: 'Cotton',
    price: 8750,
    unit: 'quintal',
    trend: 'down',
    lastUpdated: new Date().toISOString()
  },
  { 
    crop: 'Red Chillies',
    price: 18500,
    unit: 'quintal',
    trend: 'up',
    lastUpdated: new Date().toISOString()
  },
  { 
    crop: 'Turmeric',
    price: 9200,
    unit: 'quintal',
    trend: 'stable',
    lastUpdated: new Date().toISOString()
  },
  { 
    crop: 'Groundnut',
    price: 5800,
    unit: 'quintal',
    trend: 'up',
    lastUpdated: new Date().toISOString()
  }
];

// Update recommendations for local crops
export const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Paddy Irrigation Alert',
    description: 'Water levels low for paddy cultivation. Irrigate with 5cm water depth.',
    priority: 'high',
    category: 'irrigation'
  },
  {
    id: '2',
    title: 'Cotton Pest Management',
    description: 'Pink bollworm detected. Apply neem-based pesticides within 2 days.',
    priority: 'high',
    category: 'pest'
  },
  {
    id: '3',
    title: 'Turmeric Fertilizer Schedule',
    description: 'Apply organic fertilizer rich in nitrogen for better rhizome development.',
    priority: 'medium',
    category: 'fertilizer'
  },
  {
    id: '4',
    title: 'Chilli Disease Prevention',
    description: 'High humidity levels - monitor for leaf spot disease. Consider preventive spraying.',
    priority: 'medium',
    category: 'pest'
  }
];

// Keep existing IoT data generation function
export const generateIoTData = (): IoTData => ({
  soilMoisture: Math.floor(Math.random() * (60 - 30) + 30),
  soilTemperature: Math.floor(Math.random() * (35 - 20) + 20),
  lightIntensity: Math.floor(Math.random() * (1000 - 200) + 200),
  timestamp: new Date().toISOString(),
});