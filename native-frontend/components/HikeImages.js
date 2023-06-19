import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import useFetch from "../hooks/useFetch";
import { URL_HOST } from "../utils/urlHost";
import LoadingIcon from "../assets/loading.svg";
export default function HikeImages({ hikeId }) {
  const { data, isLoading, error } = useFetch(
    `${URL_HOST}/api/image/${hikeId}`
  );

  return !isLoading ? (
    <View className="flex flex-row flex-wrap gap-2">
      {data.map((image, i) => (
        <View key={i}>
          <ImageCard key={image.id} image={image} />
        </View>
      ))}
    </View>
  ) : (
    <View className="flex h-full w-full justify-center items-center">
      <LoadingIcon width={100} height={100} className="animate-spin" />
    </View>
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
