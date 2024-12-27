import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Monitoring from './pages/Monitoring';
import Weather from './pages/Weather';
import CropDataDisplay from './pages/CropDataDisplay'; // Highlighting the correct feature

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="weather" element={<Weather />} />
          <Route path="crop-data-display" element={<CropDataDisplay />} /> {/* Highlighted route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;