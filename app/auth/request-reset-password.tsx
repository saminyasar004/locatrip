import axios from 'axios';
import { baseURL } from 'config';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/api/support/submit/`,
        {
          email: email,
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setEmail('');
      router.push('/auth/verify-otp');
    } catch (error) {
      console.error('Request reset password error:', error);
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="h-full w-full flex-1 bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Trouble Loggin In?</Text>
            <Text className="font-light leading-6 text-white">
              No worries! Just enter your email address below, and we'll send you a link to reset
              your password.
            </Text>
          </View>
        </View>
        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Enter Email Address</Text>
              <TextInput
                className="h-14 rounded-lg bg-accent p-5 pl-5 text-foreground placeholder:text-[#63707C]"
                placeholder="Enter email address"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={handleSubmit}
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">
                  {loading ? 'Sending...' : 'Send'}
                </Text>
              </TouchableHighlight>
            </View>

            {error && <Text className="text-center text-red-500">{error}</Text>}
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
