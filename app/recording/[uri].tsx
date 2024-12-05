import useRecord from "@/hooks/useRecord";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import * as Notifications from "expo-notifications";



export default function Recording() {
  const { uri } : any = useLocalSearchParams();
  const { get_recording, unload_recording , delete_recording} = useRecord();
  const router = useRouter();

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
    }
  }, [uri, get_recording, unload_recording]);

  
  return (
    <SafeAreaView className="flex-1 ">
      <LinearGradient
        colors={["#ef709b", "#fa9372"]}
        className={"flex-1"}
      >
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
              color="#9b9b9b"
            >
              <Path
                opacity="0.4"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12C3 11.4477 3.44772 11 4 11L20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L4 13C3.44772 13 3 12.5523 3 12Z"
                fill="#9b9b9b"
              ></Path>
              <Path
                d="M5.02786 12C5.12116 12.1548 5.31675 12.4329 5.53062 12.6749C5.95637 13.1568 6.5431 13.7072 7.1556 14.2389C7.76313 14.7664 8.3736 15.2564 8.83397 15.6156C9.06363 15.7948 9.45995 16.0942 9.59308 16.1948C10.0377 16.5223 10.1327 17.1483 9.8052 17.5929C9.47769 18.0376 8.85169 18.1326 8.40699 17.8051L8.40328 17.8023C8.2589 17.6933 7.84028 17.3771 7.60352 17.1923C7.1264 16.82 6.48686 16.307 5.84439 15.7492C5.20689 15.1957 4.54362 14.5784 4.03187 13.9992C3.777 13.7108 3.53856 13.4082 3.35842 13.1094C3.19484 12.838 3.00002 12.4432 3 12C3.00002 11.5569 3.19484 11.162 3.35842 10.8906C3.53856 10.5918 3.777 10.2892 4.03186 10.0008C4.54362 9.4216 5.20689 8.80434 5.84439 8.25084C6.48686 7.69303 7.1264 7.18002 7.60352 6.80767C7.84028 6.62291 8.25863 6.30693 8.40301 6.19788L8.40699 6.19487C8.85169 5.86736 9.47769 5.96236 9.8052 6.40706C10.1327 6.85173 10.0377 7.47768 9.59308 7.80521C9.45995 7.90576 9.06363 8.20515 8.83397 8.38437C8.3736 8.74365 7.76313 9.23357 7.1556 9.76105C6.5431 10.2928 5.95637 10.8432 5.53062 11.3251C5.31675 11.5671 5.12116 11.8452 5.02786 12Z"
                fill="#9b9b9b"
              ></Path>
            </Svg>
          </TouchableOpacity>
          <Text className="text-center text-xl">Now Playing</Text>
          <TouchableOpacity className="mt-1" onPress={() => {
            delete_recording(uri);
            unload_recording()
          }}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              color="#9b9b9b"
            >
              <Path
                opacity="0.4"
                d="M19.5825 15.6564C19.5058 16.9096 19.4449 17.9041 19.3202 18.6984C19.1922 19.5131 18.9874 20.1915 18.5777 20.7849C18.2029 21.3278 17.7204 21.786 17.1608 22.1303C16.5491 22.5067 15.8661 22.6713 15.0531 22.75L8.92739 22.7499C8.1135 22.671 7.42972 22.5061 6.8176 22.129C6.25763 21.7841 5.77494 21.3251 5.40028 20.7813C4.99073 20.1869 4.78656 19.5075 4.65957 18.6917C4.53574 17.8962 4.47623 16.9003 4.40122 15.6453L3.75 4.75H20.25L19.5825 15.6564Z"
                fill="#9b9b9b"
              ></Path>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 17.9648C9.08579 17.9648 8.75 17.6291 8.75 17.2148L8.75 11.2148C8.75 10.8006 9.08579 10.4648 9.5 10.4648C9.91421 10.4648 10.25 10.8006 10.25 11.2148L10.25 17.2148C10.25 17.6291 9.91421 17.9648 9.5 17.9648Z"
                fill="#9b9b9b"
              ></Path>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5 10.4648C14.9142 10.4648 15.25 10.8006 15.25 11.2148L15.25 17.2148C15.25 17.6291 14.9142 17.9648 14.5 17.9648C14.0858 17.9648 13.75 17.6291 13.75 17.2148L13.75 11.2148C13.75 10.8006 14.0858 10.4648 14.5 10.4648Z"
                fill="#9b9b9b"
              ></Path>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3473 1.28277C13.9124 1.33331 14.4435 1.50576 14.8996 1.84591C15.2369 2.09748 15.4712 2.40542 15.6714 2.73893C15.8569 3.04798 16.0437 3.4333 16.2555 3.8704L16.6823 4.7507H21C21.5523 4.7507 22 5.19842 22 5.7507C22 6.30299 21.5523 6.7507 21 6.7507C14.9998 6.7507 9.00019 6.7507 3 6.7507C2.44772 6.7507 2 6.30299 2 5.7507C2 5.19842 2.44772 4.7507 3 4.7507H7.40976L7.76556 3.97016C7.97212 3.51696 8.15403 3.11782 8.33676 2.79754C8.53387 2.45207 8.76721 2.13237 9.10861 1.87046C9.57032 1.51626 10.1121 1.33669 10.6899 1.28409C11.1249 1.24449 11.5634 1.24994 12 1.25064C12.5108 1.25146 12.97 1.24902 13.3473 1.28277ZM9.60776 4.7507H14.4597C14.233 4.28331 14.088 3.98707 13.9566 3.7682C13.7643 3.44787 13.5339 3.30745 13.1691 3.27482C12.9098 3.25163 12.5719 3.2507 12.0345 3.2507C11.4837 3.2507 11.137 3.25166 10.8712 3.27585C10.4971 3.30991 10.2639 3.45568 10.0739 3.78866C9.94941 4.00687 9.81387 4.29897 9.60776 4.7507Z"
                fill="#9b9b9b"
              ></Path>
            </Svg>
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
            <Text className="text-center text-3xl py-8">{uri}</Text>
            <View className="flex-row justify-center">
              <TouchableOpacity onPress={() => get_recording(uri)}>
                <Svg
                  width="108"
                  height="108"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  color="#9b9b9b"
                >
                  <Path
                    opacity="0.4"
                    d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z"
                    fill="#9b9b9b"
                  ></Path>
                  <Path
                    d="M9.95576 15.3862C9.5 15.0791 9.5 14.3195 9.5 12.8002V11.1998C9.5 9.6805 9.5 8.92086 9.95576 8.61382C10.4115 8.30678 11.0348 8.6465 12.2815 9.32594L13.7497 10.1262C15.2499 10.9438 16 11.3526 16 12C16 12.6474 15.2499 13.0562 13.7497 13.8738L12.2815 14.6741C11.0348 15.3535 10.4115 15.6932 9.95576 15.3862Z"
                    fill="#9b9b9b"
                  ></Path>
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
