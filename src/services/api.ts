import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Changed from https to http
  headers: {
    'Content-Type': 'application/json'
  },
  // Add timeout to prevent long-hanging requests
  timeout: 5000
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with a status code outside of 2xx
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
      throw new Error('Unable to connect to the server. Please check if the server is running.');
    } else {
      // Something else happened while setting up the request
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
);

export default api;