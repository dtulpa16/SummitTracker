import { Note } from "./Note";
export interface Hike {
  id: string;
  name: string;
  coordinates: string;
  length: number;
  altitude: number;
  date: Date;
  notes: Note[];
}
