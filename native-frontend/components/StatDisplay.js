import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import ShoeIcon from "../assets/shoeIcon.svg";
import MountainIcon from "../assets/mountainIcon.svg";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
const StatDisplay = ({ data }) => {
  const [key, setKey] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );
  return (
    <View className="flex flex-col gap-3">
      {/* 50,000 feet altitude goal */}
      <View className="flex flex-row items-center justify-around">
        {data?.altitude ? (
          <>
            <AnimatedCircularProgress
              key={key}
              size={130}
              width={15}
              rotation={0}
              fill={Math.floor(data.altitude / 500)}
              tintColor="#ef5350"
              backgroundColor="#ffebee"
              children={() => <MountainIcon width="75%" height="75%" />}
            />
            <Text className="text-2xl font-bold text-white pb-3 text-center">
              {Math.round(data.altitude)} / 50,000{"\n"}feet climbed
            </Text>
          </>
        ) : null}
      </View>
      {/* 100 mile length goal */}
      <View className="flex flex-row items-center justify-around">
        {data?.length ? (
          <>
            <Text className="text-2xl font-bold text-white pb-3 text-right">
              {Math.round(data.length)} / 100{"\n"}miles hiked
            </Text>
            <AnimatedCircularProgress
              key={key}
              size={130}
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
  );
};

export default StatDisplay;
