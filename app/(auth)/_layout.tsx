// _layout.tsx in (auth)

import { Authcontext } from "@/context/auth";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext } from "react";
import { Text } from "react-native";

export default function Authlayout () {

const { isAuthenticated, isLoading } = useContext(Authcontext);

    if(isLoading) {
        return <Text>Loading...</Text>
    }
   if(isAuthenticated) {
    return <Redirect href={"/(tabs)"}/>
   }

    return (
        <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}