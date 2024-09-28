import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummaryPage = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/summary')
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.error('Error fetching summary:', error);
      });
  }, []);

  return (
    <div className="p-4 h-screen w-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Geospatial Dataset Summary</h1>
        {summary ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">Dataset Information</h2>
            <p><strong>Number of Features:</strong> {summary.num_features}</p>
            <p><strong>Number of Attributes:</strong> {summary.num_attributes}</p>
            <h2 className="text-2xl font-bold mt-4 mb-2">Geometry Statistics</h2>
            <p><strong>Geometry Type:</strong> {summary.geometry_stats.geometry_type}</p>
            <p><strong>CRS:</strong> {summary.geometry_stats.crs}</p>
            <p><strong>Extent:</strong> {summary.geometry_stats.extent.join(', ')}</p>
            <p><strong>Total Area:</strong> {summary.geometry_stats.area}</p>
            <p><strong>Total Length:</strong> {summary.geometry_stats.length}</p>
          </div>
        ) : (
          <p>Loading summary...</p>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
