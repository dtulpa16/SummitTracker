import { useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./elements/CustomButton";
const LoginModal = ({ isLoginOpen, setIsLoginOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
    } catch (e) {
      console.log("Error storing login credentials: ", e);
    }
    setUsername("");
    setPassword("");
    setIsLoginOpen(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isLoginOpen}>
      <TouchableWithoutFeedback onPress={() => setIsLoginOpen(false)}>
        <View className=" absolute  h-full w-full m-auto bg-[#00000080]" />
      </TouchableWithoutFeedback>
      <View className="flex p-6 gap-4 bg-slate-50 rounded-lg items-center justify-center m-auto">
        <Text className=" text-3xl text-blue-950 font-bold">Log In</Text>
        <TextInput
          value={username}
          onChangeText={(value) => setUsername(value)}
          placeholder={"username"}
          placeholderTextColor="#60605e"
          className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200] border-2 border-blue-950"
        />
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder={"password"}
          placeholderTextColor="#60605e"
          className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200] border-2 border-blue-950"
        />

        <View className="flex flex-row justify-between">
          <CustomButton
            onPress={() => setIsLoginOpen(false)}
            text="Cancel"
            customTextStyle="text-blue-950 text-lg font-bold"
          />
          <CustomButton
            onPress={handleSubmit}
            text="Submit"
            customTextStyle="text-blue-950 text-lg font-bold"
            customButtonStyle="flex justify-center p-4 bg-orange-200 rounded-xl border-2 border-blue-950 ml-2"
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;
