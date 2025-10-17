import Layout from 'components/layout';
import { Link, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Clock,
  Dot,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Palette,
  Phone,
  Star,
  Twitter,
  UserStar,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Image, Text, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const AboutTab = () => (
  <View className="w-full flex-1 flex-col gap-3 py-6">
    <Text className="text-lg font-semibold">About the Gallery</Text>

    <Text className="text-base font-normal text-[#63707C]">
      The Francisco Amighetti Gallery is a premier contemporary art space in San José, dedicated to
      showcasing the finest works of Costa Rican and international artists. Named after the renowned
      Costa Rican artist Francisco Amighetti, our gallery has been a cultural cornerstone since
      1985.
    </Text>

    <Text className="text-base font-normal text-[#63707C]">
      We specialize in contemporary paintings, sculptures, and mixed media works that reflect the
      rich cultural heritage and natural beauty of Costa Rica. Our mission is to promote local
      artists while introducing international perspectives to our community.
    </Text>

    <Text className="text-lg font-semibold">Artist Biography</Text>

    <Text className="text-base font-normal text-[#63707C]">
      Francisco Amighetti (1907-1998) was one of Costa Rica's most celebrated artists, known for his
      woodcuts, paintings, and illustrations. His work often depicted Costa Rican landscapes,
      people, and cultural traditions, making him a pivotal figure in the country's artistic
      heritage.
    </Text>
  </View>
);

const ExhibitionsTab = () => (
  <View className="w-full flex-1 flex-col gap-3 py-6">
    <Text className="text-lg font-semibold">Current Exhibitions</Text>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-4.jpg')}
          className="h-20 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Colors of Costa Rica</Text>
        <Text className="text-base font-normal text-[#63707C]">by Francisco Amighetti</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-1.jpg')}
          className="h-20 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Abstract Expressions</Text>
        <Text className="text-base font-normal text-[#63707C]">by Francisco Amighetti</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-3.jpg')}
          className="h-20 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Permanent Collection</Text>
        <Text className="text-base font-normal text-[#63707C]">by Francisco Amighetti</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-2.jpg')}
          className="h-20 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Colors of Costa Rica</Text>
        <Text className="text-base font-normal text-[#63707C]">by Francisco Amighetti</Text>
      </View>
    </View>
  </View>
);

const ArtworksTab = () => (
  <View className="h-auto w-full flex-1 flex-col gap-3 py-6">
    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-4.jpg')}
          className="h-24 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Tropical Sunset</Text>
        <Text className="text-base font-normal text-[#63707C]">Francisco Amighetti, 2023</Text>
        <Text className="pt-3 text-sm font-normal text-[#63707C]">Oil on Canvas</Text>
        <Text className="text-xs font-normal text-[#63707C]">120 x 90 cm</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-2.jpg')}
          className="h-24 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Tropical Sunset</Text>
        <Text className="text-base font-normal text-[#63707C]">Francisco Amighetti, 2023</Text>
        <Text className="pt-3 text-sm font-normal text-[#63707C]">Oil on Canvas</Text>
        <Text className="text-xs font-normal text-[#63707C]">120 x 90 cm</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-3.jpg')}
          className="h-24 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Tropical Sunset</Text>
        <Text className="text-base font-normal text-[#63707C]">Francisco Amighetti, 2023</Text>
        <Text className="pt-3 text-sm font-normal text-[#63707C]">Oil on Canvas</Text>
        <Text className="text-xs font-normal text-[#63707C]">120 x 90 cm</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/art-1.jpg')}
          className="h-24 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Tropical Sunset</Text>
        <Text className="text-base font-normal text-[#63707C]">Francisco Amighetti, 2023</Text>
        <Text className="pt-3 text-sm font-normal text-[#63707C]">Oil on Canvas</Text>
        <Text className="text-xs font-normal text-[#63707C]">120 x 90 cm</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-4 rounded-lg bg-white p-2">
      <View className="flex w-20 items-center justify-center">
        <Image
          source={require('assets/aerial-views-1.jpg')}
          className="h-24 w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-col">
        <Text className="text-xl font-semibold">Tropical Sunset</Text>
        <Text className="text-base font-normal text-[#63707C]">Francisco Amighetti, 2023</Text>
        <Text className="pt-3 text-sm font-normal text-[#63707C]">Oil on Canvas</Text>
        <Text className="text-xs font-normal text-[#63707C]">120 x 90 cm</Text>
      </View>
    </View>

    <View className="flex w-full items-center justify-center py-8">
      {/* <TouchableHighlight className="flex w-full items-center justify-center"> */}
      <Text className="font-semibold text-primary underline">View All Collections</Text>
      {/* </TouchableHighlight> */}
    </View>
  </View>
);

const VisitTab = () => (
  <View className="h-auto w-full flex-1 flex-col gap-3 py-6">
    <Text className="text-lg font-semibold">Visiting Information</Text>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-center gap-3">
        <Clock size={18} color={'#F86241'} />
        <Text className="text-lg font-medium text-primary">Opening Hours</Text>
      </View>
      <View className="flex w-full flex-col gap-1">
        <Text className="text-base font-normal text-[#63707C]">
          Monday - Friday: 9:00 AM - 6:00 PM
        </Text>
        <Text className="text-base font-normal text-[#63707C]">Saturday: 10:00 AM - 8:00 PM</Text>
        <Text className="text-base font-normal text-[#63707C]">Sunday: 10:00 AM - 5:00 PM</Text>
      </View>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-center gap-3">
        <UserStar size={20} color={'#F86241'} />
        <Text className="text-lg font-medium text-primary">Services & Amenities</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-1">
        <View className="flex w-[48%] flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-base font-normal text-[#63707C]">Guided Tours</Text>
        </View>

        <View className="flex w-[48%] flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-base font-normal text-[#63707C]">Gift Shop</Text>
        </View>
      </View>

      <View className="flex w-full flex-row items-center gap-1">
        <View className="flex w-[48%] flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-base font-normal text-[#63707C]">Art Workshops</Text>
        </View>

        <View className="flex w-[48%] flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-base font-normal text-[#63707C]">Private Events</Text>
        </View>
      </View>

      <View className="flex w-full flex-row items-center gap-1">
        <View className="flex w-[48%] flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-base font-normal text-[#63707C]">Audio Guides</Text>
        </View>

        <View className="flex w-[48%] flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-base font-normal text-[#63707C]">Accessibility</Text>
        </View>
      </View>
    </View>
  </View>
);

// Keep SceneMap stable (keys must match routes)
const renderScene = SceneMap({
  about: AboutTab,
  exhibition: ExhibitionsTab,
  artworks: ArtworksTab,
  visit: VisitTab,
});

export default function Index() {
  const router = useRouter();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'exhibition', title: 'Exhibitions' },
    { key: 'artworks', title: 'Artworks' },
    { key: 'visit', title: 'Visit' },
  ]);

  // Give TabView a real height so scenes can render even inside ScrollView/auto-height parents
  // Tweak the fraction as you like, or replace with a fixed px value.
  const tabHeight = useMemo(() => Math.max(320, Math.floor(layout.height * 0.75)), [layout.height]);

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">
            Nearest Art Enthusiasts
          </Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <Text className="text-2xl font-semibold">Francisco Amighetti Gallery</Text>

          <Text className="text-base text-[#63707C]">
            Discover the vibrant world of Costa Rican contemporary art at the Francisco Amighetti
            Gallery, featuring rotating exhibitions, permanent collections, and educational programs
            in the heart of San José.
          </Text>

          <View className="flex w-full items-center justify-center py-2">
            <Image source={require('assets/art-2.jpg')} className="h-72 w-full rounded-xl" />
          </View>

          <View className="flex w-full flex-row items-center gap-2">
            <Star size={20} fill={'#E7AE33'} color={'#E7AE33'} />
            <Text className="text-lg font-bold">4.8</Text>
            <Text className="pl-1 text-base font-normal text-[#63707c]">324 reviews</Text>
          </View>

          <View className="flex w-full flex-row items-center justify-start gap-2">
            <MapPin size={18} color={'#F86241'} />
            <Text className="text-lg font-medium">Barrio Amón, San José, Costa Rica</Text>
          </View>

          <View className="flex w-full flex-row items-center gap-2 py-4">
            <View className="flex w-[48%] flex-col items-center gap-1 rounded-lg bg-white p-3">
              <Clock size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">Open Today</Text>
              <Text className="text-base font-normal">9:00 AM - 6:00 PM</Text>
            </View>

            <View className="flex w-[48%] flex-col items-center gap-1 rounded-lg bg-white p-3">
              <Palette size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">3 Exhibitions</Text>
              <Text className="text-base font-normal">Currently Showing</Text>
            </View>
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
              <Twitter size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">@cafemundocr</Text>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Instagram size={18} color={'#F86241'} />
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

          {/* Tab View */}
          <View className="w-full" style={{ height: tabHeight }}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              style={{ flex: 1, backgroundColor: '#ffffff' }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: '#F86241' }}
                  style={{ backgroundColor: '#FFFFFF' }}
                  tabStyle={{ height: 50 }}
                  activeColor="#000000"
                  inactiveColor="#000000"
                  pressColor="transparent"
                  pressOpacity={1}
                />
              )}
            />
          </View>

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">Visitors Reviews</Text>
            <Text className="text-base font-semibold text-primary">View All</Text>
          </View>

          <View className="flex w-full flex-col gap-4 rounded-lg bg-white p-4">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Image source={require('assets/avatar.jpg')} className="h-10 w-10 rounded-full" />
              <View className="flex flex-col">
                <Text className="text-lg font-medium">Maria Rodriguez</Text>
                <View className="flex flex-row items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
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
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
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
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
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

          <View className="w/full flex flex-col gap-4 rounded-lg bg-white p-4">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Image source={require('assets/avatar.jpg')} className="h-10 w-10 rounded-full" />
              <View className="flex flex-col">
                <Text className="text-lg font-medium">Maria Rodriguez</Text>
                <View className="flex flex-row items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={'#E7AE33'} color={'#E7AE33'} />
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
