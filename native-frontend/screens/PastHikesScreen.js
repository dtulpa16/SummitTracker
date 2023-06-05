import { View, Text, StatusBar, Button, TouchableOpacity } from "react-native";
import { URL_HOST } from "../utils/urlHost";
import useFetch from "../hooks/useFetch";
const PastHikesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useFetch(`${URL_HOST}/api/summit/`);
  return !isLoading && data ? (
    <View className="flex-1 items-center justify-center bg-blue-950">
      <Text className=" text-orange-50 text-5xl">Past Hikes</Text>
      <View className="flex flex-col gap-5 text-orange-50">
        {data.length > 0 ? (
          data.map((hike, index) => (
            <View
              className="flex border p-4 rounded-lg drop-shadow-md border-amber-50"
              key={index}
            >
              <Text className=" text-2xl text-orange-50">{hike?.name}</Text>
              <Text className=" text-lg text-orange-50">{hike?.altitude}</Text>
              <Text className=" text-xl text-orange-50">
                {hike?.length} miles
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Hike Details", {
                    hikeId: hike?._id,
                    name: hike?.name,
                  })
                }
                className="flex justify-center p-4 bg-orange-100 rounded-lg drop-shadow-md m-auto"
              >
                <Text className="text-blue-950 text-md">Details</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No recorded hikes!</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="flex justify-center p-4 bg-orange-100 rounded-lg"
      >
        <Text className="text-blue-950 text-xl">Return Home</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PastHikesScreen;
