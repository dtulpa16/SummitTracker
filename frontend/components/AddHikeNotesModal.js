import { useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import axios from "axios";
import { URL_HOST } from "../utils/urlHost";
export default function AddHikeNotes({ hikeId, refetch }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      let formData = {
        text: text,
      };
      let response = await axios.post(
        `${URL_HOST}/api/summit/${hikeId}/note`,
        formData
      );
      console.log("POST note response: ", response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error Posting Note: ", error);
    }
    refetch();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex justify-center p-4 bg-orange-400 rounded-lg"
      >
        <Text className=" text-white text-xl">Add a Note</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View className=" absolute  h-full w-full m-auto bg-[#00000080]" />
        </TouchableWithoutFeedback>
        <View className="flex p-6 gap-4 bg-slate-100 rounded-lg items-center justify-center m-auto">
          <Text className=" text-2xl text-emerald-900">Add a Note</Text>
          <TextInput
            value={text}
            onChangeText={(value) => setText(value)}
            placeholderTextColor="black"
            placeholder="I thought this hike was..."
            className="bg-white p-4 rounded-md text-emerald-900 min-w-[200] min-h-[80px] max-w-[200]"
            multiline
            numberOfLines={4}
          />
          <View className="flex flex-row gap-3">
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="flex justify-center p-3 bg-orange-400 rounded-lg"
            >
              <Text className=" text-white text-lg">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="flex justify-center p-3 bg-orange-400 rounded-lg"
            >
              <Text className=" text-white text-lg">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
