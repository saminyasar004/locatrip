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
  userPreferenceList: {
    preferences_id: number;
    preferences_name: string;
  }[];
  fetchAllPreferences: () => Promise<AxiosResponse<any>>;
  createPreference: (preferenceIds: number[]) => Promise<AxiosResponse<any>>;
  getUserPreferenceList: () => Promise<AxiosResponse<any>>;
  deleteUserPreferences: (preferenceIds: number[]) => Promise<AxiosResponse<any>>;
  isLoading: boolean;
  error: string | null;
}

const usePersonalizeStore = create<PersonalizeState>((set, get) => ({
  preferenceList: [],
  personalizeItems: [],
  userPreferenceList: [],
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
      console.log('Backend response data:', error.response?.data);
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
      console.log('Backend response data:', error.response?.data);
      console.error('Error creating preferences:', error.message);
      set({
        error: error?.response?.data?.message || error.message || 'Failed to create preferences',
        isLoading: false,
      });

      // Return a rejected promise so callers can handle it
      throw error;
    }
  },

  getUserPreferenceList: async (): Promise<AxiosResponse<any>> => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/api/personalize/preferences/user/list/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Save list securely
      set({
        userPreferenceList: response.data,
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error: any) {
      console.log('Backend response data:', error.response?.data);
      set({
        error:
          error?.response?.data?.message ||
          error.message ||
          'Failed to get all the users preferences list.',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteUserPreferences: async (preferenceIds: number[]) => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });
    try {
      const payload = { preferences: preferenceIds };

      const response = await axios.delete(`${baseURL}/api/personalize/preferences/delete/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: payload,
      });

      if (response.status === 200) {
        set({
          userPreferenceList: response.data.preference_name || [],
          isLoading: false,
          error: null,
        });
      }

      return response;
    } catch (error: any) {
      console.log('Backend response data:', error.response?.data);
      console.error('Error deleting preferences:', error.message);
      set({
        error: error?.response?.data?.message || error.message || 'Failed to delete preferences',
        isLoading: false,
      });

      // Return a rejected promise so callers can handle it
      throw error;
    }
  },
}));

export default usePersonalizeStore;
