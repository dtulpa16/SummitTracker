import React, { useState } from "react";
import { View, Text } from "react-native";
import useFetch from "../hooks/useFetch";
import HikeNotes from "../components/HikeNotes";
import { URL_HOST } from "../utils/urlHost";

export default function HikeDetailsScreen({ route, navigation }) {
  //const [hikeId, setHikeId] = useState("6459a85abba47b696adbdef9");
  const { hikeId } = route.params;
  const { data, isLoading, error } = useFetch(
    `${URL_HOST}/api/summit/${hikeId}`
  );
  const formatDate = () => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  return !isLoading && data.length > 0 ? (
    <View className="flex-1 items-start bg-emerald-900 pl-4 pt-4 gap-2">
      <Text className="text-4xl font-bold text-white">{data.name}</Text>
      <Text className="text-xl font-bold text-white">{formatDate()}</Text>
      <Text className="text-lg font-bold text-white">
        Length: {data.length} miles
      </Text>
      <Text className="text-lg font-bold text-white">
        Altitude: {data.altitude} ft
      </Text>
      <Text className="text-lg font-bold text-white">Notes</Text>
      <View>
        <HikeNotes hikeId={hikeId} />
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}
