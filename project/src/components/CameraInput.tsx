import React, { useRef, useState } from 'react';

const CameraInput: React.FC<{ onCapture: (image: string, cropDetails: { quality: string; diseases: string[]; additionalInfo: string }) => void }> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cropDetails, setCropDetails] = useState<{ quality: string; diseases: string[]; additionalInfo: string } | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL('image/png');

      // Simulating crop details based on selected crop
      const simulatedCropDetails = getCropDetails(selectedCrop);
      setCropDetails(simulatedCropDetails);
      setCapturedImage(image);
      onCapture(image, simulatedCropDetails);
    }
  };

  const getCropDetails = (crop: string | null) => {
    switch (crop) {
      case 'Wheat':
        return {
          quality: "Good",
          diseases: ["Rust", "Blight"],
          additionalInfo: "Wheat is healthy with no major issues detected."
        };
      case 'Rice':
        return {
          quality: "Average",
          diseases: ["Brown Spot"],
          additionalInfo: "Rice shows signs of minor disease but is manageable."
        };
      case 'Cotton':
        return {
          quality: "Excellent",
          diseases: ["None detected"],
          additionalInfo: "Cotton is thriving with optimal growth conditions."
        };
      default:
        return {
          quality: "Unknown",
          diseases: ["N/A"],
          additionalInfo: "No specific details available."
        };
    }
  };

  const handleScanCrop = () => {
    if (selectedCrop) {
      setIsCameraActive(true);
      startCamera();
    } else {
      alert("Please select a crop type before scanning.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Crop Type:</label>
        <select 
          value={selectedCrop || ''} 
          onChange={(e) => setSelectedCrop(e.target.value)} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="">--Select Crop--</option>
          <option value="Wheat">Wheat</option>
          <option value="Rice">Rice</option>
          <option value="Cotton">Cotton</option>
        </select>
      </div>
      <button 
        onClick={handleScanCrop} 
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-150 mb-4"
      >
        Scan Crop
      </button>
      {isCameraActive && (
        <>
          <video ref={videoRef} autoPlay className="border-2 border-gray-300 rounded-lg mb-4" />
          <button onClick={captureImage} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-150">
            Capture
          </button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}
      {capturedImage && (
        <div className="mt-4">
          <img src={capturedImage} alt="Captured Crop" className="border-2 border-gray-300 rounded-lg mb-2" />
          {cropDetails && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Crop Quality: {cropDetails.quality}</h3>
              <h4 className="text-md font-semibold">Affected Diseases:</h4>
              <ul className="list-disc list-inside">
                {cropDetails.diseases.map((disease, index) => (
                  <li key={index}>{disease}</li>
                ))}
              </ul>
              <h4 className="text-md font-semibold mt-2">Additional Information:</h4>
              <p>{cropDetails.additionalInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraInput;
