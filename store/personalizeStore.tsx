import axios from 'axios';
import { baseURL } from 'config';
import { create } from 'zustand';
import useAuthStore from './authStore';

export interface PreferenceProps {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

interface PersonalizeState {
  preferenceList: PreferenceProps[];
  personalizeItems: number[];
  personalizeItemsNames: string[];
  fetchAllPreferences: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  createPreference: (preferenceId: number[]) => Promise<void>;
}

const usePersonalizeStore = create<PersonalizeState>((set, get) => ({
  preferenceList: [],
  personalizeItems: [],
  isLoading: false,
  error: null,
  personalizeItemsNames: [],

  fetchAllPreferences: async () => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/api/personalize/interests/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('Preference response:', response.data);

      // Adjust this according to your backend's response structure
      console.log('Preference names:', response.data);
      // Save token securely
      set({
        preferenceList: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || error.message || 'Login failed',
        isLoading: false,
      });
    }
  },

  createPreference: async (preferenceId: number[]) => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });
    try {
      const prederData = { preferences: preferenceId };
      console.log('FormData being sent:', prederData);
      console.log('Access Token:', accessToken);
      const response = await axios.post(
        `${baseURL}/api/personalize/preferences/create/`,
        prederData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Preference response:', response.data);

      // Adjust this according to your backend's response structure
      const { message, preference_name } = response.data;
      console.log('Preference creation message:', message);
      console.log('Preference names:', preference_name);
      // Save token securely
      set({
        personalizeItemsNames: preference_name,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || error.message || 'Login failed',
        isLoading: false,
      });
    }
  },
}));

export default usePersonalizeStore;
