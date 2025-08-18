// src/config/apiConfig.js
// Centralized API endpoint configuration

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8001";

const apiConfig = {
  BASE_URL: API_BASE_URL,
  CHAT: `${API_BASE_URL}/chat`,
  REGIONS: `${API_BASE_URL}/api/regions`,
  USER_REGIONS: `${API_BASE_URL}/api/user-regions`,
  PROJECT_TYPES: `${API_BASE_URL}/api/project-types`,
  WORKLOAD_TYPES: `${API_BASE_URL}/api/workload-types`,
  RECOMMEND: `${API_BASE_URL}/api/recommend`,
  // Add more endpoints as needed
};

export default apiConfig;
