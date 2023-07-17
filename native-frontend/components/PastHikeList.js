import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomButton from "./elements/CustomButton";
const PastHikeList = ({ data, navigation }) => {
  return (
    <View className="flex flex-col gap-8">
      {data?.length > 0 ? (
        data.map((hike, index) => (
          <TouchableOpacity
            className="flex p-4 rounded-lg drop-shadow-md bg-white min-h-[150] min-w-[200] gap-2"
            key={index}
            onPress={() =>
              navigation.navigate("Hike Details", {
                hikeId: hike?._id,
                name: hike?.name,
              })
            }
          >
            <Text className=" text-3xl text-blue-950 font-bold">
              {hike?.name}
            </Text>
            <Text className=" text-xl font-bold text-blue-950">
              {hike?.altitude} ft. elevation
            </Text>
            <Text className=" text-xl font-bold text-blue-950">
              {hike?.length} miles
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <View>
          <Text className="text-white text-2xl font-bold">
            No recorded hikes!
          </Text>
          <CustomButton
            onPress={() => navigation.navigate("Add Hike")}
            text="Add New Hike"
          />
        </View>
      )}
    </View>
  );
};

export default PastHikeList;
