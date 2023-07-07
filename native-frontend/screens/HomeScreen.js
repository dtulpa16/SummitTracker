import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ActivityIndicator, ScrollView } from "react-native";
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
      <ScrollView>
        <View className="flex items-center gap-3 mt-8">
          <Text className="text-white text-6xl">SummitTracker</Text>
          <Image
            source={require("../assets/icon.png")}
            className=" h-52 w-52"
          />
        </View>
        <Text className="text-white text-4xl text-center">Your Stats</Text>
        {!isLoading ? (
          <StatDisplay data={data}></StatDisplay>
        ) : (
          <View className="flex flex-1 items-center justify-center m-auto">
            <ActivityIndicator size="large" color="#fdbb74" />
          </View>
        )}

        <StatusBar style="auto" />
      </ScrollView>
      <View className="pt-6 pb-8">
        <CustomButton
          onPress={() => navigation.navigate("Add Hike")}
          text="Let's Hike!"
        />
      </View>
    </View>
  );
}
