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

    const tabs = [
        // {
        //   name: 'Home',
        //   icon: <House size={20} color={activeTab === 'Home' ? '#F86241' : '#63707C'} />,
        //   url: '/home',
        // },
        // {
        //   name: 'My Plan',
        //   icon: <Briefcase size={20} color={activeTab === 'My Plan' ? '#F86241' : '#63707C'} />,
        //   url: '/my-plan',
        // },
        // {
        //   name: 'Local Recommend',
        //   icon: <ThumbsUp size={20} color={activeTab === 'Local Recommend' ? '#F86241' : '#63707C'} />,
        //   url: '/local-recommend',
        // },
        // {
        //   name: 'Profile',
        //   icon: <UserRound size={20} color={activeTab === 'Profile' ? '#F86241' : '#63707C'} />,
        //   url: '/profile',
        // },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}
