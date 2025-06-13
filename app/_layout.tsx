import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {PlayersProvider} from "./contexts/PlayersContext";
import {MatchesProvider} from "@/app/contexts/MatchesContext";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'Oi-Regular': require('./assets/fonts/Oi-Regular.ttf'),
        'Roboto-slab': require('./assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
        'Luckiestguy': require('./assets/fonts/LuckiestGuy-Regular.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <PlayersProvider>
            <MatchesProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        animation: "fade",
                        contentStyle: { backgroundColor: "#1A1E21" }
                    }}
                />
            </MatchesProvider>
        </PlayersProvider>
    );
}
