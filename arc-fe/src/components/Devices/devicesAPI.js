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
  


export function EditDeviceData(id, data) {
  return fetch(`http://127.0.0.1:8000/device/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
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
  
  

export function deleteDeviceData(id) {
  return fetch(`http://127.0.0.1:8000/device/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error deleting device data:', error);
      throw error;
    });
}
  