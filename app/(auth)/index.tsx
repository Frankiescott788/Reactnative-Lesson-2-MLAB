import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function Signin() {
  const router = useRouter();

  const { sign_up, sign_in, errors } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1  bg-white">
        <View className="pt-5 px-3">
          <Text className="text-sm text-center font-semibold text-indigo-400">
            Sign In
          </Text>
        </View>
        <View className="flex-row justify-center pt-[5rem]">
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/vector-drawn-illustration-security-system-phone-personal-data-protection-graphic-key-lock-unlock-checkmark-antivirus-hacking-privacy-concept-flat-drawing-style-eps10_399089-5712.jpg?w=740",
            }}
            className="h-[15rem] w-[18rem] object-cover"
          />
        </View>
        <View className=" bg-white rounded-lg p-5 mx-2">
          <View className="py-4">
            <Text className="text-3xl text-gray-500">Welcome back</Text>
            <Text className="text-gray-400">Sign in to continue</Text>
          </View>
          <View className="flex-col">
            <View className="flex-row gap-2 bg-gray-100 p-4 rounded-lg">
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
              <TextInput placeholder="Email" className="w-full" onChangeText={setEmail}/>
              
            </View>
            {errors.email.length !==0 && <Text className="mt-2 text-sm text-red-400">{errors.email}</Text>}
            <View className="flex-row gap-2 bg-gray-100 p-4 rounded-lg mt-5">
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
                    d="M4.25 15C4.25 10.7198 7.71979 7.25 12 7.25C16.2802 7.25 19.75 10.7198 19.75 15C19.75 19.2802 16.2802 22.75 12 22.75C7.71979 22.75 4.25 19.2802 4.25 15Z"
                    fill="#9b9b9b"
                  ></Path>
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 15C9 14.4477 9.44772 14 10 14L10.0072 14C10.5595 14 11.0072 14.4477 11.0072 15C11.0072 15.5523 10.5595 16 10.0072 16L10 16C9.44772 16 9 15.5523 9 15ZM12.9928 15C12.9928 14.4477 13.4405 14 13.9928 14L14 14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16L13.9928 16C13.4405 16 12.9928 15.5523 12.9928 15Z"
                    fill="#9b9b9b"
                  ></Path>
                  <Path
                    d="M12 1.25C8.96243 1.25 6.5 3.71243 6.5 6.75V9.53992C7.08168 8.95401 7.75634 8.46054 8.5 8.08347V6.75C8.5 4.817 10.067 3.25 12 3.25C13.933 3.25 15.5 4.817 15.5 6.75V8.08347C16.2437 8.46054 16.9183 8.95401 17.5 9.53992V6.75C17.5 3.71243 15.0376 1.25 12 1.25Z"
                    fill="#9b9b9b"
                  ></Path>
                </Svg>
              </View>
              <TextInput
                placeholder="Password"
                className="w-full"
                secureTextEntry={false}
                onChangeText={setPassword}
              />
            </View>
            {errors.password.length !==0 && <Text className="mt-2 text-sm text-red-400">{errors.password}</Text>}
            <View className="px-4">
              <TouchableOpacity
                className="bg-indigo-600 px-4 py-5 rounded-lg shadow-2xl shadow-indigo-400 mt-8"
                onPress={() => {
                  sign_in(email, password);
                }}
                
              >
                <Text className="text-center text-white">Sign in</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-center text-gray-400">
                Don't have an account?{" "}
                <TouchableOpacity className="pt-1" onPress={() => router.push("/(auth)/signup")}>
                    <Text className="text-indigo-400 font-semibold">Create account</Text>                
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
