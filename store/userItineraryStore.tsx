import { create } from 'zustand';
import axios from 'axios';
import { baseURL } from 'config';
import useAuthStore from './authStore';

export interface ItineraryProps {
  id: number;
  destination_name: string;
  latitude: number;
  longitude: number;
  trip_type: string;
  budget: string;
  duration: string;
  start_date: string;
  end_date: string;
  days_left: string;
  planning_progress: number;
}

interface UserItineraryState {
  itineraryList: ItineraryProps[];
  isLoading: boolean;
  error: string | null;
  fetchActiveItineraries: () => Promise<void>;
  generateDay: (itineraryId: number) => Promise<any>;
  createItinerary: (payload: any) => Promise<any>;
}

const useUserItineraryStore = create<UserItineraryState>((set, get) => ({
  itineraryList: [],
  isLoading: false,
  error: null,

  createItinerary: async (payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken } = useAuthStore.getState();
      const response = await axios.post(`${baseURL}/api/personalize/itineraries/create/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || error.message || 'Failed to create itinerary',
        isLoading: false,
      });
      return error.response || { status: 500, data: { message: error.message } };
    }
  },

  generateDay: async (itineraryId: number) => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken } = useAuthStore.getState();
      const response = await axios.post(
        `${baseURL}/api/personalize/preferences/generate_day/`,
        { itinerary_id: itineraryId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || error.message || 'Failed to generate day',
        isLoading: false,
      });
      return error.response;
    }
  },

  fetchActiveItineraries: async () => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken } = useAuthStore.getState();

      const response = await axios.get(`${baseURL}/api/personalize/active-itinerary/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Itinerary response:', response.data);

      // Adjust this according to your backend's response structure
      console.log('Itinerary names:', response.data);
      // Save token securely
      set({
        itineraryList: response.data,
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

export default useUserItineraryStore;
