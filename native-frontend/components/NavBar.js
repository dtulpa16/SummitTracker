import { View, Text, TouchableOpacity } from "react-native";
const NavBar = ({ navigation }) => {
  return (
    <View className="flex flex-row content-around justify-around">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Past Hikes")}>
        <Text>Past Hikes</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=>navigation.navigate("Home")}>Add Hike</TouchableOpacity> */}
    </View>
  );
};

export default NavBar;
