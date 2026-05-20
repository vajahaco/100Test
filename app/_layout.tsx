import { Stack } from 'expo-router';

export default function Layout() {
    return <Stack
    screenOptions={{
        // 이 한 줄이 핵심입니다!
        headerShown: false, 
    }}
    />;
}