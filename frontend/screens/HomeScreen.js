import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TouchableOpacity } from "react-native";
export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-emerald-900 gap-5">
      <Text className=" text-white text-5xl">SummitTracker!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Past Hikes")}
        className="flex justify-center p-4 bg-orange-400 rounded-lg"
      >
        <Text className=" text-white text-xl">Past Hikes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Add Hike")}
        className="flex justify-center p-4 bg-orange-400 rounded-lg"
      >
        <Text className=" text-white text-xl">Add a Hike</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
