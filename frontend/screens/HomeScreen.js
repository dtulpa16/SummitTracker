import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-emerald-900">
      <Text className=" text-white text-5xl">SummitTracker!</Text>
      {/* StatusBar displays base phone info*/}
      <Button
        title="Past Hikes"
        onPress={() => navigation.navigate("Past Hikes")}
      />
      <StatusBar style="auto" />
    </View>
  );
}
