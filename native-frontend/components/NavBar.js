import { View, Text, TouchableOpacity } from "react-native";
import HomeIcon from "../assets/homeIcon.svg";

const NavBar = ({ navigation }) => {
  return (
    <View className="flex flex-row justify-around items-center w-full">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <HomeIcon width={38} height={38} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Past Hikes")}>
        <Text className="text-blue-950 text-xl font-bold">Past Hikes</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=>navigation.navigate("Home")}>Add Hike</TouchableOpacity> */}
    </View>
  );
};

export default NavBar;
