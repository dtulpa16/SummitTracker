import axios from "axios";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
export default function HomeScreen({ navigation }) {
  const [hikes, setAllHikes] = useState([]);

  useEffect(() => {
    getAllHikes();
  }, []);

  const getAllHikes = async () => {
    try {
      //const response = await axios.get("http://localhost:5000/api/summit/");
      const response = await axios.get("https://cat-fact.herokuapp.com/facts");
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
      <StatusBar style="auto" />
    </View>
  );
}
