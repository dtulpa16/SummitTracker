import React from "react";
import { Text, View } from "react-native";
import useFetch from "../hooks/useFetch";
export default function HikeNotes({ hikeId }) {
  const { data, isLoading, error } = useFetch(
    `http://3185-65-50-175-67.ngrok.io/api/summit/${hikeId}/fetch-notes/`
  );
  return !isLoading  ? (
    <View>
      {data?.map((note, index) => (
        <HikeNoteCard note={note} index={index} />
      ))}
    </View>
  ) : (
    <Text>Nothing to see here</Text>
  );
}
export function HikeNoteCard({ note, index }) {
  return (
    <View key={index}>
      <Text className="text-md font-bold text-white pl-2">-{note.text}</Text>
    </View>
  );
}