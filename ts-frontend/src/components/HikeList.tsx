import React, { useState, useEffect, FC } from "react";
import { Hike } from "../interfaces/Hike";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  CalendarIcon,
  ArrowCircleUpIcon,
  LocationMarkerIcon,
  DocumentTextIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid";
import { Image } from "../interfaces/Image";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import NoteList from "./NoteList";

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
  const [theme] = useTheme();
  return (
    <div
      className={`flex h-full flex-col ${
        theme === "dark" ? "bg-gray-600" : "bg-white"
      }`}
    >
      {hikes.length ? (
        hikes.map((hike, index) => (
          <div key={index} className={` text-white p-4`}>
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
  const [theme] = useTheme();
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
    }, 4000);
    return () => clearInterval(interval);
  }, [image]);

  return image ? (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800" : "bg-blue-500"
      } flex flex-row justify-between md:max-w-6xl md:mx-auto rounded shadow-md p-4 `}
    >
      <div className="flex flex-col gap-1 text-white">
        <div className="flex md:flex-row flex-col-reverse flex-wrap gap-2 justify-between md:w-[220px]">
          <h2 className="font-bold text-xl">{hike.name}</h2>
          <DotsVerticalIcon
            className={`w-7 text-white ${
              theme === "dark"
                ? "bg-gray-600"
                : "bg-white text-blue-500 cursor-pointer"
            } rounded-full p-[2px]`}
          />
        </div>
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
        <div>
          <h3 className="flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5" />
            Notes
          </h3>
          <NoteList notes={hike.notes} />
        </div>
      </div>
      <div className="h-[250px] w-[250px] bg-slate-400 relative overflow-hidden">
        <TransitionGroup>
          <CSSTransition
            key={image[imageIndex]?.imageUrl}
            timeout={500}
            classNames="slide"
          >
            <img
              src={`${process.env.REACT_APP_URL_HOST}${
                image[imageIndex]?.imageUrl || null
              }`}
              alt={hike.name}
              className="object-cover h-[100%] w-[100%] absolute"
            />
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};
