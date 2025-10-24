import axios from 'axios';
import { baseURL } from 'config';
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface RegisterPayload {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UserProps {
    id: number;
    full_name: string;
    email: string;
}

interface AuthState {
    user: UserProps | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (userData: LoginPayload) => Promise<void>;
    register: (userData: RegisterPayload) => Promise<void>;
    fetchProfile: () => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

const ACCESS_TOKEN_KEY = 'access_token';

const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    //   login action
    login: async (userData) => {
        set({ isLoading: true, error: null });
        console.log("Logging in with data:", userData);
        try {
            const response = await axios.post(`${baseURL}/api/login/`, userData, {
                headers: { 'Content-Type': 'application/json' },
            });
            const { access, user } = response.data;
            console.log('Login response:', response.data);
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);

            set({
                user,
                accessToken: access,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            console.log('Login error:', error?.response?.data || error.message);
            set({
                error: error?.response?.data?.message || error.message || 'Login failed',
                isLoading: false,
            });
        }
    },

    // Register action
    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            console.log('Registering user with data:', userData);
            console.log('POST URL:', `${baseURL}/api/signup/`);
            const response = await axios.post(`${baseURL}/api/signup/`, userData, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000, // 10 seconds timeout
            });

            // Adjust this according to your backend's response structure
            const { access, user } = response.data;
            // Save token securely
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
            set({
                user,
                accessToken: access,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error: any) {
            console.log('Register error:', error?.response?.data || error.message);
            set({
                error: error?.response?.data?.message || error.message || 'Registration failed',
                isLoading: false,
            });
        }
    },

    // Fetch profile action
    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const token = get().accessToken || (await SecureStore.getItemAsync(ACCESS_TOKEN_KEY));
            console.log('Using access token:', token);
            if (!token) throw new Error('No access token found');
            const response = await axios.get(`${baseURL}/api/profile/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({
                user: response.data,
                isAuthenticated: true,
                isLoading: false,
                error: null,
                accessToken: token,
            });

            console.log('Fetched profile:', get().user);
        } catch (error: any) {
            set({
                error: error?.response?.data?.message || error.message || 'Failed to fetch profile',
                isAuthenticated: false,
                user: null,
                isLoading: false,
            });
        }
    },

    // Logout action
    logout: () => {
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        set({ user: null, accessToken: null, isAuthenticated: false, error: null });
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useAuthStore;
