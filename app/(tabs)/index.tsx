import useRecord from "@/hooks/useRecord";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { Authcontext } from "@/context/auth";
import { User } from "@/types/types";
import React from "react";
import { Microphone, PlayCircle, Profile } from "iconsax-react-native";

interface Recording {
  name: string;
  duration: string;
  audioURI: string;
  createdAt: string;
}

export default function Home() {
  const { get_recordings, recordings } = useRecord();
  const [searchvalue, setSearchvalue] = useState<string>("");
  const { log_out } = useAuth();
  const { currentUser, Authenticate } = useContext(Authcontext);
  const user : User = currentUser;

  const naviagte = useRouter();

  useFocusEffect(
    useCallback(() => {
      Authenticate()
      get_recordings();
    }, [])
  );

  const queried = recordings.filter((q : Recording)=> q.name.toLowerCase().includes(searchvalue.toLowerCase()));

  return (
    <SafeAreaView className="flex-1 px-4 ">
      <View>
        <View className="flex-row justify-between px-3 py-4">
          <View className="flex-row gap-1">
          <Microphone size="32" color="#818cf8" variant="Bulk"/>
            <Text className="text-xl pt-1 text-gray-500">AudioArc</Text>
          </View>
          <View className="flex-row gap-2">
          <Profile size="32" color="#818cf8" variant="Bulk"/>
            <Text className="text-md pt-2 text-gray-400">{user.username}</Text>
          </View>
        </View>
        {recordings.length !== 0 && <View className="flex-row gap-1 bg-white py-1 px-3 rounded-lg mb-3" >
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
        </View> }
        <View className="flex-col gap-3">
          {recordings.length === 0 && (
            <>
            <View className="flex-row justify-center pt-[6rem]">
              <Image source={{ uri : "https://img.freepik.com/premium-vector/hand-drawn-mini-illustration-nothing-here_67813-19888.jpg?ga=GA1.1.1313358536.1732799604&semt=ais_hybrid" }} height={300} width={300} className="rounded-lg"/>
            </View>
            <Text className="text-center text-2xl">No <Text className="text-indigo-500">Recording</Text> Yet</Text>
            </>
          )}
          {recordings.length === 0 ? "" : queried.length === 0 ? (<Text className="text-center pt-5">
            No recordings found
          </Text>) : null}
          {queried.length !== 0 &&
            queried.reverse().map((record: Recording, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  naviagte.push({
                    pathname: "/recording/[uri]", 
                    params: { uri: record.name },
                  });
                }}
              >
                <View className="flex-row gap-2 bg-white p-3 rounded-xl">
                  <View>
                  <PlayCircle size="45" color="#818cf8" variant="Bulk"/>
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
