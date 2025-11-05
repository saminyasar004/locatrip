import axios from 'axios';
import { baseURL } from 'config';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';

import { useRef } from 'react';

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [otp, setOTP] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  const { email } = useLocalSearchParams();

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      // update value at index
      const newOtp = [...otp];
      newOtp[index] = text;
      setOTP(newOtp);

      // auto-move to next input
      if (text && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const joinedOTP = otp.join('');
    if (joinedOTP.length < 4) {
      Toast.error('Please enter all 4 digits of the OTP');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/password-reset/verify-otp/`, {
        email,
        otp: joinedOTP,
      });

      if (response.status === 200) {
        Toast.success(response.data?.message || 'Successfully verified OTP!');
        router.push({
          pathname: '/auth/reset-password',
          params: {
            email: email,
          },
        });
      } else {
        Toast.error(
          response.data?.message ||
            response.data?.error ||
            'Failed to verify OTP. Please try again.'
        );
      }
    } catch (err: any) {
      console.error(err);
      Toast.error('Verification failed. Try again.');
    }
  };

  return (
    <SafeAreaView className="h-full w-full flex-1 bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Verify Your Identity!</Text>
            <Text className="font-light leading-6 text-white">
              We've sent a one-time password (OTP) to your email. Enter the code below and get
              started!
            </Text>
          </View>
        </View>

        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            <View className="flex w-full flex-row justify-center gap-3">
              {Array.from({ length: 4 }, (_, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => {
                    if (ref) inputRefs.current[i] = ref;
                  }}
                  className="h-20 w-20 rounded-2xl bg-accent p-5 text-center text-4xl font-medium text-foreground placeholder:text-[#63707C]"
                  placeholder="-"
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otp[i]}
                  onChangeText={(text) => handleChange(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  placeholderTextColor="#0F0F0F"
                />
              ))}
            </View>

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={handleVerifyOTP}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">Verify</Text>
              </TouchableHighlight>
            </View>

            <View className="flex w-full flex-row items-center justify-center gap-2">
              <Text className="text-lg">Didn't get OTP?</Text>
              <TouchableHighlight underlayColor="transparent">
                <Text className="text-lg font-medium text-primary underline">Resend</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>

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
