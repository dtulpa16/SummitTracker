import React, { useState } from "react";
import { View, Text } from "react-native";
import useFetch from "../hooks/useFetch";
import HikeNotes from "../components/HikeNotes";
import { URL_HOST } from "../utils/urlHost";
import HikeImages from "../components/HikeImages";
import ImageUpload from "../components/ImageUpload";
import MapComponent from "../components/MapComponent";

// HikeDetailsScreen is the main component for displaying details of a hike.
export default function HikeDetailsScreen({ route, navigation }) {
  // Destructure hikeId from route parameters
  const { hikeId } = route.params;

  // Fetch hike data from the server using custom useFetch hook.
  const { data, isLoading, error, refetch } = useFetch(
    `${URL_HOST}/api/summit/${hikeId}`
  );

  // Function to format the hike's date in a readable format
  const formatDate = () => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  // If data is still loading, display a loading message
  if (isLoading) return <Text>Loading...</Text>;

  // If data has loaded, display hike details
  return (
    <View className="flex-1 items-start bg-emerald-900 pl-4 pt-4 gap-2">
      <Text className="text-4xl font-bold text-white">{data?.name}</Text>
      <Text className="text-xl font-bold text-white">{formatDate()}</Text>
      <Text className="text-lg font-bold text-white">
        Length: {data?.length} miles
      </Text>
      <Text className="text-lg font-bold text-white">
        Altitude: {data?.altitude} ft
      </Text>
      <Text className="text-lg font-bold text-white">Notes</Text>

      {/* Display hike notes */}
      <View>
        <HikeNotes notes={data.notes} />
      </View>

      <Text className="text-lg font-bold text-white">Pics:</Text>

      {/* Display hike images */}
      <HikeImages hikeId={data._id} />

      {/* Component for uploading new images */}
      <ImageUpload hikeId={data._id} refetch={refetch}/>
      <MapComponent latitude={data?.coordinates?.split(",")[0]} longitude={data?.coordinates?.split(",")[1]} />
    </View>
  );
}
