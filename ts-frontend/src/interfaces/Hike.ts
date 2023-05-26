import { Note } from "./Note";
export interface Hike {
  _id: string;
  name: string;
  coordinates: string;
  length: number;
  altitude: number;
  date: string;
  notes: Note[];
}
