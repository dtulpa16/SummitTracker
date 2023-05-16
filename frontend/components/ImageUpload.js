import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import SelectedImagesModal from "./SelectedImagesModal";

export default function ImageUpload({ hikeId }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages([
        ...selectedImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <View className="">
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {selectedImages.length > 0 && (
        <SelectedImagesModal
          selectedImages={selectedImages}
          hikeId={hikeId}
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          setSelectedImages={setSelectedImages}
        />
      )}
    </View>
  );
}
