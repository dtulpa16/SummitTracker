import { useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import { googleMapsKey } from "../utils/keys";
import axios from "axios";
import { URL_HOST } from "../utils/urlHost";
import { getHikeCoords } from "../screens/AddHikeScreen";
export default function EditHikeDetailsModal({ data, refetch }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(data.name);
  const [altitude, setAltitude] = useState(data.altitude.toString());
  const [length, setLength] = useState(data.length.toString());
  const [coordinates, setCoordinates] = useState(data.coordinates);
  const keyboardType =
    Platform.OS === "ios" ? "numbers-and-punctuation" : "decimal-pad";
  const handleSubmit = async () => {
    try {
      let formData = {
        name: name,
        altitude: parseFloat(altitude),
        length: parseFloat(length),
      };
      if (name === data.name) {
        formData.coordinates = coordinates;
      } else {
        let { lat, long } = await getHikeCoords(name);
        formData.coordinates = `${lat}, ${long}`;
      }
      console.log("form data:", formData);
      // let response = await axios.put(
      //   `${URL_HOST}/api/summit/`,
      //   formData
      // );
      // console.log("PUT hike response: ", response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error PUTting Hike: ", error);
    }
    refetch();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex justify-center p-4 bg-orange-100 rounded-lg"
      >
        <Text className="text-blue-950 font-bold text-xl">Edit Details</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View className=" absolute  h-full w-full m-auto bg-[#00000080]" />
        </TouchableWithoutFeedback>
        <View className="flex p-6 gap-4 bg-slate-100 rounded-lg items-center justify-center m-auto">
          <Text className=" text-2xl text-blue-950">Edit Hike Details</Text>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder={name}
            placeholderTextColor="#60605e"
            className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200]"
          />
          <TextInput
            value={altitude}
            onChangeText={(value) => setAltitude(value)}
            placeholder={altitude}
            placeholderTextColor="#60605e"
            keyboardType={keyboardType}
            className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200]"
          />
          <TextInput
            value={length}
            onChangeText={(value) => setLength(value)}
            placeholder={length}
            placeholderTextColor="#60605e"
            keyboardType={keyboardType}
            className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200]"
          />
          <View className="flex flex-row gap-3">
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="flex justify-center p-4 bg-orange-100 rounded-lg"
            >
              <Text className="text-lg text-blue-950 font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="flex justify-center p-4 bg-orange-100 rounded-lg"
            >
              <Text className="text-blue-950 text-lg font-bold">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
