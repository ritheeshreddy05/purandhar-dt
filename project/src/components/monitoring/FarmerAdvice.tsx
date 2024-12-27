import React from 'react';
import { AlertCircle, Languages } from 'lucide-react';

interface SensorData {
  soilMoisture: number;
  soilTemperature: number;
  lightIntensity: number;
}

interface FarmerAdviceProps {
  data: SensorData;
}

const FarmerAdvice: React.FC<FarmerAdviceProps> = ({ data }) => {
  const [language, setLanguage] = React.useState<'telugu' | 'english'>('english');

  const getAdvice = () => {
    const advice = [];
    
    if (data.soilMoisture < 35) {
      advice.push({
        telugu: 'నీటి పారుదల అవసరం - వెంటనే నీరు పెట్టండి',
        english: 'Irrigation needed - Water the crops immediately',
        priority: 'high',
        details: {
          telugu: 'నేల తేమ 35% కంటే తక్కువగా ఉంది. పంట ఆరోగ్యానికి వెంటనే నీరు అవసరం.',
          english: 'Soil moisture is below 35%. Immediate irrigation required for crop health.'
        }
      });
    }
    
    if (data.soilTemperature > 32) {
      advice.push({
        telugu: 'ఎక్కువ వేడి - మధ్యాహ్నం నీటి తడి ఇవ్వండి',
        english: 'High temperature - Provide afternoon irrigation',
        priority: 'medium',
        details: {
          telugu: 'నేల ఉష్ణోగ్రత 32°C పైన ఉంది. మధ్యాహ్నం నీటి తడి ఇవ్వడం వల్ల పంట వేడి తగ్గుతుంది.',
          english: 'Soil temperature is above 32°C. Afternoon irrigation will help reduce crop stress.'
        }
      });
    }

    if (data.lightIntensity < 300) {
      advice.push({
        telugu: 'తక్కువ వెలుతురు - పంటకు నీడ తగ్గించండి',
        english: 'Low light - Reduce shade on crops',
        priority: 'low',
        details: {
          telugu: 'కాంతి తీవ్రత 300 లక్స్ కంటే తక్కువగా ఉంది. మెరుగైన ఎదుగుదల కోసం పంటకు మరింత సూర్యరశ్మి అవసరం.',
          english: 'Light intensity is below 300 lux. More sunlight exposure needed for optimal growth.'
        }
      });
    }

    return advice;
  };

  const advice = getAdvice();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <AlertCircle className="h-6 w-6 mr-2 text-blue-500" />
          {language === 'telugu' ? 'రైతు సలహా' : 'Farmer Advice'}
        </h2>
        <button
          onClick={() => setLanguage(prev => prev === 'telugu' ? 'english' : 'telugu')}
          className="flex items-center px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          <Languages className="h-4 w-4 mr-2" />
          {language === 'telugu' ? 'English' : 'తెలుగు'}
        </button>
      </div>
      <div className="space-y-4">
        {advice.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              item.priority === 'high' ? 'bg-red-50 border-l-4 border-red-500' :
              item.priority === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
              'bg-blue-50 border-l-4 border-blue-500'
            }`}
          >
            <p className="text-lg font-medium mb-2">
              {language === 'telugu' ? item.telugu : item.english}
            </p>
            <p className="text-sm text-gray-600">
              {language === 'telugu' ? item.details.telugu : item.details.english}
            </p>
          </div>
        ))}
        {advice.length === 0 && (
          <div className="text-green-600 p-4 bg-green-50 rounded-lg">
            <p className="text-lg font-medium">
              {language === 'telugu' 
                ? 'అన్ని పరిస్థితులు సరిగ్గా ఉన్నాయి' 
                : 'All conditions are normal'}
            </p>
            <p className="text-sm mt-2">
              {language === 'telugu'
                ? 'ప్రస్తుతం పంట ఆరోగ్యంగా ఉంది. ఎటువంటి చర్యలు అవసరం లేదు.'
                : 'Your crops are currently healthy. No action required.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerAdvice;