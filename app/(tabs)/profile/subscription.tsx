import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Crown, MessagesSquare, Zap } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Text, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const FreeTrialTab = () => (
  <View className="w-full flex-1 flex-col gap-3 px-5 py-10">
    <View className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
      <Zap size={24} color={'#F86241'} fill={'#F86241'} />
    </View>

    <View className="flex w-full flex-row items-center justify-center gap-0 text-center">
      <Text className="text-lg font-semibold">Free Trial</Text>
      <Text className="text-lg text-[#5C5C5C]">/Free for 7 Days</Text>
    </View>

    <TouchableHighlight
      // onPress={() => router.push('/auth/login')}
      underlayColor={'transparent'}
      className="flex w-full items-center justify-center py-8">
      <View className="flex w-full flex-row items-center justify-center gap-3 rounded-full border-2 border-primary bg-primary p-3">
        <Text className="text-xl font-bold text-white">Upgrade Plan</Text>
      </View>
    </TouchableHighlight>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">3 itinerary generations/month</Text>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">Ads included</Text>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">Basic support</Text>
    </View>
  </View>
);

const BasicTab = () => (
  <View className="w-full flex-1 flex-col gap-3 px-5 py-10">
    <View className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
      <MessagesSquare size={24} color={'#F86241'} fill={'#F86241'} />
    </View>

    <View className="flex w-full flex-row items-center justify-center gap-0 text-center">
      <Text className="text-lg font-semibold">Basic</Text>
      <Text className="text-lg text-[#5C5C5C]">/Per months</Text>
    </View>
    <Text className="text-center text-4xl font-bold">$50</Text>

    <TouchableHighlight
      // onPress={() => router.push('/auth/login')}
      underlayColor={'transparent'}
      className="flex w-full items-center justify-center py-8">
      <View className="flex w-full flex-row items-center justify-center gap-3 rounded-full border-2 border-primary bg-primary p-3">
        <Text className="text-xl font-bold text-white">Upgrade Plan</Text>
      </View>
    </TouchableHighlight>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">20 AI itineraries/month</Text>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">Reduced ads</Text>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">Standard suggestions</Text>
    </View>
  </View>
);

const PremiumTab = () => (
  <View className="w-full flex-1 flex-col gap-3 px-5 py-10">
    <View className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
      <Crown size={24} color={'#F86241'} fill={'#F86241'} />
    </View>

    <View className="flex w-full flex-row items-center justify-center gap-0 text-center">
      <Text className="text-lg font-semibold">Premium</Text>
      <Text className="text-lg text-[#5C5C5C]">/Per months</Text>
    </View>
    <Text className="text-center text-4xl font-bold">$100</Text>

    <TouchableHighlight
      // onPress={() => router.push('/auth/login')}
      underlayColor={'transparent'}
      className="flex w-full items-center justify-center py-8">
      <View className="flex w-full flex-row items-center justify-center gap-3 rounded-full border-2 border-primary bg-primary p-3">
        <Text className="text-xl font-bold text-white">Upgrade Plan</Text>
      </View>
    </TouchableHighlight>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">Unlimited AI itineraries</Text>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">No ads</Text>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">Exclusive travel insights</Text>
    </View>

    <View className="flex w-full flex-row items-center gap-3">
      <Check size={24} color={'#2EC866'} />
      <Text className="text-[#63707C]">Standard suggestions</Text>
    </View>
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
