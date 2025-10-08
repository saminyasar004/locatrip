import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from 'lib/axios';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from 'utils';

interface AuthUser {
  id: number;
  email: string;
  full_name: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}

interface OTPResponse {
  message: string;
}

interface ProfileResponse {
  id: number;
  email: string;
  full_name: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check token on mount
  useEffect(() => {
    getLocalStorageItem('access_token').then((token) => {
      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
      }
    });
  }, []);

  const {
    data: profileData,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery<ProfileResponse, Error>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/profile/');
      return data;
    },
    enabled: isAuthenticated,
  });

  // Handle success side effect (runs when data changes)
  useEffect(() => {
    if (profileData) {
      setUser(profileData);
      setError(null); // Clear any prior errors
    }
  }, [profileData]);

  // Handle error side effect (runs when error changes)
  useEffect(() => {
    if (profileError) {
      setError(profileError.message);
      removeLocalStorageItem('access_token');
      setIsAuthenticated(false);
    }
  }, [profileError]);

  // Signup mutation
  const registerMutation = useMutation({
    mutationFn: async (formData: {
      full_name: string;
      email: string;
      password: string;
      confirm_password: string;
    }) => {
      const { data } = await apiClient.post<AuthResponse>('/api/signup/', formData);
      console.log('It is from hook.');
      console.log(data);
      return data;
    },
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLocalStorageItem('access_token', data.access);
      setUser(data.user);
      setAccessToken(data.access);
      setIsAuthenticated(true);
      setError(null);
      setLoading(false);
    },
    onError: (err) => {
      const errorMsg = (err as any).response?.data?.[0] || 'Signup failed';
      setError(errorMsg);
      setLoading(false);
    },
  });

  const register = async (
    full_name: string,
    email: string,
    password: string,
    confirm_password: string
  ) => {
    return await registerMutation.mutateAsync({ full_name, email, password, confirm_password });
  };

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await apiClient.post<AuthResponse>('/api/login/', credentials);
      return data;
    },
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setLocalStorageItem('access_token', data.access);
      setUser(data.user);
      setAccessToken(data.access);
      setIsAuthenticated(true);
      setError(null);
      setLoading(false);
    },
    onError: (err) => {
      const errorMsg = (err as any).response?.data?.[0] || 'Login failed';
      setError(errorMsg);
      setLoading(false);
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  // Send OTP mutation
  const sendOTPMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await apiClient.post<OTPResponse>('/api/password-reset/send-otp/', {
        email,
      });
      return data;
    },
    onSuccess: (data) => {
      setError(null);
      // Toast: data.message
      console.log(data.message);
    },
    onError: (err) => {
      setError((err as any).response?.data?.[0] || 'OTP send failed');
    },
  });

  const sendOTP = (email: string) => {
    sendOTPMutation.mutate(email);
  };

  // Verify OTP mutation
  const verifyOTPMutation = useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const { data } = await apiClient.post<OTPResponse>('/accounts/password-reset/verify-otp/', {
        email,
        otp,
      });
      return data;
    },
    onSuccess: (data) => {
      setError(null);
      // Proceed to reset password or toast: data.message
      console.log(data.message);
    },
    onError: (err) => {
      setError((err as any).response?.data?.[0] || 'OTP verification failed');
    },
  });

  const verifyOTP = (email: string, otp: string) => {
    verifyOTPMutation.mutate({ email, otp });
  };

  // Logout
  const logout = () => {
    removeLocalStorageItem('access_token');
    setAccessToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  };

  return {
    isAuthenticated,
    accessToken,
    user: user || profileData, // Fallback to query data
    loading,
    error,
    login,
    register,
    sendOTP,
    verifyOTP,
    logout,
    refetchProfile,
  };
};
