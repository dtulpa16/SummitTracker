import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DeleteIcon from "../assets/trashIcon.svg";

export default function HikeNotes({ notes }) {
  return notes ? (
    <View>
      {notes?.map((note, index) => (
        <View key={index} className="flex flex-col p-2">
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
    <View
      key={index}
      className="bg-slate-100 p-2 flex flex-row items-center justify-between"
    >
      <Text className="text-md font-bold text-blue-950 pl-2 py-2">
        -{note.text}
      </Text>
      <View>
        <TouchableOpacity className="flex justify-center p-3 bg-slate-100 rounded-full m-auto">
          <DeleteIcon width={30} height={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
