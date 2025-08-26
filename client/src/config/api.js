// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:5555/api',
  AUTH_API: import.meta.env.VITE_AUTH_API || '/auth',
  RESTAURANT_API: import.meta.env.VITE_RESTAURANT_API || '/v1/restaurants',
  
  // For backward compatibility with json-server (local development)
  JSON_SERVER_URL: 'http://localhost:3001'
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_API}/login`,
    REGISTER: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_API}/register`,
    ME: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_API}/me`,
    LOGOUT: `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_API}/logout`,
  },
  
  // Restaurant endpoints (using json-server for now)
  RESTAURANTS: {
    BASE: `${API_CONFIG.JSON_SERVER_URL}/restaurants`,
    BY_ID: (id) => `${API_CONFIG.JSON_SERVER_URL}/restaurants/${id}`,
    // Future backend endpoints (ready for your backend friend)
    // BASE: `${API_CONFIG.BASE_URL}${API_CONFIG.RESTAURANT_API}`,
    // BY_ID: (id) => `${API_CONFIG.BASE_URL}${API_CONFIG.RESTAURANT_API}/${id}`,
  }
};

export default API_CONFIG;
