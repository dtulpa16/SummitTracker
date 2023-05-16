import React, { useState, useEffect } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import SelectedImagesModal from "./SelectedImagesModal";

// This is the main component for handling image selection and upload.
export default function ImageUpload({ hikeId, refetch }) {
  // State variables for selected images and visibility of the modal
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function for handling image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If the image picker wasn't cancelled, add the selected images to the state
    if (!result.canceled) {
      setSelectedImages([
        ...selectedImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
      // Open the modal after images have been selected
      setIsModalVisible(true);
    }
  };

  // Requesting permissions for accessing the image library when the component mounts
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
      {/* Button to open the image picker */}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {/* If there are selected images, show the modal */}
      {selectedImages.length > 0 && (
        <SelectedImagesModal
          selectedImages={selectedImages}
          hikeId={hikeId}
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          setSelectedImages={setSelectedImages}
          refetch={refetch}
        />
      )}
    </View>
  );
}