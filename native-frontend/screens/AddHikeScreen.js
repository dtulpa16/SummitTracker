import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { googleMapsKey } from "../utils/keys";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
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
  const keyboardType =
    Platform.OS === "ios" ? "numbers-and-punctuation" : "decimal-pad";
  const handleSubmit = async () => {
    try {
      let { lat, long } = await getHikeCoords(name);
      debugger;
      console.log();
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
      className=" bg-blue-950 flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 items-center justify-center bg-blue-950 gap-5">
          <Text className=" text-white text-5xl">Add a New Hike</Text>
          <View className="gap-3 w-3/5">
            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              placeholder="Hike Name"
              placeholderTextColor="#60605e"
              keyboardType={keyboardType}
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

export const getHikeCoords = async (hikeName) => {
  debugger;
  try {
    let response = await axios.get(
      `https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=${hikeName}&language=en`,
      {
        headers: {
          "X-RapidAPI-Key": googleMapsKey,
          "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
        },
      }
    );
    return {
      lat:
        JSON.stringify(response.data.results[0].geometry.location?.lat) || null,
      long:
        JSON.stringify(response.data.results[0].geometry.location?.lng) || null,
    };
  } catch (er) {
    return {
      lat: null,
      long: null,
    };
  }
};
