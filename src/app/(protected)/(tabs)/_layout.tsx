import { useAuth } from '@clerk/clerk-expo';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    const { signOut } = useAuth();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'black',
                headerRight: () => <Feather color={'black'} name={'log-out'} onPress={() => signOut()} size={24} />,
            }}
        >
            <Tabs.Screen
                name={'index'}
                options={{
                    headerTitle: 'Reddit',
                    title: 'Home',
                    headerTintColor: '#FF5700',
                    tabBarIcon: ({ color }) => <AntDesign color={color} name="home" size={24} />,
                }}
            />
            <Tabs.Screen
                name={'communities'}
                options={{
                    title: 'Communities',
                    tabBarIcon: ({ color }) => <Feather color={color} name="users" size={24} />,
                }}
            />
            <Tabs.Screen
                name={'create'}
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color }) => <AntDesign color={color} name="plus" size={24} />,
                }}
            />
            <Tabs.Screen
                name={'chat'}
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color }) => <Ionicons color={color} name="chatbubble-ellipses-outline" size={24} />,
                }}
            />
            <Tabs.Screen
                name={'inbox'}
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color }) => <Feather color={color} name="bell" size={24} />,
                }}
            />
        </Tabs>
    );
}
