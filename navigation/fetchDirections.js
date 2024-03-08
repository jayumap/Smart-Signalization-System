import axios from 'axios';

const fetchDirections = async (source, destination) => {
  try {
    const apiKey = 'AIzaSyCLwuB9Cl9UX1CQLziyNI0xCWy0D7l0Qzw';
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=${apiKey}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching directions:', error.message);
    return null;
  }
};

export default fetchDirections;
