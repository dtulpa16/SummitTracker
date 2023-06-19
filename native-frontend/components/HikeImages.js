import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
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
      {/* <LoadingIcon width={100} height={100} className="animate-spin" /> */}
      <ActivityIndicator size="large" color="#fdbb74" />
    </View>
  );
}

export const ImageCard = ({ image }) => {
  // console.log(`IMAGE DATA: ${URL_HOST}${image?.imageUrl}`);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View className="relative w-[195px] h-[195px] justify-center items-center">
      {isLoading && (
        <View className="absolute inset-0 flex items-center justify-center">
          <ActivityIndicator size="large" color="#fdbb74" />
        </View>
      )}
      <Image
        source={{ uri: `${URL_HOST}${image?.imageUrl}` }}
        className="absolute w-[195px] h-[195px]"
        onLoadEnd={() => setIsLoading(false)}
        // style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
};
