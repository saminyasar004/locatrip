import axios, { Axios, AxiosResponse } from 'axios';
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
  createPreference: (preferenceIds: number[]) => Promise<AxiosResponse<any>>;
  getUserPreferenceList: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  createPreference: (preferenceIds: number[]) => Promise<AxiosResponse<any>>;
}

const usePersonalizeStore = create<PersonalizeState>((set, get) => ({
  preferenceList: [],
  personalizeItems: [],
  isLoading: false,
  error: null,
  personalizeItemsNames: [],

  fetchAllPreferences: async (): Promise<AxiosResponse<any>> => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/api/personalize/interests/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log('Preference response:', response.data);

      // Adjust this according to your backend's response structure
      console.log('Preference names:', response.data);

      if (response.status === 200) {
      // Save token securely
      set({
        preferenceList: response.data,
        isLoading: false,
        error: null,
      });
      }
      return response;
    } catch (error: any) {
      set({
        error:
          error?.response?.data?.message || error.message || 'Failed to fetch all the preferences.',
        isLoading: false,
      });
      throw error;
    }
  },

  createPreference: async (preferenceIds: number[]): Promise<AxiosResponse<any>> => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });

    try {
      const payload = { preferences: preferenceIds };

      const response = await axios.post(`${baseURL}/api/personalize/preferences/create/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { preference_name } = response.data;

      set({
        personalizeItemsNames: preference_name || [],
        isLoading: false,
        error: null,
      });

      return response;
    } catch (error: any) {
      console.error('Error creating preferences:', error.message);
      set({
        error: error?.response?.data?.message || error.message || 'Failed to create preferences',
        isLoading: false,
      });

      // Return a rejected promise so callers can handle it
      throw error;
    }
  },
}));

export default usePersonalizeStore;
