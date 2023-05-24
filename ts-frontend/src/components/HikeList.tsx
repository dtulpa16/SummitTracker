import React, { useState, useEffect } from "react";
import { Hike } from "../interfaces/Hike";
import axios from "axios";
export default function HikeList() {
  const [hikes, setHikes] = useState<Hike[]>();
  useEffect(() => {
    const fetchHikes = async () => {
      try {
        let response = await axios.get<Hike[]>(
          "http://localhost:5000/api/summit/"
        );
        debugger
        setHikes(response.data);
      } catch (er) {
        console.log(er);
      }
    };
    fetchHikes()
  }, []);
  return <div>HikeList</div>;
}
