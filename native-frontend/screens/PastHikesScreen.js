import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Switch,
} from "react-native";
import { URL_HOST } from "../utils/urlHost";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import PastHikeList from "../components/PastHikeList";
import AllHikesMap from "../components/AllHikesMap";
const PastHikesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useFetch(`${URL_HOST}/api/summit/`);
  const [showMap, setShowMap] = useState(false);
  const toggleSwitch = () => setShowMap((previousState) => !previousState);
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-blue-950">
      {!isLoading ? (
        <>
          <Text className=" text-white text-5xl py-4">Past Hikes</Text>
          <View className="flex flex-row justify-around">
            <Text>List</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={showMap ? "#ffb74d" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={showMap}
            />
            <Text>Map</Text>
          </View>
          <View className="flex-1">
            {showMap ? (
              <AllHikesMap data={data} navigation={navigation} />
            ) : (
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                <PastHikeList data={data} navigation={navigation} />
              </ScrollView>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#fdbb74" />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default PastHikesScreen;
