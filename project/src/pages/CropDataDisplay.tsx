import React from 'react';

interface CropData {
  cropType: string;
  diseases: string[];
}

const CropDataDisplay: React.FC<{ data: CropData }> = ({ data }) => {
  return (
    <div>
      <h2>Crop Type: {data.cropType}</h2>
      <h3>Affected Diseases:</h3>
      <ul>
        {data.diseases.map((disease, index) => (
          <li key={index}>{disease}</li>
        ))}
      </ul>
    </div>
  );
};

export default CropDataDisplay;
