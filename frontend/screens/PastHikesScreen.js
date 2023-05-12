import { View, Text, StatusBar, Button } from "react-native";
import { URL_HOST } from "../utils/urlHost";
import useFetch from "../hooks/useFetch";
const PastHikesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useFetch(`${URL_HOST}/api/summit/`);
  return !isLoading ? (
    <View className="flex-1 items-center justify-center bg-emerald-900">
      <Text className=" text-white text-5xl">SummitTracker</Text>
      <View className="flex flex-col gap-5">
        {data.map((hike) => (
          <View className="flex border p-4 rounded-lg drop-shadow-md">
            <Text className=" text-2xl text-white">{hike.name}</Text>
            <Text className=" text-lg text-white">{hike.altitude}</Text>
            <Text className=" text-xl text-white">{hike.length} miles</Text>
          </View>
        ))}
      </View>
      <Button title="Home!" onPress={() => navigation.navigate("Home")} />
      <StatusBar style="auto" />
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PastHikesScreen;
