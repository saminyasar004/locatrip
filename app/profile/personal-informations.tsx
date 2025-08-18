import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, SquarePen, Star } from 'lucide-react-native';
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

          <Text className="w-full text-lg font-semibold text-[#313131]">Personal Information</Text>
        </View>

        <View className="flex w-full flex-col gap-1 py-4">
          <View className="relative h-auto flex-row items-center justify-center py-5">
            {/* Avatar */}
            <View className="relative h-28 w-28 overflow-hidden rounded-full">
              <Image source={require('assets/avatar.jpg')} className="h-full w-full" />
            </View>
            <TouchableHighlight>
              <View className="absolute -bottom-12 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <SquarePen size={16} color="#ffffff" />
              </View>
            </TouchableHighlight>
          </View>

          <View className="my-2 flex w-full flex-col gap-2">
            <Text className="font-medium text-[#575757]">Full Name</Text>
            <View className="flex h-14 w-full flex-row items-center justify-start gap-3 rounded-lg bg-accent px-5">
              <TextInput className="max-w-[90%] text-foreground" placeholder="Enter your name" />
            </View>
          </View>

          <View className="my-2 flex w-full flex-col gap-2">
            <Text className="font-medium text-[#575757]">Email Address</Text>
            <View className="flex h-14 w-full flex-row items-center justify-start gap-3 rounded-lg bg-accent px-5">
              <TextInput
                className="max-w-[90%] text-foreground"
                placeholder="Enter your email address"
              />
            </View>
          </View>

          <View className="flex w-full items-center justify-center py-5">
            <TouchableHighlight
              onPress={() => router.push('/personalize/step2')}
              className="flex w-full items-center justify-center rounded-full bg-primary p-3 shadow-sm">
              <Text className="text-lg font-bold text-white">Edit Details</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Layout>
  );
}
