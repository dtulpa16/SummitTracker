import { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import CompassIcon from "../assets/compass.svg";
import MapComponent from "./MapComponent";
export default function MapModal({ latitude, longitude, hikeName }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex justify-center p-3 bg-slate-100 rounded-full"
      >
        <CompassIcon height={35} width={35} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View className=" absolute  h-full w-full m-auto bg-[#00000080]" />
        </TouchableWithoutFeedback>
        <View className="flex bg-slate-50 rounded-lg items-center justify-center m-auto h-3/5 w-11/12">
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            hikeName={hikeName}
          />
        </View>
      </Modal>
    </View>
  );
}
