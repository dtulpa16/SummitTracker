import React, { useState } from "react";
import {
  Modal,
  Button,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import MountainIcon from "../assets/mountainIcon.svg";
import ShoeIcon from "../assets/shoeIcon.svg";
import { verifyLogin } from "../utils/helpers";
import axios from "axios";
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

  const createDeleteAlert = async () => {
    try {
      const userValidated = await verifyLogin();
      if (userValidated) {
        Alert.alert(
          `Are you sure you want to delete ${data.name}?`,
          `This action is irreversible!`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              onPress: () => handleDelete(),
            },
          ]
        );
      } else {
        console.log("Invalid login credentials");
      }
    } catch (e) {
      console.log("Error in createDeleteAlert: ", e);
    }
  };

  const handleDelete = async () => {
    console.log("Hello from HandleDelete!");
    try {
      let response = await axios.delete(`${URL_HOST}/api/summit/${data._id}`);
      refetch();
      navigation.navigate("Past Hikes");
    } catch (e) {
      console.log("Error in handleDelete: ", e);
    }
  };

  // If data has loaded, display hike details
  return data && !isLoading ? (
    <View className="flex-1 bg-blue-950 pb-12">
      <ScrollView className=" pl-4 pt-4 gap-4">
        <Text className="text-4xl font-bold text-white self-center">
          {data?.name}
        </Text>
        <Text className="text-2xl  text-white self-center">{formatDate()}</Text>

        <View className="flex flex-row justify-around content-center">
          <View className="flex items-center">
            <ShoeIcon height={60} width={60} />
            <Text className="text-2xl font-bold text-white text-center">
              {data?.length} miles{"\n"}hiked
            </Text>
          </View>
          <View className="flex items-center">
            <MountainIcon height={60} width={60} />

            <Text className="text-2xl font-bold text-white text-center">
              {data?.altitude} feet{"\n"}climbed
            </Text>
          </View>
        </View>
        <Text className="text-3xl font-bold text-white">Notes:</Text>

        {/* Display hike notes */}
        <View>
          <HikeNotes notes={data.notes} />
        </View>
        <Text className="text-3xl font-bold text-white pb-4">Photos:</Text>

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
            onPress={createDeleteAlert}
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
