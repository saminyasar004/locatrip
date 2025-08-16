import Layout from 'components/layout';
import { Link, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Car,
  ConciergeBell,
  Dumbbell,
  ExternalLink,
  Facebook,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UtensilsCrossed,
  WavesLadder,
  Wifi,
} from 'lucide-react-native';
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

          <Text className="w-full text-lg font-semibold text-[#313131]">
            Nearest Hotel & Resort
          </Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <Text className="text-2xl font-semibold">Peninsula Papagayo</Text>

          <Text className="text-base text-[#63707C]">
            Experience luxury at Peninsula Papagayo, a stunning beachfront resort offering
            world-class amenities, breathtaking ocean views, and exceptional service in the heart of
            Costa Rica's Gold Coast.
          </Text>

          <View className="flex w-full items-center justify-center py-2">
            <Image source={require('assets/hotel.jpg')} className="h-72 w-full rounded-xl" />
          </View>

          <View className="flex w-full flex-row items-center gap-2">
            <Star size={20} fill={'#E7AE33'} color={'#E7AE33'} />
            <Text className="text-lg font-bold">4.8</Text>
            <Text className="pl-1 text-base font-normal text-[#63707c]">324 reviews</Text>
          </View>

          <View className="flex w-full flex-row items-center justify-start gap-2">
            <MapPin size={18} color={'#F86241'} />
            <Text className="text-lg font-medium">Guanacaste Province, Costa Rica</Text>
          </View>

          <View className="flex w-full flex-col gap-3 py-3">
            <Text className="text-lg font-semibold">Amrnities</Text>

            <View className="flex w-full flex-row items-center justify-between">
              <View className="flex flex-row items-center justify-start gap-2">
                <Wifi size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">Free Wifi</Text>
              </View>

              <View className="flex flex-row items-center justify-start gap-2">
                <Car size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">Free Parking</Text>
              </View>
            </View>

            <View className="flex w-full flex-row items-center justify-between">
              <View className="flex flex-row items-center justify-start gap-2">
                <UtensilsCrossed size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">Restaurant</Text>
              </View>

              <View className="flex flex-row items-center justify-start gap-2">
                <WavesLadder size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">Swimming Pool</Text>
              </View>
            </View>

            <View className="flex w-full flex-row items-center justify-between">
              <View className="flex flex-row items-center justify-start gap-2">
                <Dumbbell size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">Fitness Center</Text>
              </View>

              <View className="flex flex-row items-center justify-start gap-2">
                <ConciergeBell size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">Room Service</Text>
              </View>
            </View>

            <View className="flex flex-row items-center justify-start gap-2">
              <ShieldCheck size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">24/7 Security</Text>
            </View>

            <View className="flex w-full flex-col gap-2 py-4">
              <Text className="text-xl font-semibold">Location</Text>

              <View className="flex w-full items-center justify-center py-4">
                <Image
                  source={require('assets/map.png')}
                  className="relative h-52 w-full rounded-xl"
                  resizeMode="cover"
                />
                <TouchableHighlight
                  onPress={() => router.push('/personalize/step1')}
                  className="absolute bottom-8 right-4 flex w-min items-center justify-center rounded-full bg-background px-3 py-1.5 shadow-sm"
                  underlayColor="transparent">
                  <View className="flex flex-row items-center gap-2">
                    <MapPin size={18} color={'#F86241'} />

                    <Text className="flex items-center text-base font-bold text-primary">
                      View Full Map
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <View className="flex w-full flex-col gap-3 py-3">
            <Text className="text-lg font-semibold">Contact</Text>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Phone size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">+506 2222 5555</Text>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Mail size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">info@cafemundo.cr</Text>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Facebook size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">@cafemundocr</Text>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <ExternalLink size={18} color={'#F86241'} />
              <Link
                href={'http://saminyasar.netlify.app'}
                className="text-lg font-medium text-primary underline">
                Visit Website
              </Link>
            </View>
          </View>

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">Guest Reviews</Text>
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
