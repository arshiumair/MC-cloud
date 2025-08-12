// src/config/apiConfig.js
// Centralized API endpoint configuration

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://13.232.83.252:8000";

const apiConfig = {
  BASE_URL: API_BASE_URL,
  CHAT: `${API_BASE_URL}/chat`,
  REGIONS: `${API_BASE_URL}/api/regions`,
  USER_REGIONS: `${API_BASE_URL}/api/user-regions`,
  PROJECT_TYPES: `${API_BASE_URL}/api/project-types`,
  WORKLOAD_TYPES: `${API_BASE_URL}/api/workload-types`,
  // Add more endpoints as needed
};

export default apiConfig;
