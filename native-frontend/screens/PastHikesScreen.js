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
import CustomButton from "../components/elements/CustomButton";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
const PastHikesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useFetch(`${URL_HOST}/api/summit/`);
  const [currentView, setCurrentView] = useState("list");
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blue-950">
      {!isLoading ? (
        <>
          <Text className=" text-white text-5xl py-4">Past Hikes</Text>
          <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
            <View className="flex flex-row justify-around">
              <CustomButton
                onPress={() => setCurrentView("list")}
                text="List"
                customTextStyle="text-blue-950 text-lg font-bold"
                customButtonStyle="flex justify-center p-4 bg-orange-200 rounded-xl border-2 border-blue-950 ml-2"
              />
              <CustomButton
                onPress={() => setCurrentView("map")}
                text="Submit"
                customTextStyle="text-blue-950 text-lg font-bold"
                customButtonStyle="flex justify-center p-4 bg-orange-200 rounded-xl border-2 border-blue-950 ml-2"
              />
            </View>
            <View className="flex flex-col gap-8">
              {data?.length > 0 ? (
                data.map((hike, index) => (
                  <TouchableOpacity
                    className="flex p-4 rounded-lg drop-shadow-md bg-white min-h-[150] min-w-[200] gap-2"
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
                <View>
                  <Text className="text-white text-2xl font-bold">
                    No recorded hikes!
                  </Text>
                  <CustomButton
                    onPress={() => navigation.navigate("Add Hike")}
                    text="Add New Hike"
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator size="large" color="#fdbb74" />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default PastHikesScreen;
