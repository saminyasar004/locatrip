import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Image, Text, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">Terms & Conditions</Text>
        </View>

        <View className="flex w-full flex-col gap-3 py-8">
          <Text className="text-2xl font-semibold text-primary">Last update 4 october 2024</Text>
          <Text className="leading-normal text-[#63707C]">
            Welcome to accessing and using our platform, you agree to be bound by these Terms &
            Conditions. These terms are designed to protect both you as a user and as a service
            provider. If you disagree with any part of these terms, we kindly ask that you refrain
            from using the platform.
          </Text>

          <Text className="text-2xl font-semibold text-primary">1. Acceptance of terms</Text>
          <Text className="leading-normal text-[#63707C]">
            By using the LangSwap platform, you agree to abide by these Terms & Conditions. If you
            do not agree to these terms, please refrain from using the platform.
          </Text>

          <Text className="text-2xl font-semibold text-primary">2. User responsibility</Text>
          <Text className="leading-normal text-[#63707C]">
            ou are responsible for maintaining the confidentiality of your account and for all
            activities that occur under your account. You agree not to use LangSwap for any illegal
            or unauthorized purposes
          </Text>
        </View>
      </View>
    </Layout>
  );
}
