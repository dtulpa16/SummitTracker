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
import AddNoteIcon from "../assets/addNoteIcon.svg";
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
        className="flex justify-center p-3 bg-orange-100 rounded-full"
      >
        <AddNoteIcon height={35} width={35} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View className=" absolute  h-full w-full m-auto bg-[#00000080]" />
        </TouchableWithoutFeedback>
        <View className="flex p-6 gap-4 bg-orange-100 rounded-lg items-center justify-center m-auto">
          <Text className=" text-3xl text-blue-950 font-bold">Add a Note</Text>
          <TextInput
            value={text}
            onChangeText={(value) => setText(value)}
            placeholderTextColor="#60605e"
            placeholder="I thought this hike was..."
            className="bg-white p-4 rounded-md text-blue-950 min-w-[200] min-h-[80px] max-w-[200]"
            multiline
            numberOfLines={4}
          />
          <View className="flex flex-row gap-3">
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="flex justify-center p-4 bg-orange-100 rounded-lg border-2 border-blue-950"
            >
              <Text className="text-blue-950 text-xl font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="flex justify-center p-4 bg-orange-100 rounded-lg border-2 border-blue-950"
            >
              <Text className="text-blue-950 text-xl font-bold">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
