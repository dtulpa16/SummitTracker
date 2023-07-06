import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, View } from "react-native";
export default function MapComponent({ latitude, longitude, hikeName }) {
  console.log("LAT: ", latitude, "\nLONG: ", longitude);
  return latitude && longitude ? (
    <View className="w-11/12 h-11/12 justify-center items-center rounded-xl overflow-hidden py-3">
      <MapView
        className="flex w-full h-full"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={hikeName}
        />
      </MapView>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}
