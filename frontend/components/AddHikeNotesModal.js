import { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";

export default function AddHikeNotes({ hikeId, refetch }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex justify-center p-4 bg-orange-400 rounded-lg"
      >
        <Text className=" text-white text-xl">Add a Note</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View className="flex-1 flex-col items-center justify-center h-1/3 w-full m-auto bg-[#00000080]">
          <View className="flex p-8 bg-white rounded-lg">
            <Text>Form coming soon!</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="flex justify-center p-4 bg-orange-400 rounded-lg"
            >
              <Text className=" text-white text-xl">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
