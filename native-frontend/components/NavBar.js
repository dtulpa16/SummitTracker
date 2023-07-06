import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
} from "react-native";
import HomeIcon from "../assets/homeIcon.svg";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
const NavBar = () => {
  const navigation = useNavigation();
  const screenOptions = ["Past Hikes", "Add Hike", "Map (Coming Soon!)"];
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (value) => {
    console.log(`Pressed ${value}`);
    if (value != "Map (Coming Soon!)") {
      navigation.navigate(value);
    }
    setIsOpen(false);
  };
  return (
    <SafeAreaView className="flex flex-row justify-around items-center w-full h-24">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <HomeIcon width={38} height={38} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <HomeIcon width={40} height={40} />
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
            <View className=" bg-white rounded-bl-lg  p-4 mt-24 border-blue-950 border-2 border-t-0 border-r-0">
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
    </SafeAreaView>
  );
};

export default NavBar;
