import Layout from 'components/layout';
import { Link, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Camera,
  Car,
  Clock,
  Dot,
  ExternalLink,
  Info,
  Mail,
  MapPin,
  Music,
  Phone,
  Star,
  Users,
  UserStar,
  UtensilsCrossed,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Image, Text, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const OverviewTab = () => (
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

    <Text className="text-lg font-semibold">Festival Highlights</Text>

    <View className="flex w-full flex-row items-center gap-3">
      <View className="flex w-[48%] flex-row items-center gap-3">
        <Music size={18} color={'#F86241'} />
        <Text className="font-medium">Traditional Dances</Text>
      </View>

      <View className="flex w-[48%] flex-row items-center gap-3">
        <Users size={18} color={'#F86241'} />
        <Text className="font-medium">Cultural Workshops</Text>
      </View>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <View className="flex w-[48%] flex-row items-center gap-3">
        <UtensilsCrossed size={18} color={'#F86241'} />
        <Text className="font-medium">Traditional Food</Text>
      </View>

      <View className="flex w-[48%] flex-row items-center gap-3">
        <Camera size={18} color={'#F86241'} />
        <Text className="font-medium">Mask Making</Text>
      </View>
    </View>

    <Text className="text-lg font-semibold">Cultural Significance</Text>

    <Text className="text-base font-normal text-[#63707C]">
      The festival symbolizes the resistance of indigenous peoples against colonization. The
      "Diablitos" (little devils) represent the Boruca people, while the bull represents the Spanish
      conquistadors. The three-day celebration culminates with the symbolic victory of the Diablitos
      over the bull.
    </Text>
  </View>
);

const ScheduleTab = () => (
  <View className="w-full flex-1 flex-col gap-3 py-6">
    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-start gap-5">
        <View className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
          <Star size={22} color={'#F86241'} />
        </View>

        <View className="flex flex-1 flex-col gap-1">
          <Text className="text-lg font-medium">Opening Ceremony</Text>
          <View className="flex flex-row items-center gap-2">
            <Clock size={14} color={'#63707C'} />
            <Text className="text-[#63707C]">10:00 AM</Text>
            <MapPin size={14} color={'#63707C'} />
            <Text className="text-[#63707C]">Main Plaza</Text>
          </View>
          <Text className="text-base font-normal text-[#63707C]">
            Traditional blessing and welcome ceremony with local elders
          </Text>
        </View>
      </View>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-start gap-5">
        <View className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
          <Music size={22} color={'#F86241'} />
        </View>

        <View className="flex flex-1 flex-col gap-1">
          <Text className="text-lg font-medium">Diablitos Dance Performance</Text>
          <View className="flex flex-row items-center gap-2">
            <Clock size={14} color={'#63707C'} />
            <Text className="text-[#63707C]">10:00 AM</Text>
            <MapPin size={14} color={'#63707C'} />
            <Text className="text-[#63707C]">Cultural Stage</Text>
          </View>
          <Text className="text-base font-normal text-[#63707C]">
            Traditional masked dancers representing the eternal struggle
          </Text>
        </View>
      </View>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-start gap-5">
        <View className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
          <UtensilsCrossed size={22} color={'#F86241'} />
        </View>

        <View className="flex flex-1 flex-col gap-1">
          <Text className="text-lg font-medium">Traditional Food Fair</Text>
          <View className="flex flex-row items-center gap-2">
            <Clock size={14} color={'#63707C'} />
            <Text className="text-[#63707C]">10:00 AM</Text>
            <MapPin size={14} color={'#63707C'} />
            <Text className="text-[#63707C]">Food Court</Text>
          </View>
          <Text className="text-base font-normal text-[#63707C]">
            Authentic Boruca cuisine and local delicacies
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const TicketTab = () => (
  <View className="h-auto w-full flex-1 flex-col gap-3 py-6">
    <Text className="text-lg font-semibold">About the Festival</Text>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex w-full flex-row items-center justify-between gap-3">
        <View className="flex flex-col gap-1">
          <Text className="text-xl font-semibold">General Admission</Text>
          <Text className="text-sm font-normal text-[#63707C]">
            Access to all public areas and performances
          </Text>
        </View>

        <View className="flex flex-col items-center gap-1">
          <Text className="text-xl font-bold text-primary">$12</Text>
          <Text className="text-base font-normal text-[#63707C]">per person</Text>
        </View>
      </View>

      <Text className="text-lg font-medium">Includes</Text>

      <View className="flex flex-col gap-2">
        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">All performances</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Food fair access</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Cultural exhibits</Text>
        </View>
      </View>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex w-full flex-row items-center justify-between gap-3">
        <View className="flex flex-col gap-1">
          <Text className="text-xl font-semibold">VIP Experience</Text>
          <Text className="text-sm font-normal text-[#63707C]">
            Premium experience with exclusive access
          </Text>
        </View>

        <View className="flex flex-col items-center gap-1">
          <Text className="text-xl font-bold text-primary">$35</Text>
          <Text className="text-base font-normal text-[#63707C]">per person</Text>
        </View>
      </View>

      <Text className="text-lg font-medium">Includes</Text>

      <View className="flex flex-col gap-2">
        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Reserved seating</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Meet & greet</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Traditional meal</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Souvenir mask</Text>
        </View>
      </View>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex w-full flex-row items-center justify-between gap-3">
        <View className="flex flex-col gap-1">
          <Text className="text-xl font-semibold">Workshop Package</Text>
          <Text className="text-sm font-normal text-[#63707C]">
            Premium experience with exclusive access
          </Text>
        </View>

        <View className="flex flex-col items-center gap-1">
          <Text className="text-xl font-bold text-primary">$35</Text>
          <Text className="text-base font-normal text-[#63707C]">per person</Text>
        </View>
      </View>

      <Text className="text-lg font-medium">Includes</Text>

      <View className="flex flex-col gap-2">
        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Reserved seating</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Meet & greet</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Traditional meal</Text>
        </View>

        <View className="flex flex-row items-center gap-1">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-sm font-normal text-[#63707C]">Souvenir mask</Text>
        </View>
      </View>
    </View>

    <View className="flex w-full flex-col gap-3 rounded-lg border-2 border-[#FDE68A] bg-[#FFFBEB] p-4">
      <View className="flex w-full flex-row items-center gap-2">
        <Info size={20} color={'#92430E'} />
        <Text className="text-lg font-medium text-[#92430E]">Workshop Package</Text>
      </View>

      <View className="flex flex-row items-center gap-1">
        <Dot color={'#B45309'} size={20} />
        <Text className="text-base font-normal text-[#B45309]">Guided Tours</Text>
      </View>
      <View className="flex flex-row items-center gap-1">
        <Dot color={'#B45309'} size={20} />
        <Text className="text-base font-normal text-[#B45309]">Tickets are non-refundable</Text>
      </View>
      <View className="flex flex-row items-center gap-1">
        <Dot color={'#B45309'} size={20} />
        <Text className="text-base font-normal text-[#B45309]">Festival runs rain or shine</Text>
      </View>
      <View className="flex flex-row items-center gap-1">
        <Dot color={'#B45309'} size={20} />
        <Text className="text-base font-normal text-[#B45309]">Limited parking available</Text>
      </View>
    </View>
  </View>
);

const InfoTab = () => (
  <View className="h-auto w-full flex-1 flex-col gap-3 py-6">
    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-center gap-2">
        <Calendar size={18} color={'#F86241'} />
        <Text className="text-lg font-medium text-primary">Festival Dates</Text>
      </View>

      <Text className="text-[#63707C]">December 28-30, 2024</Text>
      <Text className="text-[#63707C]">Daily: 10:00 AM - 10:00 PM</Text>
      <Text className="text-[#63707C]">Main performances: 2:00 PM & 8:00 PM</Text>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-center gap-2">
        <Car size={18} color={'#F86241'} />
        <Text className="text-lg font-medium text-primary">Getting There</Text>
      </View>

      <Text className="text-[#63707C]">3-hour drive from San José</Text>
      <Text className="text-[#63707C]">Shuttle service available from Pérez Zeledón</Text>
      <Text className="text-[#63707C]">Limited parking - arrive early</Text>
      <Text className="text-[#63707C]">Public transportation from Buenos Aires</Text>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-center gap-2">
        <Text className="text-lg font-medium text-primary">Facilities & Services</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <View className="flex w-[48%] flex-row items-center gap-2">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-[#63707C]">Food Vendors</Text>
        </View>

        <View className="flex w-[48%] flex-row items-center gap-2">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-[#63707C]">Restrooms</Text>
        </View>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <View className="flex w-[48%] flex-row items-center gap-2">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-[#63707C]">First Aid</Text>
        </View>

        <View className="flex w-[48%] flex-row items-center gap-2">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-[#63707C]">Souvenir Shop</Text>
        </View>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <View className="flex w-[48%] flex-row items-center gap-2">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-[#63707C]">ATM Available</Text>
        </View>

        <View className="flex w-[48%] flex-row items-center gap-2">
          <Dot color={'#63707C'} size={20} />
          <Text className="text-[#63707C]">WiFi Access</Text>
        </View>
      </View>
    </View>

    <View className="flex w-full flex-col gap-2 rounded-lg bg-white p-4">
      <View className="flex flex-row items-center gap-2">
        <Text className="text-lg font-medium text-primary">What to bring</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <Dot color={'#63707C'} size={20} />
        <Text className="text-[#63707C]">Comfortable walking shoes</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <Dot color={'#63707C'} size={20} />
        <Text className="text-[#63707C]">Sun protection (hat, sunscreen)</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <Dot color={'#63707C'} size={20} />
        <Text className="text-[#63707C]">Light jacket for evening events</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <Dot color={'#63707C'} size={20} />
        <Text className="text-[#63707C]">Camera for memorable moments</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <Dot color={'#63707C'} size={20} />
        <Text className="text-[#63707C]">Cash for vendors and crafts</Text>
      </View>

      <View className="flex w-full flex-row items-center gap-2">
        <Dot color={'#63707C'} size={20} />
        <Text className="text-[#63707C]">Reusable water bottle</Text>
      </View>
    </View>
  </View>
);

// Keep SceneMap stable (keys must match routes)
const renderScene = SceneMap({
  overview: OverviewTab,
  schedule: ScheduleTab,
  ticket: TicketTab,
  info: InfoTab,
});

export default function Index() {
  const router = useRouter();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'overview', title: 'Overview' },
    { key: 'schedule', title: 'Schedule' },
    { key: 'ticket', title: 'Ticket' },
    { key: 'info', title: 'Info' },
  ]);

  // Give TabView a real height so scenes can render even inside ScrollView/auto-height parents
  // Tweak the fraction as you like, or replace with a fixed px value.
  const tabHeight = useMemo(() => Math.max(1000, Math.floor(layout.height * 1)), [layout.height]);

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">
            Nearest Local Festivals & Events
          </Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <Text className="text-2xl font-semibold">Fiesta de los Diablitos</Text>

          <Text className="text-base text-[#63707C]">
            Experience one of Costa Rica's most authentic indigenous celebrations. The Fiesta de los
            Diablitos is a three-day cultural festival featuring traditional masks, dances, and
            ceremonies of the Boruca people.
          </Text>

          <View className="flex w-full items-center justify-center py-2">
            <Image source={require('assets/event-1.jpg')} className="h-72 w-full rounded-xl" />
          </View>

          <View className="flex w-full flex-row items-center gap-2">
            <Star size={20} fill={'#E7AE33'} color={'#E7AE33'} />
            <Text className="text-lg font-bold">4.8</Text>
            <Text className="pl-1 text-base font-normal text-[#63707c]">324 reviews</Text>
          </View>

          <View className="flex w-full flex-row items-center justify-start gap-2">
            <MapPin size={18} color={'#F86241'} />
            <Text className="text-lg font-medium">Boruca, Puntarenas, Costa Rica</Text>
          </View>

          <View className="flex w-full flex-row items-center gap-2 py-4">
            <View className="flex w-[48%] flex-col items-center gap-1 rounded-lg bg-white p-3">
              <Calendar size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">Dec 28-30</Text>
              <Text className="text-base font-normal">3 Days Festival</Text>
            </View>

            <View className="flex w-[48%] flex-col items-center gap-1 rounded-lg bg-white p-3">
              <Users size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">500+ Visitors</Text>
              <Text className="text-base font-normal">Expected attendance</Text>
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
