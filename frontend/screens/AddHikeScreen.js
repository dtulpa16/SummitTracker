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
} from "react-native";
export default function AddHikeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [altitude, setAltitude] = useState("");
  const [length, setLength] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const keyboardType =
    Platform.OS === "ios" ? "numbers-and-punctuation" : "decimal-pad";
  const handleSubmit = () => {
    let formData = {
      name: name,
      altitude: parseFloat(altitude),
      length: parseFloat(length),
      coordinates: `${lat}, ${long}`,
    };
    console.log(formData);
  };
  return (
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
            className="bg-white p-4 rounded-md"
          />
          <TextInput
            value={length}
            onChangeText={(value) => setLength(value)}
            placeholder="Length (miles)"
            placeholderTextColor="#60605e"
            keyboardType={keyboardType}
            className="bg-white p-4 rounded-md"
          />
          <TextInput
            value={lat}
            onChangeText={(value) => setLat(value)}
            placeholder="Latitude Coordinates"
            placeholderTextColor="#60605e"
            keyboardType={keyboardType}
            className="bg-white p-4 rounded-md"
          />
          <TextInput
            value={long}
            onChangeText={(value) => setLong(value)}
            placeholder="Longitude Coordinates"
            placeholderTextColor="#60605e"
            keyboardType={keyboardType}
            className="bg-white p-4 rounded-md"
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
  );
}
