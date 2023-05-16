import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import useFetch from "../hooks/useFetch";
import { URL_HOST } from "../utils/urlHost";
export default function HikeImages({ hikeId }) {
  const { data, isLoading, error } = useFetch(
    `${URL_HOST}/api/image/${hikeId}`
  );

  return !isLoading ? (
    <ScrollView horizontal={true} className="flex flex-row -ml-3">
      {data.map((image, i) => (
        <View key={i}>
          <ImageCard key={image.id} image={image} />
        </View>
      ))}
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
}

export const ImageCard = ({ image }) => {
  console.log(`IMAGE DATA: ${URL_HOST}${image?.imageUrl}`);
  return (
    <View className=" justify-center items-center">
      <Image
        source={{ uri: `${URL_HOST}${image?.imageUrl}` }}
        className="w-[195px] h-[195px]"
        // style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
};
