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
      <View className="flex flex-col gap-3">
        {/* 50,000 feet altitude goal */}
        <View>
          {data?.altitude ? (
            <>
              <Text className="text-2xl font-bold text-white">
                {data.altitude} / 50,000 Elevation
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
        <View>
          {data?.length ? (
            <>
              <Text className="text-2xl font-bold text-white p-1">
                {data.length} / 100 Miles
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
      <View className="flex flex-row gap-10 pb-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("Past Hikes")}
          className="flex justify-center p-4 bg-orange-100 rounded-lg"
        >
          <Text className="text-blue-950 text-2xl font-bold">Past Hikes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add Hike")}
          className="flex justify-center p-4 bg-orange-100 rounded-lg"
        >
          <Text className="text-blue-950 text-2xl font-bold">Add a Hike</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
