import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, View } from "react-native";
export default function MapComponent({ latitude, longitude }) {
  console.log("LAT: ", latitude, "\nLONG: ", longitude);
  return latitude && longitude ? (
    <MapView
      className="flex w-4/5 h-1/3"
      initialRegion={{
        latitude: "39.5501",
        longitude: "-107.5808",
        latitudeDelta: 5,
        longitudeDelta: 5,
      }}
    >
      <Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={"Hike Location"}
      />
    </MapView>
  ) : (
    <Text>Loading...</Text>
  );
}
