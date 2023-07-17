import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
  SafeAreaView,
} from "react-native";
import HomeIcon from "../assets/homeIcon.svg";
import MenuIcon from "../assets/menu.svg";
import BackIcon from "../assets/back.svg";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import Toast from "react-native-toast-message";
const NavBar = () => {
  const navigation = useNavigation();
  const screenOptions = [
    "Past Hikes",
    "Add Hike",
    "Map (Coming Soon!)",
    "Log In",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleSelect = (value) => {
    if (value == "Map (Coming Soon!)") {
      Toast.show({
        type: "success",
        text1: "You pressed Map!",
      });
    } else if (value == "Log In") {
      setIsLoginOpen(true);
    } else {
      navigation.navigate(value);
    }
    setIsOpen(false);
  };
  return (
    <SafeAreaView className="flex flex-row justify-around items-center w-full h-28">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon width={40} height={40} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={require("../assets/icon.png")} className=" h-20 w-20" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <MenuIcon width={40} height={40} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="flex-1 justify-start items-end">
            <View className=" bg-white rounded-bl-lg  p-4 mt-28 border-blue-950 border-2 border-t-0 border-r-0">
              {screenOptions.map((screen) => (
                <TouchableOpacity
                  key={screen}
                  onPress={() => handleSelect(screen)}
                >
                  <Text className="text-blue-950 py-2 text-lg font-semibold">
                    {screen}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
    </SafeAreaView>
  );
};

export default NavBar;
