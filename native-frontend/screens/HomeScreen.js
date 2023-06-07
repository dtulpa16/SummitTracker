import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center bg-blue-950 justify-around">
      <View className="flex items-center gap-5">
        <Image source={require("../assets/icon.png")} className=" h-36 w-36" />
        <Text className="text-orange-50 text-5xl">SummitTracker</Text>
      </View>
      <View className="flex flex-row gap-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("Past Hikes")}
          className="flex justify-center p-4 bg-orange-100 rounded-lg"
        >
          <Text className="text-blue-950 text-2xl font-bold">Past Hikes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Hike")}
          className="flex justify-center p-4 bg-orange-100 rounded-lg"
        >
          <Text className="text-blue-950 text-2xl font-bold">Add a Hike</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
