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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rec_storage, Recording } from "@/types/types";

export default function useRecord() {
  const [isRecording, setIsrecording] = useState<any | null>(null);
  const [audioURI, setAudioURI] = useState("");
  const sound = new Audio.Sound();
  const [duration, setDuration] = useState<string | null>(null);
  const incrementRef = useRef<number>(0);
  const [onOpen, setOpen] = useState<boolean>(false);
  const [audioName, setAudioname] = useState<string>("");

  const [recordings, setRecordings] = useState([]);

  const router = useRouter();

  const start_recording = async () => {
    setDuration(null);
    try {
      const permision = await Audio.requestPermissionsAsync();
      if (permision.status !== "granted") {
        console.log("denied");
        return;
      }

      console.log("Starting recording...");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync();
      setIsrecording(recording);
    } catch (e) {
      console.log(e);
    }
  };

  const stop_recording = async () => {
    try {
      await isRecording.stopAndUnloadAsync();
      const uri = isRecording.getURI();
      setAudioURI(uri);
      const status = await isRecording.getStatusAsync();
      const minutes = Math.floor(status.durationMillis / 60000);
      const seconds = Math.floor((status.durationMillis % 60000) / 1000);
      setDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsrecording(null);
    }
  };

  const playRecording = async () => {
    if (!audioURI) return;
    try {
      await sound.unloadAsync();
      await sound.loadAsync({ uri: audioURI });
      await sound.playAsync();
    } catch (err) {
      console.error("Failed to play recording", err);
    }
  };

  const get_recordings = async () => {
    try {
      const fileList = await filesystem.readDirectoryAsync(
        `${filesystem.documentDirectory}/recordings/`
      );
      const m4s = fileList.filter((file) => file.endsWith("m4a"));
      const items: any = await AsyncStorage.getItem("recordings");

      const parse = JSON.parse(items) || [];
      setRecordings(parse);
    } catch (error) {
      console.log(error);
    }
  };

  const delete_recordings = async () => {
    try {
      await AsyncStorage.removeItem("recordings");
      console.log("deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const save_recording = async () => {
    try {
      await filesystem.copyAsync({
        from: audioURI,
        to: `${filesystem.documentDirectory}/recordings/${audioName}.m4a`,
      });

      const prevItems: any = await AsyncStorage.getItem("recordings");

      const parsedData = JSON.parse(prevItems) || [];

      const new_recording = {
        name: audioName,
        duration,
        audioURI,
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        "recordings",
        JSON.stringify([...parsedData, new_recording])
      );

      console.log("saved");
      router.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const get_recording = async (uri: string) => {
    try {
      const recordings: any = await AsyncStorage.getItem("recordings");

      const parse_files = JSON.parse(recordings) || [];

      const file_info = parse_files.filter(
        (file: Rec_storage) => file.name === uri
      );

      if (!file_info) return;

      await sound.unloadAsync();
      await sound.loadAsync({ uri: file_info.at(0).audioURI });
      await sound.playAsync();

      console.log("playing");
    } catch (error) {
      console.log(error);
    }
  };

  const unload_recording = async () => {
    try {
      await sound.stopAsync();
      console.log("stopped");
    } catch (error) {
      console.log(error);
    }
  };

  const delete_recording = async (uri : string) => {
    try {
      const get_records : any = await AsyncStorage.getItem("recordings");
      const parse_recordings : Recording[] = JSON.parse(get_records) || [];

      const record_delete = parse_recordings.filter(rec => rec.name !== uri);

      await AsyncStorage.setItem("recordings", JSON.stringify(record_delete));

      router.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    start_recording,
    stop_recording,
    save_recording,
    get_recordings,
    playRecording,
    isRecording,
    setOpen,
    onOpen,
    duration,
    audioURI,
    sound,
    audioName,
    setAudioname,
    recordings,
    delete_recordings,
    get_recording,
    unload_recording,
    delete_recording,
  };
}
