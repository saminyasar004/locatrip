import axios from 'axios';
import { baseURL } from 'config';

const apiClient = axios.create({
  baseURL, // Or from env: __DEV__ ? 'http://localhost:3000' : 'prod-url'
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

import useAuthStore from '@/store/authStore';

// Interceptor for auth (e.g., token from Zustand or AsyncStorage)
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
