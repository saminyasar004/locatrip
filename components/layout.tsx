import { usePathname, useRouter } from 'expo-router';
import { Briefcase, House, ThumbsUp, UserRound } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { cn } from 'utils';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

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
    // profile: [''],
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

  const tabs = [
    {
      name: 'Home',
      icon: <House size={20} color={activeTab === 'Home' ? '#F86241' : '#63707C'} />,
      url: '/home',
    },
    {
      name: 'My Plan',
      icon: <Briefcase size={20} color={activeTab === 'My Plan' ? '#F86241' : '#63707C'} />,
      url: '/my-plan',
    },
    {
      name: 'Local Recommend',
      icon: <ThumbsUp size={20} color={activeTab === 'Local Recommend' ? '#F86241' : '#63707C'} />,
      url: '/local-recommend',
    },
    {
      name: 'Profile',
      icon: <UserRound size={20} color={activeTab === 'Profile' ? '#F86241' : '#63707C'} />,
      url: '/auth/login',
    },
  ];
  // useEffect(() => {

  // }, [])

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        {children}
      </ScrollView>
      <View className="fixed bottom-0 left-0 right-0 flex h-auto min-h-20 w-full flex-row items-center justify-around gap-4 border-t border-dark-gray/10 bg-white py-3">
        {tabs.map((tab, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => {
              setActiveTab(tab.name as any);
              router.push(tab.url);
            }}
            underlayColor={'transparent'}>
            <View className="flex flex-col items-center gap-1">
              <View
                className={cn(
                  'flex h-14 w-14 items-center justify-center overflow-hidden rounded-full p-2',
                  activeTab === tab.name ? 'bg-primary/20' : 'bg-white'
                )}>
                {tab.icon}
              </View>
              <Text
                className={cn(
                  'text-base font-medium',
                  activeTab === tab.name ? 'text-primary' : 'text-[#63707C]'
                )}>
                {tab.name}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </SafeAreaView>
  );
}
