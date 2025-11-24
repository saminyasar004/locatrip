import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, useColorScheme, View, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from 'utils';

export default function Layout({
  children,
  layoutStyle,
}: {
  children?: React.ReactNode;
  layoutStyle?: string;
}) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathName = usePathname();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [activeTab, setActiveTab] = useState<'Home' | 'My Plan' | 'Local Recommend' | 'Profile'>(
    'Home'
  );

  const routesBasedOnTabs = {
    Home: ['/home', '/home/happening-event'],
    'My Plan': [
      '/my-plan',
      '/my-plan/plan-details',
      '/my-plan/aerial-views',
      '/my-plan/nearest-restaurant',
      '/my-plan/nearest-hotel',
      '/my-plan/nearest-local-festival',
      '/my-plan/nearest-art',
      '/my-plan/restaurant-details',
      '/my-plan/hotel-details',
      '/my-plan/art-details',
      '/my-plan/local-festival-details',
      '/my-plan/reviews',
    ],
    'Local Recommend': ['/local-recommend', '/local-recommend/card-details'],
    Profile: [
      '/profile',
      '/profile/personal-informations',
      '/profile/subscription',
      '/profile/help',
      '/profile/terms',
    ],
  };

  useEffect(() => {
    // dynamically set the active tab based on the path
    const activeTab = Object.keys(routesBasedOnTabs).find((tab) =>
      routesBasedOnTabs[tab as any].includes(pathName)
    );
    if (activeTab) {
      setActiveTab(activeTab as any);
    }
  }, [pathName]);

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      <SafeAreaView
        edges={['top', 'left', 'right']}
        className={cn('h-full w-full flex-1 bg-[#FBFEFE]', layoutStyle)}>
        <ScrollView
          className="flex-1"
          // contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}>
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
