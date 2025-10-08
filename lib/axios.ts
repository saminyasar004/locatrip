import axios from 'axios';
import { baseURL } from 'config';

const apiClient = axios.create({
  baseURL, // Or from env: __DEV__ ? 'http://localhost:3000' : 'prod-url'
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for auth (e.g., token from Zustand or AsyncStorage)
apiClient.interceptors.request.use((config) => {
  // Example: const token = useAuthStore.getState().token;
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
