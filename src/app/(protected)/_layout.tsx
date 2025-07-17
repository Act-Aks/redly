import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Redirect href={'/signIn'} />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
