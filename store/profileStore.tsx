import axios from 'axios';
import { baseURL } from 'config';
import { create } from 'zustand';
import useAuthStore from './authStore';

interface ProfileState {
  full_name: string;
  email: string;
  image: any | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (profileData: Partial<ProfileState>) => Promise<void>;
  init: (data: Partial<ProfileState>) => void;
  clearProfile: () => void;
}

const useProfileStore = create<ProfileState>((set, get) => ({
  full_name: '',
  email: '',
  image: null,
  isLoading: false,
  error: null,

  init: (data: Partial<ProfileState>) => {
    set({
      full_name: data.full_name,
      email: data.email,
      image: data.image,
    });
  },

  updateProfile: async (profileData: Partial<ProfileState>) => {
    const accessToken = useAuthStore.getState().accessToken;
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      if (profileData.full_name) formData.append('full_name', profileData.full_name);
      if (profileData.email) formData.append('email', profileData.email);

      if (profileData.image) {
        // Check if image is an object (from image picker) or string (url)
        // If it's from image picker, it will have uri, type, and name
        if (typeof profileData.image === 'object' && profileData.image.uri) {
          formData.append('image', {
            uri: profileData.image.uri,
            type: profileData.image.mimeType || 'image/jpeg',
            name: profileData.image.fileName || 'profile.jpg',
          } as any);
        }
      }

      console.log('FormData being sent:', formData);
      console.log('Access Token:', accessToken);
      const response = await axios.patch(`${baseURL}/api/profile/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
      });

      console.log('Profile update response:', response.data);

      const { full_name, email, image } = response.data;
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
