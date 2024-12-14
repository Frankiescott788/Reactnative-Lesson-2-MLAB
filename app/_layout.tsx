import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import AuthProvider, { Authcontext } from "@/context/auth";
import CreateTable from "@/db/db";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  CreateTable();
  

  return (
<AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="/profile/profile" /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar backgroundColor="white" />
    </AuthProvider>
    
  );
}
