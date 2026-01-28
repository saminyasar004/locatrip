import { baseURL } from '@/config';
import { create } from 'zustand';
import useAuthStore from './authStore';
import axios, { AxiosResponse } from 'axios';

export interface SubscriptionItemProps {
  id: number;
  plan_name: string;
  duration: number;
  price: number;
  itinerary_limit: number;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  feature_4: string;
  feature_5: string;
  feature_6: string;
  feature_7: string;
  feature_8: string;
  feature_9: string;
  feature_10: string;
}

export interface SubscriptionStoreState {
  payment: SubscriptionItemProps[];
  isLoading: boolean;
  error: string | null;
  fetchAllSubscription: () => Promise<AxiosResponse<any, any, {}> | undefined>;
  checkout: (plan_type: string) => Promise<AxiosResponse<any, any, {}> | undefined>;
  checkSubscriptionStatus: () => Promise<boolean>;
}

const useSubscriptionStore = create<SubscriptionStoreState>((set, get) => ({
  payment: [],
  isLoading: false,
  error: null,

  checkSubscriptionStatus: async () => {
    console.log('[StatusCheck] Checking subscription status...');
    set({ isLoading: true, error: null });
    try {
      const accessToken = useAuthStore.getState().accessToken;
      const response = await axios.get(`${baseURL}/api/payment/user/subscription/status/`, {
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      });

      console.log('[StatusCheck] API Response Received:', response.data);
      set({ isLoading: false });
      if (response.status === 200 && response.data?.active_subscription) {
        console.log('[StatusCheck] Active subscription confirmed.');
        return true;
      }
      console.log('[StatusCheck] No active subscription found.');
      return false;
    } catch (error: any) {
      console.error('[StatusCheck] Error checking status:', error.message);
      set({
        error: error?.response?.data?.message || error.message || 'Failed to check subscription',
        isLoading: false,
      });
      return false;
    }
  },

  fetchAllSubscription: async () => {
    set({ isLoading: true, error: null });
    try {
      const accessToken = useAuthStore.getState().accessToken;
      const response = await axios.get(`${baseURL}/api/payment/all_subscription_list/`, {
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        set({ payment: response.data.payment, isLoading: false, error: null });
      } else {
        set({
          payment: [],
          isLoading: false,
          error: response.data.message || response.data.detail || response.data.error,
        });
      }
      return response;
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || error.message || 'Login failed',
        isLoading: false,
      });
    }
  },

  checkout: async (plan_type: string) => {
    console.log(`[Checkout] Starting checkout for plan: ${plan_type}`);
    set({ isLoading: true, error: null });
    try {
      const accessToken = useAuthStore.getState().accessToken;
      console.log('[Checkout] Requesting checkout URL from API...');
      const response = await axios.post(
        `${baseURL}/api/payment/checkout/`,
        { plan_type },
        {
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        }
      );

      console.log('[Checkout] API Response Received:', {
        status: response.status,
        checkout_url: response.data?.checkout_url,
      });

      set({ isLoading: false, error: null });
      return response;
    } catch (error: any) {
      console.error('[Checkout] API Error:', {
        message: error.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });
      set({
        error: error?.response?.data?.message || error.message || 'Checkout failed',
        isLoading: false,
      });
    }
  },
}));

export default useSubscriptionStore;
