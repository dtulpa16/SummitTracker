import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, View } from "react-native";
export default function MapComponent({ latitude, longitude, hikeName }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
  }, []);
  return latitude && longitude ? (
    <View className="w-11/12 h-11/12 justify-center items-center rounded-xl overflow-hidden py-3">
      <MapView
        className="flex w-full h-full"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
        onMapReady={() => markerRef.current.showCallout()}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={hikeName}
          ref={markerRef}
          image={require("../assets/marker.png")}
        />
      </MapView>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}
