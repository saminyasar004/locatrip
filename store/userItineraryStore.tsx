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

export interface PlaceProps {
  place_id: string;
  place_name: string;
  place_location: string;
  place_image: string;
  place_type: string;
  place_rating: string;
  place_description: string;
  place_lat?: number;
  place_long?: number;
}

export interface DayPlanProps {
  day_number: number;
  date: string;
  places: PlaceProps[];
}

export interface SuggestedPlaceProps {
  place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  total_rating: number;
  total_reviews: number;
  distance: number;
  thumbnail: string | null;
  type: string[];
}

export interface PlaceDetailsProps {
  place_id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  website: string;
  opening_hours: string[];
  photos: string[];
  total_rating?: number;
  total_reviews?: number;
  reviews?: {
    author: string;
    rating: number;
    text: string;
    time: string;
  }[];
  maps_link?: string;
}

interface UserItineraryState {
  itineraryList: ItineraryProps[];
  dayPlans: DayPlanProps[];
  isLoading: boolean;
  error: string | null;
  fetchActiveItineraries: () => Promise<void>;
  generateDay: (itineraryId: number) => Promise<any>;
  createItinerary: (payload: any) => Promise<any>;
  fetchAllDayPlans: (itineraryId: number) => Promise<void>;
  fetchSuggestedPlaces: (payload: any) => Promise<SuggestedPlaceProps[]>;
  fetchPlaceDetails: (payload: any) => Promise<PlaceDetailsProps | null>;
}

const useUserItineraryStore = create<UserItineraryState>((set, get) => ({
  itineraryList: [],
  dayPlans: [],
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
  fetchAllDayPlans: async (itineraryId: number) => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken } = useAuthStore.getState();
      const response = await axios.post(
        `${baseURL}/api/personalize/home/all_day_plans/`,
        { itinerary_id: itineraryId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 && response.data?.days) {
        set({ dayPlans: response.data.days, isLoading: false });
      } else {
        set({ dayPlans: [], isLoading: false });
      }
    } catch (error: any) {
      console.log('Fetch day plans error:', error);
      set({
        error: error?.response?.data?.message || error.message || 'Failed to fetch day plans',
        isLoading: false,
      });
    }
  },
  fetchSuggestedPlaces: async (payload: any) => {
    // We don't set global loading here to avoid flickering entire screen for partial updates
    try {
      const { accessToken } = useAuthStore.getState();
      const response = await axios.post(`${baseURL}/api/personalize/suggest/near_place/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error: any) {
      console.log('Fetch suggested places error:', error);
      return [];
    }
  },
  fetchPlaceDetails: async (payload: any) => {
    set({ isLoading: true, error: null });
    try {
      const { accessToken } = useAuthStore.getState();
      const response = await axios.post(`${baseURL}/api/personalize/place_details/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      set({ isLoading: false });
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error: any) {
      console.log('Fetch place details error:', error);
      set({
        error: error?.response?.data?.message || error.message || 'Failed to fetch place details',
        isLoading: false,
      });
      return null;
    }
  },
}));

export default useUserItineraryStore;
