// Devices/devicesAPI.js

export function fetchDeviceData() {
    return fetch('http://127.0.0.1:8000/device/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error fetching device data:', error);
        throw error;
      });
  }
  