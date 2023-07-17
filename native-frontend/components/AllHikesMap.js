import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function AllHikesMap({ data }) {
  return data ? (
    <View>
      <Text>It's Working!</Text>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}
