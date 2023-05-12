import axios from "axios";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { URL_HOST } from "../utils/urlHost";
export default function HomeScreen({ navigation }) {
  const [hikes, setAllHikes] = useState([]);

  useEffect(() => {
    getAllHikes();
  }, []);

  const getAllHikes = async () => {
    try {
      const response = await axios.get(`${URL_HOST}/api/summit/`);
      console.log(response.data);
    } catch (error) {
      console.log("getAllHikes error: ", error);
    }
  };
  return (
    <View className="flex-1 items-center justify-center bg-emerald-900">
      <Text className=" text-white text-5xl">SummitTracker!</Text>
      {/* StatusBar displays base phone info*/}
      <Button
        title="Past Hikes"
        onPress={() => navigation.navigate("Past Hikes")}
      />
      <Button
        title="Hike Details"
        onPress={() => navigation.navigate("Hike Details")}
      />
      <StatusBar style="auto" />
    </View>
  );
}
