import axios from 'axios';
import { baseURL } from 'config';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';

export default function ResetPasswordPage() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = async () => {
    // Basic validation
    if (!password || !confirmPassword) {
      Toast.error('Please fill out both password fields');
      return;
    }
    if (password.length < 4) {
      Toast.error('Password must be at least 4 characters long');
      return;
    }
    if (password !== confirmPassword) {
      Toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/password-reset/set-new/`, {
        email,
        password,
        confirm_password: confirmPassword,
      });

      if (response.status === 200) {
        Toast.success(response.data?.message || 'Password reset successful!');
        router.replace('/auth/login');
      } else {
        Toast.error(
          response.data?.message ||
            response.data?.error ||
            'Failed to reset password. Please try again.'
        );
      }
    } catch (err: any) {
      console.error('Password reset failed:', err.message);
      Toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Password reset failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full w-full flex-1 bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Reset Your Password</Text>
            <Text className="font-light leading-6 text-white">
              Enter your new password below to reset your account.
            </Text>
          </View>
        </View>

        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            {/* Password Field */}
            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Enter New Password</Text>

              <View
                className="flex h-14 w-full flex-row items-center justify-between rounded-lg bg-accent pl-5 pr-5"
                style={{ borderColor: '#F86241', borderWidth: 0 }}>
                <TextInput
                  className="flex-1 text-foreground placeholder:text-[#63707C]"
                  placeholder="*********"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableHighlight
                  onPress={() => setShowPassword(!showPassword)}
                  underlayColor="transparent">
                  {showPassword ? (
                    <EyeOff color="#F86241" size={20} />
                  ) : (
                    <Eye color="#F86241" size={20} />
                  )}
                </TouchableHighlight>
              </View>
            </View>

            {/* Confirm Password Field */}
            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Confirm Password</Text>

              <View
                className="flex h-14 w-full flex-row items-center justify-between rounded-lg bg-accent pl-5 pr-5"
                style={{ borderColor: '#F86241', borderWidth: 0 }}>
                <TextInput
                  className="flex-1 text-foreground placeholder:text-[#63707C]"
                  placeholder="*********"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableHighlight
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  underlayColor="transparent">
                  {showConfirmPassword ? (
                    <EyeOff color="#F86241" size={20} />
                  ) : (
                    <Eye color="#F86241" size={20} />
                  )}
                </TouchableHighlight>
              </View>
            </View>

            {/* Remember Me (optional UI) */}
            <View className="flex w-full flex-row items-center justify-between gap-5">
              <BouncyCheckbox
                className="flex w-min items-center gap-2"
                size={20}
                fillColor="#F86241"
                unFillColor="#FFFFFF"
                textComponent={<Text className="font-medium">Remember me</Text>}
                iconStyle={{ borderColor: '#F86241' }}
                innerIconStyle={{ borderWidth: 1.5, borderRadius: 6 }}
                textStyle={{ fontFamily: 'Inter' }}
              />
            </View>

            {/* Confirm Button */}
            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={handleResetPassword}
                disabled={isLoading}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm"
                underlayColor="#F86241AA">
                <Text className="text-lg font-bold text-white">
                  {isLoading ? 'Resetting...' : 'Confirm'}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fix bottom safe inset background */}
      {insets.bottom > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: insets.bottom,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      )}
    </SafeAreaView>
  );
}
