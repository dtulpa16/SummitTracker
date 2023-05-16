import React, { useState, useEffect } from "react";
import { Button, Image, View, Modal } from "react-native";

export default function SelectedImagesModal({
  selectedImages,
  hikeId,
  isVisible,
  setIsVisible,
  setSelectedImages,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="w-full p-4 pt-28 pb-12 h-[80%] m-auto bg-white  items-center flex-1 flex-col justify-between">
        <View className="flex flex-row flex-wrap gap-2">
          {selectedImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width: 150, height: 150 }}
            />
          ))}
        </View>
        <View className="bottom-0">
          <Button
            title="Add Photos"
            onPress={() => {
              /* handle adding photos here */
            }}
          />
          <Button
            title="Close"
            onPress={() => {
              setIsVisible(false);
              setSelectedImages([]);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
