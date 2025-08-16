import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';
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

          <Text className="w-full text-lg font-semibold text-[#313131]">Reviews</Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <View className="flex w-full flex-col gap-2 py-8">
            <Text className="text-center text-2xl font-medium">Café Mundo</Text>
            <Text className="text-center text-3xl font-semibold text-primary">4.5</Text>
            <Text className="text-center text-lg text-[#63707C]">100 reviews</Text>

            <View className="flex w-full flex-col gap-2 py-2">
              <View className="flex w-full flex-row items-center gap-3">
                <Text className="text-lg font-normal">5</Text>
                <Star size={18} fill={'#E7AE33'} color={'#E7AE33'} />
                <View className="flex h-2 flex-1 items-start rounded-full bg-[#D9D9D9]">
                  <View className="h-full w-[70%] rounded-full bg-[#EABE5E]"></View>
                </View>
                <Text className="text-lg font-medium">68</Text>
              </View>

              <View className="flex w-full flex-row items-center gap-3">
                <Text className="text-lg font-normal">4</Text>
                <Star size={18} fill={'#E7AE33'} color={'#E7AE33'} />
                <View className="flex h-2 flex-1 items-start rounded-full bg-[#D9D9D9]">
                  <View className="h-full w-[50%] rounded-full bg-[#EABE5E]"></View>
                </View>
                <Text className="text-lg font-medium">22</Text>
              </View>

              <View className="flex w-full flex-row items-center gap-3">
                <Text className="text-lg font-normal">3</Text>
                <Star size={18} fill={'#E7AE33'} color={'#E7AE33'} />
                <View className="flex h-2 flex-1 items-start rounded-full bg-[#D9D9D9]">
                  <View className="h-full w-[40%] rounded-full bg-[#EABE5E]"></View>
                </View>
                <Text className="text-lg font-medium">7</Text>
              </View>

              <View className="flex w-full flex-row items-center gap-3">
                <Text className="text-lg font-normal">2</Text>
                <Star size={18} fill={'#E7AE33'} color={'#E7AE33'} />
                <View className="flex h-2 flex-1 items-start rounded-full bg-[#D9D9D9]">
                  <View className="h-full w-[30%] rounded-full bg-[#EABE5E]"></View>
                </View>
                <Text className="text-lg font-medium">2</Text>
              </View>

              <View className="flex w-full flex-row items-center gap-3">
                <Text className="text-lg font-normal">1</Text>
                <Star size={18} fill={'#E7AE33'} color={'#E7AE33'} />
                <View className="flex h-2 flex-1 items-start rounded-full bg-[#D9D9D9]">
                  <View className="h-full w-[10%] rounded-full bg-[#EABE5E]"></View>
                </View>
                <Text className="text-lg font-medium">1</Text>
              </View>
            </View>
          </View>

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">Feedback</Text>
            <Text className="text-base font-semibold text-primary">View All</Text>
          </View>

          <View className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Image source={require('assets/avatar.jpg')} className="h-10 w-10 rounded-full" />

              <View className="flex flex-col">
                <Text className="text-lg font-medium">Maria Rodriguez</Text>
                <View className="flex flex-row items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                  ))}
                  <Text className="pl-2 text-sm text-[#63707C]">2 days ago</Text>
                </View>
              </View>
            </View>
            <View className="flex w-full items-center">
              <Text className="text-base text-[#63707C]">
                Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The
                atmosphere is cozy and the staff is incredibly friendly. The presentation was
                beautiful and every bite was flavorful
              </Text>
            </View>
          </View>

          <View className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Image source={require('assets/avatar.jpg')} className="h-10 w-10 rounded-full" />

              <View className="flex flex-col">
                <Text className="text-lg font-medium">Maria Rodriguez</Text>
                <View className="flex flex-row items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                  ))}
                  <Text className="pl-2 text-sm text-[#63707C]">2 days ago</Text>
                </View>
              </View>
            </View>
            <View className="flex w-full items-center">
              <Text className="text-base text-[#63707C]">
                Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The
                atmosphere is cozy and the staff is incredibly friendly. The presentation was
                beautiful and every bite was flavorful
              </Text>
            </View>
          </View>

          <View className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Image source={require('assets/avatar.jpg')} className="h-10 w-10 rounded-full" />

              <View className="flex flex-col">
                <Text className="text-lg font-medium">Maria Rodriguez</Text>
                <View className="flex flex-row items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                  ))}
                  <Text className="pl-2 text-sm text-[#63707C]">2 days ago</Text>
                </View>
              </View>
            </View>
            <View className="flex w-full items-center">
              <Text className="text-base text-[#63707C]">
                Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The
                atmosphere is cozy and the staff is incredibly friendly. The presentation was
                beautiful and every bite was flavorful
              </Text>
            </View>
          </View>

          <View className="bg rounded-white flex w-full flex-col gap-4 p-4">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Image source={require('assets/avatar.jpg')} className="h-10 w-10 rounded-full" />

              <View className="flex flex-col">
                <Text className="text-lg font-medium">Maria Rodriguez</Text>
                <View className="flex flex-row items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                  ))}
                  <Text className="pl-2 text-sm text-[#63707C]">2 days ago</Text>
                </View>
              </View>
            </View>
            <View className="flex w-full items-center">
              <Text className="text-base text-[#63707C]">
                Absolutely amazing experience! The Gallo Pinto was authentic and delicious. The
                atmosphere is cozy and the staff is incredibly friendly. The presentation was
                beautiful and every bite was flavorful
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
}
