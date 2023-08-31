import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function AllHikesMap({ data, navigation }) {
  console.log(data[0]);
  return data ? (
    <View>
      <MapView
        className="flex w-[500px] h-[500px]"
        initialRegion={{
          latitude: 40.3955,
          longitude: -105.0746,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
      >
        {data.map((hike, index) => (
          <Marker
            key={index}
            title={hike.name}
            coordinate={{
              latitude: hike?.coordinates?.split(",")[0],
              longitude: hike?.coordinates?.split(",")[1],
            }}
          />
        ))}
      </MapView>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}
