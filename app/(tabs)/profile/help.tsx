import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
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
                className="h-14 rounded-lg bg-accent p-5 pl-5 text-foreground"
                placeholder="Enter email address"
              />
            </View>

            <View className="flex w-full flex-col gap-2">
              <Text className="font-semibold text-[#575757]">Descriptions</Text>
              <TextInput
                multiline
                numberOfLines={20}
                style={{ textAlignVertical: 'top' }}
                className="h-40 rounded-lg bg-accent p-5 pl-5 text-foreground"
                placeholder="Write here..."
              />
            </View>

            <TouchableHighlight className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
              <Text className="text-lg font-bold text-white">Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Layout>
  );
}
