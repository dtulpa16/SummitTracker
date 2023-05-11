import React, { useState } from "react";
import { View, Text } from "react-native";
import useFetch from "../hooks/useFetch";
export default function HikeDetailsScreen() {
//   const { data, isLoading, error } = useFetch(
//     "https://75c3-65-50-175-67.ngrok.io/api/summit/6459a85abba47b696adbdef9/fetch-notes"
//   );
  const { data, isLoading, error } = useFetch(
    "https://75c3-65-50-175-67.ngrok.io/api/summit/6459a85abba47b696adbdef9"
  );
  const formatDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  return data ? (
    <View className="flex-1 items-start bg-emerald-900 pl-4 pt-4 gap-2">
      <Text className="text-4xl font-bold text-white">{data.name}</Text>
      <Text className="text-xl font-bold text-white">{formatDate()}</Text>
      <Text className="text-lg font-bold text-white">
        Length: {data.length} miles
      </Text>
      <Text className="text-lg font-bold text-white">
        Altitude: {data.altitude} ft
      </Text>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}
