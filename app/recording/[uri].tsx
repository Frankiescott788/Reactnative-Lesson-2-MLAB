import useRecord from "@/hooks/useRecord";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import * as Notifications from "expo-notifications";
import useAuth from "@/hooks/useAuth";
import { PlayCircle, Trash } from "iconsax-react-native";

export default function Recording() {
  const { uri }: any = useLocalSearchParams();
  const { get_recording, unload_recording, delete_recording , Share_recording, currentURI } = useRecord();
  const router = useRouter();
  const {log_out} = useAuth();

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };
    getPermission();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  useEffect(() => {
    get_recording(uri);
    const scheduleNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Playing record",
          body: `${uri} currently playing`,
          data: { customData: "Your custom data here" },
        },
        trigger: { seconds: 5 },
      });
    };
    // scheduleNotification()
    return () => {
      unload_recording();
      Notifications.clearLastNotificationResponseAsync();
    };
  }, [uri, get_recording, unload_recording]);

  return (
    <SafeAreaView className="flex-1 ">
      <LinearGradient colors={["#ef709b", "#fa9372"]} className={"flex-1"}>
        <View className="py-3 px-5">
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                color="white"
              >
                <Path
                  opacity="0.4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 12C3 11.4477 3.44772 11 4 11L20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L4 13C3.44772 13 3 12.5523 3 12Z"
                  fill="white"
                ></Path>
                <Path
                  d="M5.02786 12C5.12116 12.1548 5.31675 12.4329 5.53062 12.6749C5.95637 13.1568 6.5431 13.7072 7.1556 14.2389C7.76313 14.7664 8.3736 15.2564 8.83397 15.6156C9.06363 15.7948 9.45995 16.0942 9.59308 16.1948C10.0377 16.5223 10.1327 17.1483 9.8052 17.5929C9.47769 18.0376 8.85169 18.1326 8.40699 17.8051L8.40328 17.8023C8.2589 17.6933 7.84028 17.3771 7.60352 17.1923C7.1264 16.82 6.48686 16.307 5.84439 15.7492C5.20689 15.1957 4.54362 14.5784 4.03187 13.9992C3.777 13.7108 3.53856 13.4082 3.35842 13.1094C3.19484 12.838 3.00002 12.4432 3 12C3.00002 11.5569 3.19484 11.162 3.35842 10.8906C3.53856 10.5918 3.777 10.2892 4.03186 10.0008C4.54362 9.4216 5.20689 8.80434 5.84439 8.25084C6.48686 7.69303 7.1264 7.18002 7.60352 6.80767C7.84028 6.62291 8.25863 6.30693 8.40301 6.19788L8.40699 6.19487C8.85169 5.86736 9.47769 5.96236 9.8052 6.40706C10.1327 6.85173 10.0377 7.47768 9.59308 7.80521C9.45995 7.90576 9.06363 8.20515 8.83397 8.38437C8.3736 8.74365 7.76313 9.23357 7.1556 9.76105C6.5431 10.2928 5.95637 10.8432 5.53062 11.3251C5.31675 11.5671 5.12116 11.8452 5.02786 12Z"
                  fill="white"
                ></Path>
              </Svg>
            </TouchableOpacity>
            <Text className="text-center text-xl text-white">Now Playing</Text>
            <TouchableOpacity
              className="mt-1"
              onPress={() => {
                delete_recording(uri);
                unload_recording();
              }}
            >
              <Trash size="32" color="white" variant="Bulk"/>
            </TouchableOpacity>
          </View>
          <View>
            <View className="flex-row justify-center">
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/headphones-dark-blue_98292-4128.jpg?ga=GA1.1.1313358536.1732799604&semt=ais_hybrid",
                }}
                className="h-[20rem] w-[20rem] rounded-full mt-[8rem] "
              />
            </View>

            <View>
              <Text className="text-center text-3xl text-white py-8">{uri}</Text>
              <View className="flex-row justify-center">
                <TouchableOpacity onPress={() => get_recording(uri)}>
                <PlayCircle size="100" color="white" variant="Bulk"/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="flex-row justify-center pt-10" onPress={() => {
                  Share_recording(currentURI);
                  // log_out()
              }
                }>
                <View className="flex-row gap-1 border border-dashed py-1 px-3 rounded-full border-white" >
                  <View>
                    <Text className="text-white">Share</Text>
                  </View>

                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    color="white"
                  >
                    <Path
                      opacity="0.4"
                      d="M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z"
                      fill="white"
                    ></Path>
                    <Path
                      opacity="0.4"
                      d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z"
                      fill="white"
                    ></Path>
                    <Path
                      opacity="0.4"
                      d="M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z"
                      fill="white"
                    ></Path>
                    <Path
                      d="M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z"
                      stroke="white"
                      stroke-width="1.5"
                    ></Path>
                    <Path
                      d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z"
                      stroke="white"
                      stroke-width="1.5"
                    ></Path>
                    <Path
                      d="M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z"
                      stroke="white"
                      stroke-width="1.5"
                    ></Path>
                    <Path
                      d="M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495"
                      stroke="white"
                      stroke-width="1.5"
                    ></Path>
                  </Svg>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
