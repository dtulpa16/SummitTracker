import React from "react";
import MapView, { Marker } from "react-native-maps";
import {Text } from "react-native";
export default function MapComponent({ latitude, longitude }) {
    console.log("LAT: ", latitude, "\nLONG: ", longitude)
  return latitude && longitude ? (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: "39.5501",
        longitude: "-107.5808",
        latitudeDelta: 10,
        longitudeDelta: 10,
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
