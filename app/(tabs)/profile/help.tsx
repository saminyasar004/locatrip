import axios from 'axios';
import Layout from 'components/layout';
import { baseURL } from 'config';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Toast } from 'toastify-react-native';
import useAuthStore from 'store/authStore';

type Payload = {
  user_manual_email: string;
  description: string;
};

export default function Index() {
  const router = useRouter();

  const { accessToken } = useAuthStore();

  const [payload, setPayload] = useState<Payload>({
    user_manual_email: '',
    description: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/support/submit/`, payload, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 201) {
        Toast.success(response.data?.message || 'Successfully submitted!');
        router.push('/profile/');
      }

      setPayload({
        user_manual_email: '',
        description: '',
      });
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">Help & Support</Text>
        </View>

        <View className="flex w-full flex-col gap-3 py-4">
          <View className="flex w-full flex-1 items-center justify-center gap-3 py-8">
            <Image source={require('assets/locatrip.png')} className="h-24 w-24" />
            <Text className="flex-1 text-3xl font-semibold text-primary">LocaTrip</Text>
          </View>

          <View className="flex w-full flex-col gap-3 py-8">
            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Email Address</Text>
              <TextInput
                className="h-14 rounded-lg bg-accent p-5 pl-5 text-foreground placeholder:text-[#63707C]"
                onChangeText={(text) =>
                  setPayload((prev) => ({
                    ...prev,
                    user_manual_email: text,
                  }))
                }
                value={payload.user_manual_email}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter email address"
              />
            </View>

            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Descriptions</Text>
              <TextInput
                multiline
                numberOfLines={20}
                style={{ textAlignVertical: 'top' }}
                className="h-40 rounded-lg bg-accent p-5 pl-5 text-foreground placeholder:text-[#63707C]"
                placeholder="Write here..."
                onChangeText={(text) =>
                  setPayload((prev) => ({
                    ...prev,
                    description: text,
                  }))
                }
                value={payload.description}
              />
            </View>

            <TouchableHighlight
              className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm"
              onPress={handleSubmit}
              style={{
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}>
              <Text className="text-lg font-bold text-white">
                {loading ? 'Submitting...' : 'Submit'}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Layout>
  );
}
