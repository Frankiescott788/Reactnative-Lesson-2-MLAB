import { Authcontext } from "@/context/auth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Modal as Feedback,
  Modal as TANDC,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { DocumentText, Edit, Headphone } from "iconsax-react-native";

export default function Profile() {
  const { currentUser } = useContext(Authcontext);
  const router = useRouter();
  const { log_out } = useAuth();
  const [support, setSupport] = useState(true);
  const [toast, setToast] = useState(false);
  const [textField, setTextfield] = useState("");
  const [errorM, setErrM] = useState("");
  const [onOpen, setOnOpen] = useState(false);
  const [tandcs, setTsandcs] = useState(false);

  const Submitfeedback = () => {
    setErrM("");
    if (!textField) {
      setErrM("Please fill the input");
      return;
    }
    // setOnOpen(false)
  };

  return (
    <SafeAreaView className="flex-1 p-3">
      <TANDC visible={tandcs} animationType="slide">
        <View className="flex-1 p-2">
          <Text className="text-3xl text-gray-500">Terms and Conditions</Text>
          <View className="flex-column gap-4">
            <Text className="py-2 text-gray-400">
              By using this App, you agree to abide by these Terms and
              Conditions. If you do not agree, please refrain from using the
              App.
            </Text>
            <View>
              <Text className="text-xl text-gray-500">1. License</Text>
              <Text className="text-gray-400">
                We grant you a limited, non-exclusive, non-transferable, and
                revocable license to use the App solely for personal,
                non-commercial purposes.
              </Text>
            </View>
            <View>
              <Text className="text-xl text-gray-500">2. User Obligations</Text>
              <Text className="text-gray-400">
                By using the App, you agree that you will not: Use the App for
                illegal or unauthorized purposes. Record any content without
                obtaining the necessary consent from all parties involved.
                Reverse engineer, modify, or attempt to extract the App’s source
                code.
              </Text>
            </View>
            <View>
              <Text className="text-xl text-gray-500">3. Data Privacy</Text>
              <Text className="text-gray-400">
                The App may collect and store audio recordings locally on your
                device. We do not store or share your recordings without your
                explicit consent. Please ensure your use of the App complies
                with local laws regarding data privacy and consent.
              </Text>
            </View>
            <View>
              <Text className="text-xl text-gray-500">
                4. Third-Party Services
              </Text>
              <Text className="text-gray-400">
                The App may interact with third-party services or APIs. We are
                not responsible for the functionality, data practices, or terms
                of such services.
              </Text>
            </View>
            
          </View>
          <View className="absolute bottom-4 left-0 right-0 w-full p-3">
            <TouchableOpacity className="bg-indigo-500 w-full p-5 rounded-lg ms-[10px]" onPress={() => setTsandcs(false)}>
              <Text className="text-center text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TANDC>
      <Feedback visible={onOpen} animationType="slide">
        <View className="flex-1 p-3">
          <View className="absolute mt-5 px-3 w-full flex-row justify-between">
            <Text className="text-xl text-gray-400">Voice Recoder Support</Text>
            <TouchableOpacity className=" p-3" onPress={() => setOnOpen(false)}>
              <Svg
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#9b9b9b"}
                fill={"none"}
              >
                <Path
                  d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View className="">
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/online-game-streamer-illustration-concept-white-background_701961-10986.jpg?ga=GA1.1.1313358536.1732799604&semt=ais_hybrid",
              }}
              style={{
                width: 400,
                height: 400,
                resizeMode: "contain",
              }}
            />
            <View>
              <View className="flex-row p-2 gap-2 bg-slate-200 w-[17rem] rounded-lg">
                <TouchableOpacity
                  className={`${
                    support ? "bg-indigo-500" : ""
                  } px-[2rem] py-3 rounded-md`}
                  onPress={() => {
                    setSupport(true);
                  }}
                >
                  <Text className={`${support ? "text-white" : ""}`}>
                    Feedback
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`${
                    support ? "" : "bg-indigo-500"
                  } px-[2rem] py-3 rounded-md`}
                  onPress={() => {
                    setSupport(false);
                  }}
                >
                  <Text className={`${support ? "" : "text-white"}`}>
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="bg-gray-100 h-[10rem] mt-5 rounded-lg">
                <TextInput
                  placeholder={
                    support
                      ? "Start Typing feedback..."
                      : "Report your issue..."
                  }
                  className=""
                  multiline
                  onChangeText={setTextfield}
                ></TextInput>
              </View>
              {errorM && (
                <Text className="py-2 text-sm text-red-500">{errorM}</Text>
              )}
              <View>
                <TouchableOpacity
                  className="bg-indigo-500 rounded-lg mt-5"
                  onPress={() => {
                    Submitfeedback();
                  }}
                >
                  <Text className="text-center p-5 text-white">Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" rounded-lg mt-3"
                  onPress={() => {
                    setOnOpen(false);
                  }}
                >
                  <Text className="text-center p-5 text-gray-400">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Feedback>
      <View className="flex-1">
        <View className="">
          <Text className="text-center my-5 text-indigo-400">Profile</Text>
          <View className="flex-row justify-center">
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg",
              }}
              height={200}
              width={200}
              className="rounded-full"
            />
          </View>
          <View>
            <Text className="text-center text-3xl py-2 text-gray-500">
              {currentUser.username}
            </Text>
          </View>
        </View>
        <View>
          <View className="flex-row justify-between px-1 py-2">
            <Text className="text-gray-400 py-2 px-1">
              Personal information
            </Text>
            <TouchableOpacity
              className="flex-row gap-1 mt-2 bg-indigo-500 pt-1 px-3 rounded-lg"
              onPress={() => {
                router.navigate(`/profile/profile`);
              }}
            >
              <Text className="text-white">Edit</Text>
              <Edit size="20" color="white" />
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-lg">
            <View className="flex-row justify-between py-5 border-b mx-1 border-gray-100 ">
              <View className="flex-row gap-1">
                <Svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  color="#9b9b9b"
                >
                  <Path
                    opacity="0.4"
                    d="M7.37859 14.3122C8.86094 13.6364 10.6214 13.25 12.5 13.25C14.3786 13.25 16.1391 13.6364 17.6214 14.3122C19.0996 14.986 19.75 16.5343 19.75 17.9704C19.7501 18.4032 19.7501 18.8744 19.7067 19.1972C19.6589 19.5527 19.5465 19.9284 19.2374 20.2374C18.9284 20.5465 18.5527 20.6589 18.1972 20.7067C17.8744 20.7501 17.4776 20.7501 17.0448 20.75H17.0448H7.95526H7.95525C7.52244 20.7501 7.12561 20.7501 6.8028 20.7067C6.44732 20.6589 6.07159 20.5465 5.76257 20.2374C5.45355 19.9284 5.3411 19.5527 5.29331 19.1972C5.24991 18.8744 5.24996 18.4032 5.25001 17.9704C5.25001 16.5343 5.9004 14.986 7.37859 14.3122Z"
                    fill="#9b9b9b"
                  ></Path>
                  <Path
                    d="M8.25 7.5C8.25 5.15279 10.1528 3.25 12.5 3.25C14.8472 3.25 16.75 5.15279 16.75 7.5C16.75 9.84721 14.8472 11.75 12.5 11.75C10.1528 11.75 8.25 9.84721 8.25 7.5Z"
                    fill="#9b9b9b"
                  ></Path>
                </Svg>
                <Text className="pt-2 text-gray-400">Username</Text>
              </View>

              <View></View>
              <Text className="pt-2 text-md text-gray-400 px-3">
                {currentUser.username}
              </Text>
            </View>
            <View className="flex-row justify-between gap-2 ps-1 px-2 py-5 border-b mx-1 border-gray-100">
              <View className="flex-row gap-2">
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
                    d="M9.07999 2.78677C11.033 2.7377 12.967 2.7377 14.92 2.78677L14.9782 2.78824C16.503 2.82652 17.73 2.85733 18.7133 3.02859C19.7428 3.20788 20.5795 3.55176 21.2864 4.26131C21.9903 4.96789 22.3324 5.79258 22.5082 6.80539C22.6757 7.76976 22.7012 8.96679 22.7328 10.4496L22.7341 10.5084C22.7553 11.5047 22.7553 12.4952 22.7341 13.4916L22.7328 13.5503C22.7012 15.0332 22.6757 16.2302 22.5082 17.1946C22.3324 18.2074 21.9903 19.0321 21.2864 19.7386C20.5795 20.4482 19.7428 20.7921 18.7133 20.9714C17.73 21.1426 16.503 21.1734 14.9782 21.2117L14.92 21.2132C12.967 21.2622 11.033 21.2622 9.07999 21.2132L9.02177 21.2117C7.49697 21.1734 6.27001 21.1426 5.2867 20.9714C4.2572 20.7921 3.42048 20.4482 2.71362 19.7386C2.00972 19.0321 1.66764 18.2074 1.49176 17.1946C1.32429 16.2302 1.29879 15.0332 1.26719 13.5503L1.26594 13.4916C1.24469 12.4952 1.24469 11.5047 1.26593 10.5084L1.26719 10.4496C1.29878 8.96677 1.32429 7.76974 1.49176 6.80537C1.66764 5.79256 2.00971 4.96787 2.71362 4.26129C3.42048 3.55174 4.2572 3.20786 5.2867 3.02857C6.27002 2.85732 7.497 2.82651 9.02182 2.78823L9.07999 2.78677Z"
                    fill="#9b9b9b"
                  ></Path>
                  <Path
                    d="M6.13931 7.99116C6.42039 7.51575 7.03364 7.35821 7.50905 7.63929L10.4511 9.37872C11.2914 9.87556 11.6897 10.0001 12.0001 10.0001C12.3105 10.0001 12.7088 9.87556 13.5492 9.37872L16.4912 7.63929C16.9666 7.35821 17.5798 7.51575 17.8609 7.99116C18.142 8.46657 17.9845 9.07982 17.5091 9.3609L14.567 11.1003C13.6915 11.618 12.8897 12.0001 12.0001 12.0001C11.1105 12.0001 10.3087 11.618 9.43319 11.1003L6.49117 9.3609C6.01576 9.07982 5.85823 8.46657 6.13931 7.99116Z"
                    fill="#9b9b9b"
                  ></Path>
                </Svg>
                <Text className="pt-1 text-gray-400">Email</Text>
              </View>
              <Text className="pt-1 text-gray-400 px-2">
                {currentUser.email}
              </Text>
            </View>
          </View>
          <Text className="mt-4 pb-1 px-1 text-gray-400">Utilities</Text>
          <View className="bg-white rounded-lg p-2">
            <TouchableOpacity
              className="flex-row justify-between bg-white px-1 py-4 rounded-lg border-b border-gray-100"
              onPress={() => setOnOpen(true)}
            >
              <View className="flex-row gap-1">
              <Headphone size="32" color="#6366f1" variant="Bulk"/>
                <Text className="pt-2 text-gray-400">Support</Text>
              </View>
              <View className="pt-1">
                <Svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#9b9b9b"}
                  fill={"none"}
                >
                  <Path
                    d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-between bg-white px-1 py-4 rounded-lg border-b border-gray-100"
              onPress={() => setTsandcs(true)}
            >
              <View className="flex-row gap-1">
              <DocumentText size="32" color="#6366f1" variant="Bulk"/>
                <Text className="pt-2 text-gray-400">Terms and Conditions</Text>
              </View>
              <View className="pt-1">
                <Svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#9b9b9b"}
                  fill={"none"}
                >
                  <Path
                    d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-between bg-white px-1 py-4 rounded-lg "
              onPress={log_out}
            >
              <View className="flex-row gap-1">
                <Svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  color="#9b9b9b"
                >
                  <Path
                    d="M13.0059 11C13.0059 11.5523 12.5581 12 12.0059 12C11.4536 12 11.0059 11.5523 11.0059 11L11.0059 5.74996L10.4116 5.74998C10.236 5.75011 10.0203 5.75026 9.84387 5.72819L9.84053 5.72777C9.71408 5.71201 9.13804 5.64017 8.86368 5.07457C8.58872 4.50775 8.89065 4.00761 8.95597 3.8994L9.29511 3.43092C9.58975 3.05509 9.99545 2.54063 10.3759 2.14962C10.5657 1.95451 10.783 1.75328 11.0139 1.59443C11.2191 1.45323 11.5693 1.24996 12 1.24996C12.4307 1.24996 12.7809 1.45323 12.9861 1.59443C13.217 1.75328 13.4343 1.95451 13.6241 2.14962C14.0046 2.54063 14.4102 3.05508 14.7049 3.43091L15.044 3.89941C15.1093 4.00761 15.4113 4.50775 15.1363 5.07457C14.862 5.64017 14.2859 5.71201 14.1595 5.72777L14.1561 5.72819C13.9797 5.75026 13.764 5.75011 13.5884 5.74998L13.0059 5.74996L13.0059 11Z"
                    fill="#6366f1"
                  ></Path>
                  <Path
                    opacity="0.4"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.87651 6.07358C7.23562 6.47335 7.20148 7.08748 6.80024 7.44529C5.18313 8.88735 4.2 10.7587 4.2 13.0357C4.2 17.3277 7.69218 20.8071 12 20.8071C16.3078 20.8071 19.8 17.3277 19.8 13.0357C19.8 10.7587 18.8169 8.88735 17.1998 7.44529C16.7985 7.08748 16.7644 6.47335 17.1235 6.07358C17.4826 5.67381 18.099 5.63979 18.5002 5.99759C20.4736 7.7573 21.75 10.134 21.75 13.0357C21.75 18.4008 17.3848 22.75 12 22.75C6.61522 22.75 2.25 18.4008 2.25 13.0357C2.25 10.134 3.52644 7.7573 5.49976 5.99759C5.901 5.63979 6.51739 5.67381 6.87651 6.07358Z"
                    fill="#9b9b9b"
                  ></Path>
                </Svg>
                <Text className="pt-2 text-gray-400">Sign out</Text>
              </View>
              <View className="pt-1">
                <Svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#9b9b9b"}
                  fill={"none"}
                >
                  <Path
                    d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
