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

          <Text className="w-full text-lg font-semibold text-[#313131]">Notifications</Text>
        </View>

        <View className="flex w-full flex-col gap-3 py-4">
          <View className="flex w-full items-end py-3">
            <Text className="font-semibold text-primary">Mark all as read</Text>
          </View>

          <View className="flex w-full flex-row items-start gap-3 rounded-lg bg-primary/10 p-4">
            <View className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
              <Image source={require('assets/avatar.jpg')} className="h-full w-full" />
            </View>

            <View className="flex flex-1 flex-col gap-2">
              <Text className="font-normal">
                <Text className="font-semibold">John Doe</Text> invited you to the event{' '}
                <Text className="font-semibold">Sunset Volcano Island</Text>
              </Text>

              <Text className="text-sm font-normal text-[#63707C]">2h ago</Text>
            </View>
          </View>

          <View className="flex w-full flex-row items-start gap-3 rounded-lg bg-primary/10 p-4">
            <View className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
              <Image source={require('assets/avatar.jpg')} className="h-full w-full" />
            </View>

            <View className="flex flex-1 flex-col gap-2">
              <Text className="font-normal">
                <Text className="font-semibold">John Doe</Text> invited you to the event{' '}
                <Text className="font-semibold">Sunset Volcano Island</Text>
              </Text>

              <Text className="text-sm font-normal text-[#63707C]">2h ago</Text>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
}
