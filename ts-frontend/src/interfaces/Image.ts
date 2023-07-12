import { Hike } from "./Hike";
export interface Image {
  _id: string;
  imageUrl: string;
  hike: Hike;
}
