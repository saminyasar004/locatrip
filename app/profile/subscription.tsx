import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, SquarePen, Star } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const FreeTrialTab = () => (
  <View className="w-full flex-1 flex-col gap-3 py-6">
    <Text className="text-lg font-semibold">About the Gallery</Text>
  </View>
);

const BasicTab = () => (
  <View className="w-full flex-1 flex-col gap-3 py-6">
    <Text className="text-lg font-semibold">About the Gallery</Text>
  </View>
);

const PremiumTab = () => (
  <View className="w-full flex-1 flex-col gap-3 py-6">
    <Text className="text-lg font-semibold">About the Gallery</Text>
  </View>
);

// Keep SceneMap stable (keys must match routes)
const renderScene = SceneMap({
  free: FreeTrialTab,
  basic: BasicTab,
  premium: PremiumTab,
});

export default function Index() {
  const router = useRouter();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'free', title: 'Free Trial' },
    { key: 'basic', title: 'Basic' },
    { key: 'premium', title: 'Premium' },
  ]);

  // Give TabView a real height so scenes can render even inside ScrollView/auto-height parents
  // Tweak the fraction as you like, or replace with a fixed px value.
  const tabHeight = useMemo(() => Math.max(1000, Math.floor(layout.height * 1)), [layout.height]);

  const renderLabel = ({ route, focused, color }) => (
    <View className="rounded-full bg-primary">
      <Text className="text-white">{route.title}</Text>
    </View>
  );

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">Subscription</Text>
        </View>

        <View className="flex w-full flex-col gap-1 py-4">
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
                  activeColor="#F86241"
                  inactiveColor="#000000"
                  pressColor="transparent"
                  pressOpacity={1}
                />
              )}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}
