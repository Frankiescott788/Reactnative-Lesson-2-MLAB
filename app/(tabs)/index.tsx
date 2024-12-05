import useRecord from "@/hooks/useRecord";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

interface Recording {
  name: string;
  duration: string;
  audioURI: string;
  createdAt: string;
}

export default function Home() {
  const { get_recordings, recordings } = useRecord();
  const [searchvalue, setSearchvalue] = useState<string>("");

  const naviagte = useRouter();

  useFocusEffect(
    useCallback(() => {
      get_recordings();
    }, [])
  );

  const queried = recordings.filter((q : string)=> q.name.toLowerCase().includes(searchvalue.toLowerCase()));

  return (
    <SafeAreaView className="flex-1 px-4 ">
      <View>
        <View>
          <Text className="text-center py-3 text-xl"> Recordings </Text>
          <View></View>
        </View>
        <View className="flex-row gap-1 bg-white py-1 px-3 rounded-lg mb-3" >
          <View className="mt-3">
            <Svg
              viewBox="0 0 24 24"
              width={16}
              height={16}
              color={"#9b9b9b"}
              fill={"none"}
            >
              <Path
                d="M17.5 17.5L22 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </Svg>
          </View>

          <TextInput placeholder="Search..." className="w-full" onChangeText={(e) => {
            setSearchvalue(e)
          }}/>
        </View>
        <View className="flex-col gap-3">
          {recordings.length === 0 && <Text>Nothing</Text>}
          {recordings.length !== 0 &&
            queried.reverse().map((record: Recording, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  naviagte.push({
                    pathname: "/recording/[uri]", // Note: no (tabs) prefix needed
                    params: { uri: record.name },
                  });
                }}
              >
                <View className="flex-row gap-2 bg-white p-3 rounded-xl">
                  <View>
                    <Svg
                      width="48"
                      height="48"
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
                  </View>
                  <View className="pt-1">
                    <Text className="text-md">{record.name}</Text>
                    <Text className="text-sm text-gray-400">
                      {formatDistanceToNowStrict(new Date(record.createdAt), {
                        addSuffix: true,
                      })}
                    </Text>
                  </View>
                  <View className="absolute right-10 pt-7">
                    <Text>{record.duration}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
