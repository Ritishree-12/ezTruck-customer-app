const BASE_URL = 'http://13.200.75.208:4001/v1/book';
import axios from 'axios';
export const getNearbyDrivers = async (latitude, longitude, authTokens) => {
    try {
      const response = await axios.get(`${BASE_URL}/nearbyDriver?latitude=${latitude}&longitude=${longitude}`, {
          headers: {
            'Authorization': `Bearer ${authTokens}`,
          },
        });
      if (!(response.data.status === "1")) {
        throw new Error('Network response was not ok');
      }
      console.log("Data for getNearbyDriver", response.data.data)
      return response.data.data;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };