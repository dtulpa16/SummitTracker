import React, { useState, useEffect, FC } from "react";
import { Hike } from "../interfaces/Hike";
import {
  CalendarIcon,
  ArrowCircleUpIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { Image } from "../interfaces/Image";
import axios from "axios";
export default function HikeList() {
  const [hikes, setHikes] = useState<Hike[]>([]);
  useEffect(() => {
    const fetchHikes = async () => {
      try {
        let response = await axios.get<Hike[]>(
          `${process.env.REACT_APP_URL_HOST}/api/summit/`
        );
        setHikes(response.data);
      } catch (er) {
        console.log(er);
      }
    };
    fetchHikes();
  }, []);
  return <HikeMapper hikes={hikes} />;
}
interface HikeMapperProps {
  hikes: Hike[];
}

const HikeMapper: FC<HikeMapperProps> = ({ hikes }) => {
  return (
    <div className="flex flex-col gap-2 md:w-1/3">
      {hikes.length ? (
        hikes.map((hike, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white p-4 rounded shadow-lg"
          >
            <HikeCard hike={hike} />
          </div>
        ))
      ) : (
        <p>No hikes to display</p>
      )}
    </div>
  );
};

interface HikeProp {
  hike: Hike;
}

const HikeCard: FC<HikeProp> = ({ hike }) => {
  const [image, setimage] = useState<Image[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        let response = await axios.get<Image[]>(
          `http://localhost:5000/api/image/${hike._id}/`
        );
        setimage(response.data);
      } catch (er) {
        console.log(er);
      }
    };
    fetchImage();
  }, [hike]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevImageIndex) => (prevImageIndex + 1) % image.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [image]);

  return image ? (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-1 text-white">
        <h2 className="font-bold text-xl">{hike.name}</h2>
        <h3 className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          {hike.date.split("T")[0]}
        </h3>
        <h3 className="flex items-center gap-2">
          <ArrowCircleUpIcon className="h-5 w-5" />
          {hike.altitude}ft Elevation
        </h3>
        <h3 className="flex items-center gap-2">
          <LocationMarkerIcon className="h-5 w-5" />
          {hike.length} Miles
        </h3>
      </div>
      <div className="h-[250px] w-[250px] bg-slate-400">
        <img
          src={`${process.env.REACT_APP_URL_HOST}${
            image[imageIndex]?.imageUrl || null
          }`}
          alt={hike.name}
          className="object-cover h-[100%] w-[100%]"
        />
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};
