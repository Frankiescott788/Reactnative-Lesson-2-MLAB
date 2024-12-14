import { Authcontext } from "@/context/auth";
import { db } from "@/db/db";
import { User } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, User as UserIcon } from "iconsax-react-native";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function EditProfile(): ReactElement {
  const { currentUser } = useContext(Authcontext);

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  const update_profile = async () : Promise<void> => {
    try {
      (await db).runAsync(`UPDATE users SET username = ?, email = ? WHERE _id = ?`, username, email, currentUser._id );
      router.navigate("/(tabs)")
    } catch (error) {
      console.log(error)
    } 
  }


  return (
    <SafeAreaView className="flex-1 p-3 bg-white">

      <View>
        <TouchableOpacity className="flex-row gap-2 " onPress={() => router.back()}>
          <View className="mt-1">
            <Svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#9b9b9b"}
              fill={"none"}
            >
              <Path
                d="M3.99982 11.9998L19.9998 11.9998"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M8.99963 17C8.99963 17 3.99968 13.3176 3.99966 12C3.99965 10.6824 8.99966 7 8.99966 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>

          <Text className="pt-1 text-xl text-gray-400">Back</Text>
        </TouchableOpacity>
        <View className="mt-8">
            <View className="absolute w-full">
            <Text className="py-5 text-xl text-center text-gray-400">Update Profile Information</Text>
            </View>
            
          <View className="flex-row justify-center">
            <Image
              source={require("@/assets/images/profile.jpg")}
              style={{ width: 400, height: 300, resizeMode: "contain" }}
            />
          </View>
          <View>
            <Text className="text-3xl text-gray-500"><Text className="text-indigo-600">Your</Text> Profile, <Text className="text-indigo-600">Your</Text> Way</Text>
            <Text className="text-gray-400">
              Make changes to your profile and keep it fresh.
            </Text>
          </View>
          <View className="flex-col gap-3">
            <View className="flex-row gap-2 bg-gray-100 p-4 rounded-lg mt-5">
              <View className="mt-2">
                <UserIcon size="24" color="#9b9b9b" />
              </View>
              <TextInput
                placeholder={username}
                value={username}
                className="w-full"
                onChangeText={setUsername}
              />
            </View>
            <View className="flex-row gap-2 bg-gray-100 p-4 rounded-lg mt-2">
              <View className="mt-2">
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
                    d="M9.07999 2.78677C11.033 2.7377 12.967 2.7377 14.92 2.78677L14.9782 2.78824C16.503 2.82652 17.73 2.85733 18.7133 3.02859C19.7428 3.20788 20.5795 3.55176 21.2864 4.26131C21.9903 4.96789 22.3324 5.79258 22.5082 6.80539C22.6757 7.76976 22.7012 8.96679 22.7328 10.4496L22.7341 10.5084C22.7553 11.5047 22.7553 12.4952 22.7341 13.4916L22.7328 13.5503C22.7012 15.0332 22.6757 16.2302 22.5082 17.1946C22.3324 18.2074 21.9903 19.0321 21.2864 19.7386C20.5795 20.4482 19.7428 20.7921 18.7133 20.9714C17.73 21.1426 16.503 21.1734 14.9782 21.2117L14.92 21.2132C12.967 21.2622 11.033 21.2622 9.07999 21.2132L9.02177 21.2117C7.49697 21.1734 6.27001 21.1426 5.2867 20.9714C4.2572 20.7921 3.42048 20.4482 2.71362 19.7386C2.00972 19.0321 1.66764 18.2074 1.49176 17.1946C1.32429 16.2302 1.29879 15.0332 1.26719 13.5503L1.26594 13.4916C1.24469 12.4952 1.24469 11.5047 1.26593 10.5084L1.26719 10.4496C1.29878 8.96677 1.32429 7.76974 1.49176 6.80537C1.66764 5.79256 2.00971 4.96787 2.71362 4.26129C3.42048 3.55174 4.2572 3.20786 5.2867 3.02857C6.27002 2.85732 7.497 2.82651 9.02182 2.78823L9.07999 2.78677Z"
                    fill="#9b9b9b"
                  ></Path>
                  <Path
                    d="M6.13931 7.99116C6.42039 7.51575 7.03364 7.35821 7.50905 7.63929L10.4511 9.37872C11.2914 9.87556 11.6897 10.0001 12.0001 10.0001C12.3105 10.0001 12.7088 9.87556 13.5492 9.37872L16.4912 7.63929C16.9666 7.35821 17.5798 7.51575 17.8609 7.99116C18.142 8.46657 17.9845 9.07982 17.5091 9.3609L14.567 11.1003C13.6915 11.618 12.8897 12.0001 12.0001 12.0001C11.1105 12.0001 10.3087 11.618 9.43319 11.1003L6.49117 9.3609C6.01576 9.07982 5.85823 8.46657 6.13931 7.99116Z"
                    fill="#9b9b9b"
                  ></Path>
                </Svg>
              </View>
              <TextInput
                placeholder={email}
                value={email}
                className="w-full"
                onChangeText={setEmail}
              />
            </View>
            <TouchableOpacity className="bg-indigo-500 p-[20px] rounded-lg my-4" onPress={update_profile}>
                <Text className="text-center text-white text-md">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
