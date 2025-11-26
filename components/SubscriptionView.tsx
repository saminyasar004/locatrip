import useSubscriptionStore, { SubscriptionItemProps } from '@/store/useSubscriptionStore';
import { ArrowLeft, Check, Crown, MessagesSquare, Zap } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBar, TabView } from 'react-native-tab-view';

const getIconForPlan = (planName: string) => {
  const lower = planName.toLowerCase();
  if (lower.includes('free')) return <Zap size={24} color="#F86241" fill="#F86241" />;
  if (lower.includes('basic')) return <MessagesSquare size={24} color="#F86241" fill="#F86241" />;
  if (lower.includes('premium')) return <Crown size={24} color="#F86241" fill="#F86241" />;
  // fallback icon for any extra/dynamic plan
  return <Zap size={24} color="#F86241" fill="#F86241" />;
};

const PlanTab = ({
  subscriptionDetails,
  onUpgrade,
}: {
  subscriptionDetails?: SubscriptionItemProps;
  onUpgrade: (planName: string) => void;
}) => {
  if (!subscriptionDetails) return null;

  const { plan_name, price, duration } = subscriptionDetails;
  const icon = getIconForPlan(plan_name);

  return (
    <View className="w-full flex-1 flex-col gap-3 px-5 py-10">
      {/* Icon */}
      <View className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
        {icon}
      </View>

      {/* Title & Duration */}
      <View className="flex w-full flex-row items-center justify-center gap-0 text-center">
        <Text className="text-lg font-semibold">{plan_name}</Text>
        <Text className="text-lg text-[#5C5C5C]"> / {duration} Days</Text>
      </View>

      {/* Price */}
      <Text className="text-center text-4xl font-bold">${price ?? 0}</Text>

      {/* Upgrade Button */}
      <TouchableHighlight
        onPress={() => onUpgrade(plan_name)}
        underlayColor="transparent"
        className="flex w-full items-center justify-center py-8">
        <View className="flex w-full flex-row items-center justify-center gap-3 rounded-full border-2 border-primary bg-primary p-3">
          <Text className="text-xl font-bold text-white">Upgrade Plan</Text>
        </View>
      </TouchableHighlight>

      {/* Features */}
      {Array.from({ length: 10 }).map((_, idx) => {
        const feature: string = subscriptionDetails[`feature_${idx + 1}`];
        if (feature && feature.trim().length > 0) {
          return (
            <View key={idx} className="flex w-full flex-row items-center gap-3">
              <Check size={24} color="#2EC866" />
              <Text className="text-[#63707C]">{feature}</Text>
            </View>
          );
        }
        return null;
      })}

      {/* Default placeholder if no features */}
      {Array.from({ length: 10 }).every(
        (_, idx) =>
          !(
            subscriptionDetails[`feature_${idx + 1}` as keyof SubscriptionItemProps] as string
          )?.trim()
      ) && (
        <View className="items-center justify-center">
          <Text className="text-center text-[#63707C]">No features listed for this plan.</Text>
        </View>
      )}
    </View>
  );
};

interface SubscriptionViewProps {
  onBack?: () => void;
  showHeader?: boolean;
}

export default function SubscriptionView({ onBack, showHeader = true }: SubscriptionViewProps) {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { fetchAllSubscription, payment, error, isLoading, checkout } = useSubscriptionStore();
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchAllSubscription();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllSubscription();
    setRefreshing(false);
  }, [fetchAllSubscription]);

  const handleUpgrade = async (planName: string) => {
    const response = await checkout(planName);
    if (response?.status === 200 && response.data?.checkout_url) {
      await Linking.openURL(response.data.checkout_url);
      if (onBack) onBack();
    }
  };

  // ✅ Dynamically build routes based on backend plans
  const routes = useMemo(() => {
    if (!payment || payment.length === 0) return [];
    return payment.map((plan) => ({
      key: plan.id.toString(),
      title: plan.plan_name,
    }));
  }, [payment]);

  const tabHeight = useMemo(() => Math.max(1000, Math.floor(layout.height * 1)), [layout.height]);

  const renderScene = useCallback(
    ({ route }: { route: { key: string } }) => {
      const plan = payment.find((p) => p.id.toString() === route.key);
      return <PlanTab subscriptionDetails={plan} onUpgrade={handleUpgrade} />;
    },
    [payment, handleUpgrade]
  );

  return (
    <View className="flex-1 bg-[#FBFEFE]">
      <ScrollView
        className="h-full flex-1 bg-[#FBFEFE]"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            progressViewOffset={80}
            onRefresh={onRefresh}
            colors={['#F86241']}
          />
        }
        contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 20 }}>
        {/* Header */}
        {showHeader && (
          <View className="flex w-full flex-row items-center gap-3 bg-white">
            <TouchableHighlight onPress={onBack} underlayColor="transparent">
              <ArrowLeft size={24} color="#63707C" />
            </TouchableHighlight>

            <Text className="w-full text-lg font-semibold text-[#313131]">Subscription</Text>
          </View>
        )}

        {/* Error */}
        {error && (
          <View className="items-center justify-center py-4">
            <Text className="text-[#63707C]">{error}</Text>
          </View>
        )}

        {/* Loading */}
        {isLoading && !error && (
          <View className="items-center justify-center py-20">
            <Text className="text-[#63707C]">Loading subscriptions...</Text>
          </View>
        )}

        {/* Dynamic Tabs */}
        {!isLoading && !error && routes.length > 0 && (
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
                    scrollEnabled={routes.length > 3} // if many tabs, make it scrollable
                    pressColor="transparent"
                    pressOpacity={1}
                  />
                )}
              />
            </View>
          </View>
        )}

        {/* No plans */}
        {!isLoading && !error && routes.length === 0 && (
          <View className="items-center justify-center py-20">
            <Text className="text-[#63707C]">No subscription plans available.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
