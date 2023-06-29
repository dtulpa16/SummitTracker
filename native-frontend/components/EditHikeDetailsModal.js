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
import { SvgUri } from "react-native-svg";
import EditIcon from "../assets/editIcon.svg";
import CustomButton from "./elements/CustomButton";

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
        className="flex justify-center p-3 bg-slate-100 rounded-full"
      >
        <EditIcon width={35} height={35} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View className=" absolute  h-full w-full m-auto bg-[#00000080]" />
        </TouchableWithoutFeedback>
        <View className="flex p-6 gap-4 bg-slate-50 rounded-lg items-center justify-center m-auto">
          <Text className=" text-3xl text-blue-950 font-bold">
            Edit Hike Details
          </Text>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder={name}
            placeholderTextColor="#60605e"
            className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200] border-2 border-blue-950"
          />
          <TextInput
            value={altitude}
            onChangeText={(value) => setAltitude(value)}
            placeholder={altitude}
            placeholderTextColor="#60605e"
            keyboardType={keyboardType}
            className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200] border-2 border-blue-950"
          />
          <TextInput
            value={length}
            onChangeText={(value) => setLength(value)}
            placeholder={length}
            placeholderTextColor="#60605e"
            keyboardType={keyboardType}
            className="bg-white p-4 rounded-md text-blue-950 min-w-[200] max-w-[200] border-2 border-blue-950"
          />
          <View className="flex flex-row justify-between">
            <CustomButton
              onPress={() => setIsModalVisible(false)}
              text="Cancel"
              customTextStyle="text-blue-950 text-lg font-bold"
            />
            <CustomButton
              onPress={handleSubmit}
              text="Submit"
              customTextStyle="text-blue-950 text-lg font-bold"
              customButtonStyle="flex justify-center p-4 bg-orange-200 rounded-xl border-2 border-blue-950 ml-2"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
