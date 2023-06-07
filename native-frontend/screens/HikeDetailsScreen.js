import React, { useState } from "react";
import {
  Modal,
  Button,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useFetch from "../hooks/useFetch";
import HikeNotes from "../components/HikeNotes";
import { URL_HOST } from "../utils/urlHost";
import HikeImages from "../components/HikeImages";
import ImageUpload from "../components/ImageUpload";
import MapComponent from "../components/MapComponent";
import AddHikeNotes from "../components/AddHikeNotesModal";
import EditHikeDetailsModal from "../components/EditHikeDetailsModal";

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
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  // If data is still loading, display a loading message
  if (isLoading) return <Text>Loading...</Text>;

  // If data has loaded, display hike details
  return data ? (
    <ScrollView
      contentContainerStyle={{
        alignItems: "flex-start",
      }}
      className=" bg-blue-950 pl-4 pt-4 gap-2"
    >
      <Text className="text-4xl font-bold text-orange-50">{data?.name}</Text>
      <Text className="text-xl font-bold text-orange-50">{formatDate()}</Text>
      <Text className="text-lg font-bold text-orange-50">
        Length: {data?.length} miles
      </Text>
      <Text className="text-lg font-bold text-orange-50">
        Altitude: {data?.altitude} ft
      </Text>
      <Text className="text-lg font-bold text-orange-50">Notes</Text>

      {/* Display hike notes */}
      <View>
        <HikeNotes notes={data.notes} />
      </View>
      {/* Component for uploading new images */}
      <View className="mb-2 flex flex-row gap-2 flex-wrap">
        <View>
          <ImageUpload hikeId={data._id} refetch={refetch} />
        </View>
        <View>
          <AddHikeNotes hikeId={data._id} refetch={refetch} />
        </View>
        <View>
          <EditHikeDetailsModal data={data} refetch={refetch} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => console.log("Delete Pressed!")}
            className="flex justify-center p-4 bg-orange-100 rounded-lg"
          >
            <Text className=" text-blue-950 text-xl font-bold">
              Delete Hike
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <MapComponent
        latitude={data?.coordinates?.split(",")[0]}
        longitude={data?.coordinates?.split(",")[1]}
      />
      <Text className="text-lg font-bold text-white">Pics:</Text>

      {/* Display hike images */}
      <HikeImages hikeId={data._id} />
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
}
