import { Tabs } from 'expo-router';
import { Briefcase, House, ThumbsUp, UserRound } from 'lucide-react-native';

export default function Layout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#F86241', tabBarInactiveTintColor: '#63707C' }}>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <House size={20} color={color} />,
                }}
            />
            <Tabs.Screen
                name="my-plan"
                options={{
                    headerShown: false,
                    title: 'My Plan',
                    tabBarIcon: ({ color, size }) => <Briefcase size={20} color={color} />,
                }}
            />
            <Tabs.Screen
                name="local-recommend"
                options={{
                    headerShown: false,
                    title: 'Local Recommend',
                    tabBarIcon: ({ color, size }) => <ThumbsUp size={20} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <UserRound size={20} color={color} />,
                }}
            />
        </Tabs>
    );
}
