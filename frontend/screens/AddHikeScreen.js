import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { URL_HOST } from "../utils/urlHost";
export default function AddHikeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [altitude, setAltitude] = useState("");
  const [length, setLength] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const keyboardType =
    Platform.OS === "ios" ? "numbers-and-punctuation" : "decimal-pad";
  const handleSubmit = async () => {
    try {
      let formData = {
        name: name,
        altitude: parseFloat(altitude),
        length: parseFloat(length),
        coordinates: `${lat}, ${long}`,
      };
      let response = await axios.post(`${URL_HOST}/api/summit/`, formData);
      navigation.navigate("Hike Details", {
        hikeId: response?.data?._id,
        name: response?.data?.name,
      });
    } catch (error) {
      console.log("Error in postHike: ", error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className=" bg-emerald-900 flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 items-center justify-center bg-emerald-900 gap-5">
          <Text className=" text-white text-5xl">Add a New Hike</Text>
          <View className="gap-3 w-3/5">
            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              placeholder="Hike Name"
              placeholderTextColor="#60605e"
              className="bg-white p-4 rounded-md text-emerald-900"
            />
            <TextInput
              value={altitude}
              onChangeText={(value) => setAltitude(value)}
              placeholder="Altitude"
              placeholderTextColor="#60605e"
              keyboardType={keyboardType}
              className="bg-white p-4 rounded-md text-emerald-900"
            />
            <TextInput
              value={length}
              onChangeText={(value) => setLength(value)}
              placeholder="Length (miles)"
              placeholderTextColor="#60605e"
              keyboardType={keyboardType}
              className="bg-white p-4 rounded-md text-emerald-900"
            />
            <TextInput
              value={lat}
              onChangeText={(value) => setLat(value)}
              placeholder="Latitude Coordinates"
              placeholderTextColor="#60605e"
              keyboardType={keyboardType}
              className="bg-white p-4 rounded-md text-emerald-900"
            />
            <TextInput
              value={long}
              onChangeText={(value) => setLong(value)}
              placeholder="Longitude Coordinates"
              placeholderTextColor="#60605e"
              keyboardType={keyboardType}
              className="bg-white p-4 rounded-md text-emerald-900"
            />
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex justify-center p-4 bg-orange-400 rounded-lg"
            >
              <Text className=" text-white text-xl">Submit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex justify-center p-4 bg-orange-400 rounded-lg"
          >
            <Text className=" text-white text-xl">Return Home</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
