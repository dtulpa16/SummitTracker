import { View, Text, StatusBar, Button, TouchableOpacity } from "react-native";
import { URL_HOST } from "../utils/urlHost";
import useFetch from "../hooks/useFetch";
const PastHikesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useFetch(`${URL_HOST}/api/summit/`);
  return !isLoading && data ? (
    <View className="flex-1 items-center justify-center bg-blue-950">
      <Text className=" text-orange-50 text-5xl pb-5">Past Hikes</Text>
      <View className="flex flex-col gap-6 text-orange-50">
        {data.length > 0 ? (
          data.map((hike, index) => (
            <TouchableOpacity
              className="flex border p-4 rounded-lg drop-shadow-md border-amber-50 min-h-[150] min-w-[200]"
              key={index}
              onPress={() =>
                navigation.navigate("Hike Details", {
                  hikeId: hike?._id,
                  name: hike?.name,
                })
              }
            >
              <Text className=" text-3xl text-orange-50">{hike?.name}</Text>
              <Text className=" text-xl text-orange-50">
                {hike?.altitude} ft. elevation
              </Text>
              <Text className=" text-xl text-orange-50">
                {hike?.length} miles
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No recorded hikes!</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="flex justify-center p-4 bg-orange-100 rounded-lg mt-5"
      >
        <Text className="text-blue-950 text-xl font-bold">Return Home</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PastHikesScreen;
