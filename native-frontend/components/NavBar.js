import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import HomeIcon from "../assets/homeIcon.svg";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
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
    <View className="flex flex-row justify-around items-center w-full">
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
          <View className="flex-1 justify-start items-center">
            <View className=" bg-white rounded-b-lg  p-4 mt-24 w-full">
              {screenOptions.map((screen) => (
                <TouchableOpacity
                  key={screen}
                  onPress={() => handleSelect(screen)}
                >
                  <Text className=" py-1 text-lg">{screen}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Past Hikes")}>
        <Text className="text-blue-950 text-xl font-bold">Past Hikes</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={()=>navigation.navigate("Home")}>Add Hike</TouchableOpacity> */}
    </View>
  );
};

export default NavBar;
