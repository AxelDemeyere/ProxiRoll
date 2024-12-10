import axios, { AxiosError } from 'axios';

// Extend the AxiosInstance interface
declare module 'axios' {
  interface AxiosInstance {
    isAxiosError(error: any): error is AxiosError;
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

// Add request interceptor to log outgoing requests
api.interceptors.request.use(
  config => {
    console.log('[API REQUEST]', config.method?.toUpperCase(), config.url);
    console.log('[API REQUEST] Payload:', config.data);
    return config;
  },
  error => {
    console.error('[API REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => {
    console.log('[API RESPONSE]', response.config.method?.toUpperCase(), response.config.url);
    console.log('[API RESPONSE] Status:', response.status);
    console.log('[API RESPONSE] Data:', response.data);
    return response;
  },
  error => {
    console.error('[API FULL ERROR OBJECT]', error);

    if (error.response) {
      // Server responded with a status code outside of 2xx
      console.error('[API ERROR] Response Data:', error.response.data);
      console.error('[API ERROR] Status:', error.response.status);
      console.error('[API ERROR] Headers:', error.response.headers);
      
      // Throw a more informative error
      const errorMessage = error.response.data.message || 
                           error.response.data.error || 
                           'Server error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API ERROR] No response received:', error.request);
      throw new Error('Unable to connect to the server. Please check if the server is running.');
    } else {
      // Something else happened while setting up the request
      console.error('[API ERROR] Setup Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
);

// Add isAxiosError method to api instance
api.isAxiosError = (error: any): error is AxiosError => {
  return error instanceof AxiosError;
};

export default api;