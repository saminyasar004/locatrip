import axios from 'axios';
import { baseURL } from 'config';
import { create } from 'zustand';
import useAuthStore from './authStore';

interface ProfileState {
  full_name: string;
  email: string;
  image: File | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (profileData: ProfileState) => Promise<void>;
  clearProfile: () => void;
}

const useProfileStore = create<ProfileState>((set, get) => ({
  full_name: '',
  email: '',
  image: null,
  isLoading: false,
  error: null,

  updateProfile: async (profileData: ProfileState) => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      if (profileData.full_name) formData.append('full_name', profileData.full_name);
      if (profileData.email) formData.append('email', profileData.email);
      if (profileData.image) formData.append('image', profileData.image);
      console.log('FormData being sent:', formData);
      console.log('Access Token:', accessToken);
      const response = await axios.patch(`${baseURL}/api/profile/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
      });

      console.log('Profile update response:', response.data);

      // Adjust this according to your backend's response structure
      const { full_name, email, image } = response.data;
      // Save token securely
      set({
        full_name,
        email,
        image,
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

  clearProfile: () => {
    set({
      full_name: '',
      email: '',
      image: null,
    });
  },
}));

export default useProfileStore;
