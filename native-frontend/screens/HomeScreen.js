import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import useFetch from "../hooks/useFetch";
import { URL_HOST } from "../utils/urlHost";
import StatDisplay from "../components/StatDisplay";
import CustomButton from "../components/elements/CustomButton";
export default function HomeScreen({ navigation }) {
  const { data, isLoading, error } = useFetch(
    `${URL_HOST}/api/summit/total/altitude`
  );

  return (
    <View className="flex-1 items-center bg-blue-950 justify-around">
      <View className="flex items-center gap-3">
        <Image source={require("../assets/icon.png")} className=" h-36 w-36" />
        <Text className="text-white text-5xl">SummitTracker</Text>
      </View>
      {!isLoading ? (
        <StatDisplay data={data}></StatDisplay>
      ) : (
        <View className="flex flex-1 items-center justify-center m-auto">
          <ActivityIndicator size="large" color="#fdbb74" />
        </View>
      )}
      <CustomButton
        onPress={() => navigation.navigate("Add Hike")}
        text="Let's Hike!"
      />
      <StatusBar style="auto" />
    </View>
  );
}
