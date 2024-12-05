import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio } from "expo-av";
import { Svg, Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import * as filesystem from "expo-file-system";
import { useRouter } from "expo-router";
import useRecord from "@/hooks/useRecord";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(): React.JSX.Element {
  const router = useRouter();

  const {
    start_recording,
    stop_recording,
    playRecording,
    save_recording,
    get_recordings,
    audioName,
    audioURI,
    duration,
    setOpen,
    onOpen,
    sound,
    setAudioname,
    isRecording,
    delete_recordings
  } = useRecord();

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#ef709b", "#fa9372"]}
        className={"flex-1"}
      >
        <Modal transparent={true} visible={onOpen} animationType="fade">
          <TouchableOpacity
            className="flex-1 justify-center items-center"
            style={styles.modal}
            onPress={() => {
              setOpen(!onOpen);
            }}
          >
            <View className=" ">
              <View className="bg-white w-[20rem] p-3 rounded-lg">
                <Text className="text-lg text-gray-400">
                  Give your recording a name
                </Text>
                <TextInput
                  className="border-2 rounded-lg  border-gray-300 my-3"
                  placeholder="Audio name"
                  onChangeText={(value) => setAudioname(value)}
                />
                <TouchableOpacity
                  className="bg-indigo-500 py-3 rounded-lg"
                  style={styles.buttonShadow}
                  onPress={() => {
                    console.log(audioName);
                  }}
                >
                  <Text
                    className="text-center text-white"
                    onPress={save_recording}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" py-3 rounded-lg"
                  style={styles.buttonShadow}
                >
                  <Text
                    className="text-center text-gray-400"
                    onPress={() => {
                      setOpen(!onOpen);
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <View className="h-screen w-full">
          <Text className="text-center text-white text-2xl py-4">Recorder</Text>
          {!isRecording && (
            <View className="flex-row gap-1 justify-center">
              <Svg
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"white"}
                fill={"none"}
              >
                <Path
                  d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <Path
                  d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
              <Text className=" text-white text-sm">Tap to record</Text>
            </View>
          )}
          {isRecording && (
            <Text className="pt-[4rem] text-center text-white">
              Recording...
            </Text>
          )}
          <View className="flex-row justify-center pt-[12rem]">
            <TouchableOpacity
              className={`flex-row justify-center rounded-full look border border-gray-200 w-[10rem] h-[10rem] pt-[3rem] ${
                isRecording ? "border-solid" : "border-dashed"
              } `}
              style={{
                paddingInline: 15,
                paddingBlock: 40,
              }}
              onPress={() => {
                start_recording();
              }}
            >
              <Svg
                viewBox="0 0 24 24"
                width={48}
                height={48}
                color={"white"}
                fill={"none"}
              >
                <Path
                  d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <Path
                  d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-[5rem]">
            <TouchableOpacity onPress={playRecording}>
              <Svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                color="white"
              >
                <Path
                  opacity="0.4"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z"
                  fill="white"
                ></Path>
                <Path
                  d="M9.95576 15.3862C9.5 15.0791 9.5 14.3195 9.5 12.8002V11.1998C9.5 9.6805 9.5 8.92086 9.95576 8.61382C10.4115 8.30678 11.0348 8.6465 12.2815 9.32594L13.7497 10.1262C15.2499 10.9438 16 11.3526 16 12C16 12.6474 15.2499 13.0562 13.7497 13.8738L12.2815 14.6741C11.0348 15.3535 10.4115 15.6932 9.95576 15.3862Z"
                  fill="white"
                ></Path>
              </Svg>
              <Text className="text-center text-white ">Play</Text>
              {duration?.length !== 0 && (
                <Text className="text-center text-white text-sm">
                  {duration}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            className="flex-row justify-center gap-3"
            style={{ marginTop: 40 }}
          >
            <TouchableOpacity className="mt-5">
              <View>
                <Svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="injected-svg"
                  data-src="https://cdn.hugeicons.com/icons/cancel-circle-bulk-rounded.svg"
                  role="img"
                  color="white"
                >
                  <Path
                    opacity="0.4"
                    d="M1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12Z"
                    fill="white"
                  ></Path>
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.7071 8.29292C16.0976 8.68345 16.0976 9.31662 15.7071 9.70713L13.4141 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3165 15.7071 15.7071C15.3166 16.0976 14.6835 16.0976 14.2929 15.7071L11.9998 13.4142L9.70708 15.7067C9.31655 16.0972 8.68338 16.0972 8.29287 15.7067C7.90236 15.3162 7.90238 14.683 8.29292 14.2925L10.5855 12L8.29292 9.70752C7.90238 9.31701 7.90236 8.68385 8.29287 8.29331C8.68338 7.90277 9.31655 7.90275 9.70708 8.29326L11.9998 10.5858L14.2929 8.29287C14.6835 7.90236 15.3166 7.90238 15.7071 8.29292Z"
                    fill="white"
                  ></Path>
                </Svg>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className={`${
                isRecording
                  ? "bg-white"
                  : "opacity-25 border border-dashed border-gray-50"
              } rounded-full h-[5rem] w-[5rem] flex-row justify-center pt-5`}
              onPress={stop_recording}
              disabled={!isRecording}
            >
              <View className="h-10 w-10 bg-red-400 rounded-sm"></View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-5"
              onPress={() => {
                setOpen(!onOpen);
              }}
            >
              <View>
                <Svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  color="#9b9b9b"
                >
                  <Path
                    opacity="0.4"
                    d="M12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75Z"
                    fill="white"
                  ></Path>
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.7372 9.67573C17.1103 9.26861 17.0828 8.63604 16.6757 8.26285C16.2686 7.88966 15.636 7.91716 15.2628 8.32428L10.4686 13.5544L8.70711 11.7929C8.31658 11.4024 7.68342 11.4024 7.29289 11.7929C6.90237 12.1834 6.90237 12.8166 7.29289 13.2071L9.79289 15.7071C9.98576 15.9 10.249 16.0057 10.5217 15.9998C10.7944 15.9938 11.0528 15.8768 11.2372 15.6757L16.7372 9.67573Z"
                    fill="white"
                  ></Path>
                </Svg>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonShadow: {
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 40,
    shadowOpacity: 0.5,
  },
});
