import React, { FC } from "react";
import { Note } from "../interfaces/Note";
interface NoteProps {
  notes: Note[];
}
const NoteList: FC<NoteProps> = ({ notes }) => {
  return notes ? (
    <div>
      {notes?.map((el) => (
        <h3 className="md:font-semibold md:text-md text-sm md:pl-4">"{el.text}"</h3>
      ))}
    </div>
  ) : null;
};
export default NoteList;
