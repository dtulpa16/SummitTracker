import React from "react";
import { Text, View } from "react-native";
import useFetch from "../hooks/useFetch";
export default function HikeNotes({ notes }) {
  return notes ? (
    <View>
      {notes?.map((note, index) => (
        <View key={index}>
          <HikeNoteCard note={note} index={index} />
        </View>
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
