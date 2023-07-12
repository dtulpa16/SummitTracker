import React, { useState, useEffect } from "react";
import { Button, Image, View, Modal } from "react-native";
import axios from "axios";
import { URL_HOST } from "../utils/urlHost";
import { verifyLogin } from "../utils/helpers";

// Component for displaying selected images in a modal and handling the image upload
export default function SelectedImagesModal({
  selectedImages,
  hikeId,
  isVisible,
  setIsVisible,
  setSelectedImages,
  refetch,
}) {
  // Function to handle the image upload
  const handleSubmit = async () => {
    try {
      const userVerified = await verifyLogin();
      if (userVerified) {
        // Loop through all selected images
        selectedImages.forEach(async (uri, index) => {
          // Create a new FormData instance
          let formData = new FormData();

          // Get the filename from the uri
          let filename = uri.split("/").pop();

          // Infer the type of the image
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          // Adjust the uri for Android
          if (Platform.OS === "android") {
            localUri = localUri.replace("file://", "");
          }

          // Append the image to the FormData instance
          formData.append("imageUrl", { uri: localUri, name: filename, type });

          // Send the POST request with Axios
          await axios.post(`${URL_HOST}/api/image/${hikeId}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        });
        refetch();
      } else {
        console.log("Invalid Login Credentials!");
      }
    } catch (error) {
      console.log("Error uploading image", error);
    }
    // Refresh the data after all images have been uploaded
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="w-full p-4 pt-28 pb-12 h-[80%] m-auto bg-white  items-center flex-1 flex-col justify-between">
        <View className="flex flex-row flex-wrap gap-2">
          {/* Display all selected images */}
          {selectedImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width: 150, height: 150 }}
            />
          ))}
        </View>
        <View className="bottom-0">
          {/* Button to trigger the image upload */}
          <Button title="Upload Photos" onPress={handleSubmit} />
          {/* Button to close the modal */}
          <Button
            title="Close"
            onPress={() => {
              // Close the modal and clear the selected images
              setIsVisible(false);
              setSelectedImages([]);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
