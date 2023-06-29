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
import MapModal from "../components/MapModal";
import DeleteIcon from "../assets/trashIcon.svg";
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

  // If data has loaded, display hike details
  return data && !isLoading ? (
    <View className="flex-1 bg-blue-950 pb-12">
      <ScrollView className=" pl-4 pt-4 gap-2">
        <Text className="text-4xl font-bold text-orange-50 self-center">
          {data?.name}
        </Text>
        <Text className="text-xl  text-orange-50 self-center">
          {formatDate()}
        </Text>
        <Text className="text-lg font-bold text-orange-50">
          Length: {data?.length} miles
        </Text>
        <Text className="text-lg font-bold text-orange-50">
          Altitude: {data?.altitude} ft
        </Text>
        <Text className="text-lg font-bold text-orange-50">Notes:</Text>

        {/* Display hike notes */}
        <View>
          <HikeNotes notes={data.notes} />
        </View>
        <Text className="text-2xl font-bold text-orange-50 pb-2">Photos:</Text>

        {/* Display hike images */}
        <HikeImages hikeId={data._id} />
      </ScrollView>
      {/* Buttons for adding notes, photos, editing, viewing map, and deleting */}
      <View className="mb-2 flex flex-row gap-4 m-auto justify-center items-center">
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
          <MapModal
            latitude={data?.coordinates?.split(",")[0]}
            longitude={data?.coordinates?.split(",")[1]}
            hikeName={data?.name}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => console.log("Delete Pressed!")}
            className="flex justify-center p-3 bg-slate-100 rounded-full"
          >
            <DeleteIcon width={35} height={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}
