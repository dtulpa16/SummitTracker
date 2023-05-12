import React from "react";
import { View, Text, Image } from "react-native";
import useFetch from "../hooks/useFetch";
import { URL_HOST } from "../utils/urlHost";
export default function HikeImages({ hikeId }) {
  const { data, isLoading, error } = useFetch(
    `${URL_HOST}/api/image/${hikeId}`
  );

  return !isLoading ? (
    <View>
      {data.map((image, i) => (
        <View key={i}>
          <ImageCard key={image.id} image={image} />
        </View>
      ))}
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}

export const ImageCard = ({ image }) => {
  console.log(`IMAGE DATA: ${URL_HOST}${image?.imageUrl}`);
  return (
    <Image
      source={{ uri: `${URL_HOST}${image?.imageUrl}` }}
      style={{ width: 100, height: 100 }}
      resizeMode="contain"
    />
  );
};
