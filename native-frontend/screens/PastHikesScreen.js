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
import PastHikeList from "../components/PastHikeList";
import AllHikesMap from "../components/AllHikesMap";
const PastHikesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useFetch(`${URL_HOST}/api/summit/`);
  const [currentView, setCurrentView] = useState("list");
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blue-950">
      {!isLoading ? (
        <>
          <Text className=" text-white text-5xl py-4">Past Hikes</Text>
          <View className="flex flex-row justify-around">
            <CustomButton
              onPress={() => setCurrentView("list")}
              text="List View"
              customTextStyle="text-blue-950 text-lg font-bold"
              customButtonStyle="flex justify-center p-4 bg-orange-200 rounded-xl border-2 border-blue-950 ml-2"
            />
            <CustomButton
              onPress={() => setCurrentView("map")}
              text="Map View"
              customTextStyle="text-blue-950 text-lg font-bold"
              customButtonStyle="flex justify-center p-4 bg-orange-200 rounded-xl border-2 border-blue-950 ml-2"
            />
          </View>
          <View className="flex-1">
            {currentView === "list" ? (
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                <PastHikeList data={data} navigation={navigation} />
              </ScrollView>
            ) : (
              <AllHikesMap data={data} navigation={navigation} />
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#fdbb74" />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default PastHikesScreen;
