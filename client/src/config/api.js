// API Configuration - Uses environment variables for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';

export default API_BASE_URL;
