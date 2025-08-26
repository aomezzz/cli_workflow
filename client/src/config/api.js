// API Configuration for Backend
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'
};

// API Endpoints - Backend API only
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: `${API_CONFIG.BASE_URL}/v1/auth/signin`,
    REGISTER: `${API_CONFIG.BASE_URL}/v1/auth/signup`
  },
  
  // Restaurant endpoints
  RESTAURANTS: {
    BASE: `${API_CONFIG.BASE_URL}/v1/restaurant`,
    BY_ID: (id) => `${API_CONFIG.BASE_URL}/v1/restaurant/${id}`
  }
};

export default API_CONFIG;
