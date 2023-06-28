import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import useFetch from "../hooks/useFetch";
import { URL_HOST } from "../utils/urlHost";
import StatDisplay from "../components/StatDisplay";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import ShoeIcon from "../assets/shoeIcon.svg";
import MountainIcon from "../assets/mountainIcon.svg";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "../components/elements/CustomButton";
export default function HomeScreen({ navigation }) {
  const [key, setKey] = useState(0);
  const { data, isLoading, error } = useFetch(
    `${URL_HOST}/api/summit/total/altitude`
  );
  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );
  return (
    <View className="flex-1 items-center bg-blue-950 justify-around">
      <View className="flex items-center gap-3">
        <Image source={require("../assets/icon.png")} className=" h-36 w-36" />
        <Text className="text-orange-50 text-5xl">SummitTracker</Text>
      </View>
      <View className="flex flex-col gap-5 items-center">
        {/* 50,000 feet altitude goal */}
        <View className="flex flex-col items-center">
          {data?.altitude ? (
            <>
              <Text className="text-2xl font-bold text-white pb-3">
                {Math.round(data.altitude)} / 50,000 ft. Elevation
              </Text>
              <AnimatedCircularProgress
                key={key}
                size={150}
                width={15}
                rotation={0}
                fill={Math.floor(data.altitude / 500)}
                tintColor="#ef5350"
                backgroundColor="#ffebee"
                children={() => <MountainIcon width="75%" height="75%" />}
              />
            </>
          ) : null}
        </View>
        {/* 100 mile length goal */}
        <View className="flex flex-col items-center">
          {data?.length ? (
            <>
              <Text className="text-2xl font-bold text-white pb-3">
                {Math.round(data.length)} / 100 Miles
              </Text>
              <AnimatedCircularProgress
                key={key}
                size={150}
                width={15}
                rotation={0}
                fill={Math.floor(data.length)}
                tintColor="#ffa726"
                backgroundColor="#fff3e0"
                children={() => <ShoeIcon width="75%" height="75%" />}
              />
            </>
          ) : null}
        </View>
      </View>
      <View className="flex flex-row pb-5 justify-around">
        <CustomButton
          onPress={() => navigation.navigate("Past Hikes")}
          text="Past Hikes"
        />
        <CustomButton
          onPress={() => navigation.navigate("Add Hike")}
          text="Add a Hike"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
