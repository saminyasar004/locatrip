import useSubscriptionStore, { SubscriptionItemProps } from '@/store/useSubscriptionStore';
import { ArrowLeft, Check, Crown, MessagesSquare, Zap, X } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
  Linking,
  Platform,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBar, TabView } from 'react-native-tab-view';
import { WebView } from 'react-native-webview';
import { Toast } from 'toastify-react-native';

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

  const { plan_name, price, duration, itinerary_limit } = subscriptionDetails;
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

      {/* Itinerary Limit */}
      <Text className="mt-1 text-center text-lg text-[#63707C]">
        {itinerary_limit ? `Limit: ${itinerary_limit} Itineraries` : 'Unlimited Itineraries'}
      </Text>

      {/* Upgrade Button */}
      <TouchableHighlight
        onPress={() => onUpgrade(plan_name)}
        underlayColor="transparent"
        className="flex w-full items-center justify-center py-8">
        <View className="flex w-full flex-row items-center justify-center gap-3 rounded-full border-2 border-primary bg-primary p-3">
          <Text className="text-xl font-bold text-white">
            {plan_name.toLowerCase().includes('free') ? 'Continue as Free' : 'Upgrade Plan'}
          </Text>
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
  onSuccess?: () => void;
}

export default function SubscriptionView({
  onBack,
  showHeader = true,
  onSuccess,
}: SubscriptionViewProps) {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { fetchAllSubscription, payment, error, isLoading, checkout } = useSubscriptionStore();
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);

  // WebView State
  const [showGateway, setShowGateway] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Custom Alert Modal State
  const [errorModal, setErrorModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    visible: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  useEffect(() => {
    fetchAllSubscription();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllSubscription();
    setRefreshing(false);
  }, [fetchAllSubscription]);

  const handleUpgrade = async (planName: string) => {
    console.log(`[CheckoutView] handleUpgrade called for: ${planName}`);
    const response = await checkout(planName);
    if (response?.status === 200 && response.data?.checkout_url) {
      let url = response.data.checkout_url;
      console.log(`[CheckoutView] Initial URL from API: ${url}`);

      // Fix for Android Emulator (0.0.0.0 -> 10.0.2.2)
      if (Platform.OS === 'android' && url.includes('0.0.0.0')) {
        url = url.replace('0.0.0.0', '10.0.2.2');
        console.log(`[CheckoutView] Android Fix: Replaced 0.0.0.0 with 10.0.2.2 -> ${url}`);
      } else if (Platform.OS === 'android' && url.includes('127.0.0.1')) {
        url = url.replace('127.0.0.1', '10.0.2.2');
        console.log(`[CheckoutView] Android Fix: Replaced 127.0.0.1 with 10.0.2.2 -> ${url}`);
      }

      console.log(`[CheckoutView] Setting checkoutUrl and showing gateway: ${url}`);
      setCheckoutUrl(url);
      setShowGateway(true);
    } else {
      console.error('[CheckoutView] Failed to get checkout_url from response:', response?.data);
      Toast.error('Could not initialize checkout. Please try again.');
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
      {/* WebView Modal */}
      <Modal
        visible={showGateway}
        onDismiss={() => setShowGateway(false)}
        onRequestClose={() => setShowGateway(false)}
        animationType="slide"
        transparent={false}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
            <Text className="text-lg font-semibold">Checkout</Text>
            <TouchableHighlight
              onPress={() => {
                setShowGateway(false);
                setCheckoutUrl(null);
              }}
              underlayColor="transparent"
              className="p-2">
              <X size={24} color="#000" />
            </TouchableHighlight>
          </View>
          {checkoutUrl && checkoutUrl.trim().length > 0 && (
            <WebView
              source={{ uri: checkoutUrl }}
              style={{ flex: 1 }}
              onLoadStart={() => console.log('[WebView] Page started loading...')}
              onLoadEnd={() => console.log('[WebView] Page finished loading.')}
              onNavigationStateChange={(navState) => {
                console.log('[WebView] onNavigationStateChange:', {
                  url: navState.url,
                  loading: navState.loading,
                  canGoBack: navState.canGoBack,
                });
                // Check for success or cancel URL (0.0.0.0 or keywords)
                const isSuccess =
                  navState.url.includes('0.0.0.0') ||
                  navState.url.includes('success=true') ||
                  navState.url.includes('checkout_success') ||
                  navState.url.includes('/success');

                const isCancel =
                  navState.url.includes('cancel=true') || navState.url.includes('checkout_cancel');

                if (isSuccess) {
                  console.log('[WebView] Success URL detected, closing gateway.');
                  setShowGateway(false);
                  setCheckoutUrl(null);
                  if (onSuccess) onSuccess();
                  else if (onBack) onBack();
                } else if (isCancel) {
                  console.log('[WebView] Cancel URL detected, closing gateway.');
                  setShowGateway(false);
                  setCheckoutUrl(null);
                }
              }}
              onShouldStartLoadWithRequest={(request) => {
                console.log('[WebView] onShouldStartLoadWithRequest:', request.url);
                // Proactively catch the redirect before it fails
                if (
                  request.url.includes('0.0.0.0') ||
                  request.url.includes('success=true') ||
                  request.url.includes('/success')
                ) {
                  console.log('[WebView] Blocking success URL proactively and closing gateway.');
                  setShowGateway(false);
                  setCheckoutUrl(null);
                  if (onSuccess) onSuccess();
                  else if (onBack) onBack();
                  return false; // Stop the load
                }
                return true;
              }}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('[WebView] onError:', nativeEvent);

                // If it's a success URL that failed (e.g. ERR_CONNECTION_REFUSED to 0.0.0.0)
                // we treat it as a success and close the gateway.
                if (
                  nativeEvent.url.includes('0.0.0.0') ||
                  nativeEvent.url.includes('success=true') ||
                  nativeEvent.url.includes('/success')
                ) {
                  console.log(
                    '[WebView] Success URL failed but treating as success, closing gateway.'
                  );
                  setShowGateway(false);
                  setCheckoutUrl(null);
                  if (onSuccess) onSuccess();
                  else if (onBack) onBack();
                  return;
                }

                if (nativeEvent.description.toLowerCase().includes('ssl')) {
                  setErrorModal({
                    visible: true,
                    title: 'SSL Error',
                    message:
                      'A secure connection could not be established. This is often caused by an incorrect date or time on your device. Please ensure your device date and time are set to "Automatic" and try again.',
                    onConfirm: () => {
                      console.log('[WebView] SSL Alert OK pressed, closing gateway.');
                      setShowGateway(false);
                      setCheckoutUrl(null);
                      setErrorModal((prev) => ({ ...prev, visible: false }));
                    },
                  });
                }
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('[WebView] onHttpError:', nativeEvent);
              }}
              renderError={(errorName) => (
                <View className="flex-1 items-center justify-center p-5">
                  <Text className="text-center text-lg font-semibold text-red-500">
                    Failed to load checkout page
                  </Text>
                  <Text className="mt-2 text-center text-[#63707C]">
                    {errorName === 'NSURLErrorDomain' || errorName === 'net::ERR_CERT_DATE_INVALID'
                      ? 'Please check if your device date and time are correct.'
                      : 'Please check your internet connection and try again.'}
                  </Text>
                  <TouchableHighlight
                    onPress={() => {
                      setShowGateway(false);
                      setCheckoutUrl(null);
                    }}
                    underlayColor="transparent"
                    className="mt-6 rounded-full bg-primary px-8 py-3">
                    <Text className="font-bold text-white">Go Back</Text>
                  </TouchableHighlight>
                </View>
              )}
              startInLoadingState
              renderLoading={() => (
                <View className="absolute inset-0 items-center justify-center bg-white">
                  <ActivityIndicator size="large" color="#F86241" />
                </View>
              )}
              scalesPageToFit
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Custom Error Modal */}
      <Modal
        visible={errorModal.visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setErrorModal((prev) => ({ ...prev, visible: false }))}>
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-xl">
            <View className="mb-4 items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <X size={24} color="#EF4444" />
              </View>
            </View>
            <Text className="mb-2 text-center text-xl font-bold text-gray-900">
              {errorModal.title}
            </Text>
            <Text className="mb-6 text-center text-base leading-6 text-gray-500">
              {errorModal.message}
            </Text>
            <TouchableHighlight
              onPress={errorModal.onConfirm}
              underlayColor="#f1583d"
              className="w-full items-center justify-center rounded-full bg-primary py-4">
              <Text className="text-lg font-bold text-white">OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

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
          <View className="flex w-full flex-row items-center gap-3 bg-white py-4">
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
