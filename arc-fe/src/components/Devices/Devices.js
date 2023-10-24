// Devices/Devices.js
import React, { useState, useEffect } from 'react';
import CustomTable from '../Common/Table';
import { fetchDeviceData } from './devicesAPI';

function Devices() {
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    // Fetch device data using devicesAPI
    fetchDeviceData()
      .then((data) => setDeviceData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Device Data:</h1>
      <CustomTable data={deviceData} />
    </div>
  );
}

export default Devices;
