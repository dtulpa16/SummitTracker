import {
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { URL_HOST } from "../utils/urlHost";
import useFetch from "../hooks/useFetch";
const PastHikesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useFetch(`${URL_HOST}/api/summit/`);
  return !isLoading && data ? (
    <SafeAreaView className="flex-1 items-center justify-center bg-blue-950">
      <Text className=" text-orange-50 text-5xl pb-4">Past Hikes</Text>
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        <View className="flex flex-col gap-8 text-orange-50">
          {data.length > 0 ? (
            data.map((hike, index) => (
              <TouchableOpacity
                className="flex p-4 rounded-lg drop-shadow-md bg-orange-100 min-h-[150] min-w-[200] gap-2"
                key={index}
                onPress={() =>
                  navigation.navigate("Hike Details", {
                    hikeId: hike?._id,
                    name: hike?.name,
                  })
                }
              >
                <Text className=" text-3xl text-blue-950 font-bold">
                  {hike?.name}
                </Text>
                <Text className=" text-xl font-bold text-blue-950">
                  {hike?.altitude} ft. elevation
                </Text>
                <Text className=" text-xl font-bold text-blue-950">
                  {hike?.length} miles
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No recorded hikes!</Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="flex justify-center p-4 bg-orange-200 rounded-xl mt-5"
      >
        <Text className="text-blue-950 text-xl font-bold">Return Home</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  ) : (
    <Text>Loading...</Text>
  );
};

export default PastHikesScreen;
