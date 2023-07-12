import React, { useState, useEffect, FC, createContext } from "react";
import { Hike } from "../interfaces/Hike";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  CalendarIcon,
  ArrowCircleUpIcon,
  LocationMarkerIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid";
import { Image } from "../interfaces/Image";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import NoteList from "./NoteList";
import HikeOptionsMenu from "./HikeOptionsMenu";
import AddHikeModal from "./AddHikeModal";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/solid";
import ImageViewModal from "./ImageViewModal";
import { ViewListIcon } from "@heroicons/react/solid";
type HikeFetchType = () => void;
export const HikeFetchContext = createContext<HikeFetchType | undefined>(
  undefined
);
export default function HikeList() {
  const [hikes, setHikes] = useState<Hike[]>([]);

  useEffect(() => {
    fetchHikes();
  }, []);
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
  return (
    <HikeFetchContext.Provider value={fetchHikes}>
      <HikeMapper hikes={hikes} />
    </HikeFetchContext.Provider>
  );
}

interface HikeMapperProps {
  hikes: Hike[];
}

const HikeMapper: FC<HikeMapperProps> = ({ hikes }) => {
  const [theme] = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${theme === "dark" ? "bg-gray-600" : "bg-white"}`}>
      <h1
        onClick={() => setIsOpen(true)}
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-blue-500"
        } mt-4 md:max-w-6xl mx-auto p-3 text-white px-5 hover:scale-105 hover:cursor-pointer duration-100 font-semibold rounded w-[140px] text-center`}
      >
        Add Hike <span className="text-xl font-bold">+</span>
      </h1>
      <div
        className={`flex flex-row flex-wrap md:w-10/12 mx-auto md justify-center ${
          theme === "dark" ? "bg-gray-600" : "bg-white"
        }`}
      >
        {hikes.length ? (
          hikes.map((hike, index) => (
            <div key={index} className={` text-white md:p-4 py-3`}>
              <HikeCard hike={hike} />
            </div>
          ))
        ) : (
          <p>No hikes to display</p>
        )}
      </div>
      <AddHikeModal isOpen={isOpen} theme={theme} setIsOpen={setIsOpen} />
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        let response = await axios.get<Image[]>(
          `${process.env.REACT_APP_URL_HOST}/api/image/${hike._id}/`
        );
        setimage(response.data);
      } catch (er) {
        console.log(er);
      }
    };
    fetchImage();
  }, [hike]);
  const goToNextImage = () => {
    setImageIndex((prevImageIndex) => (prevImageIndex + 1) % image.length);
  };

  const goToPreviousImage = () => {
    setImageIndex(
      (prevImageIndex) => (prevImageIndex - 1 + image.length) % image.length
    );
  };

  return image ? (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800" : "bg-blue-500"
      } flex flex-row  md:items-start justify-between md:max-w-6xl min-w-[380px] md:min-w-[530px] md:mx-auto rounded shadow-md p-3 md:min-h-max min-h-[260px]`}
    >
      <div className="flex flex-col gap-2 text-white ">
        <div className="flex md:flex-row flex-col-reverse flex-wrap gap-2 justify-between md:w-[220px]">
          <h2 className="font-bold text-md md:text-xl">{hike.name}</h2>
          <HikeOptionsMenu theme={theme} hike={hike} />
        </div>
        <h3 className="flex items-center gap-2 md:text-base text-sm">
          <CalendarIcon className="h-5 w-5" />
          {hike.date.split("T")[0]}
        </h3>
        <h3 className="flex items-center gap-2 md:text-base text-sm">
          <ArrowCircleUpIcon className="h-5 w-5" />
          {hike.altitude}ft Elevation
        </h3>
        <h3 className="flex items-center gap-2 md:text-base text-sm">
          <LocationMarkerIcon className="h-5 w-5" />
          {hike.length} Miles
        </h3>
        <div>
          <h3 className="flex items-center gap-2 md:text-base text-sm">
            <DocumentTextIcon className="h-5 w-5" />
            Notes
          </h3>
          <NoteList notes={hike.notes} />
        </div>
      </div>
      <div className="h-[250px] md:w-[250px] min-w-[200px] bg-slate-400 relative overflow-hidden">
        <button
          onClick={goToPreviousImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-40 "
        >
          <ChevronLeftIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
        </button>
        <TransitionGroup>
          {console.log(image[imageIndex]?.imageUrl)}
          <CSSTransition
            key={image[imageIndex]?.imageUrl}
            timeout={500}
            classNames="slide"
          >
            <img
              src={image[imageIndex]?.imageUrl}
              alt={hike.name}
              className="object-cover h-[100%] w-[100%] absolute "
            />
          </CSSTransition>
        </TransitionGroup>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute right-0 top-4 transform -translate-y-1/2 z-10"
        >
          <ViewListIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
        </button>
        <button
          onClick={goToNextImage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        >
          <ChevronRightIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
        </button>
      </div>
      <ImageViewModal
        theme={theme}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setImages = {setimage}
        images={image}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
      />
    </div>
  ) : (
    <>Loading...</>
  );
};
