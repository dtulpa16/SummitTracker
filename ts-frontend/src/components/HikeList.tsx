import React, { useState, useEffect,FC } from "react";
import { Hike } from "../interfaces/Hike";
import axios from "axios";
export default function HikeList() {
  const [hikes, setHikes] = useState<Hike[]>();
  useEffect(() => {
    const fetchHikes = async () => {
      try {
        let response = await axios.get<Hike[]>(
          `${process.env.REACT_APP_URL_HOST}/api/summit/`
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
interface HikeMapperProps {
  hikes:Hike[]
}

const HikeMapper : FC<HikeMapperProps> = ({hikes}) => {
  return<></>
}

