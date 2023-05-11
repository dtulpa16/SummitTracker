import { View, Text, StatusBar, Button } from "react-native";

const PastHikesScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-emerald-900">
      <Text className=" text-white text-5xl">SummitTracker</Text>
      <Button title="Home!" onPress={() => navigation.navigate("Home")} />
      <StatusBar style="auto" />
    </View>
  );
};

export default PastHikesScreen;
