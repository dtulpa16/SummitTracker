import React, { useContext, useState } from "react";
import { Hike } from "../interfaces/Hike";
import axios from "axios";
import { HikeFetchContext } from "./HikeList";
import { notify } from "../helpers/notify";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { isLoggedIn } from "../helpers/simpleAuth";

type ImageProps = {
  images: File[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  showModal: true | false;
  hike: Hike;
};

type ThemeProps = {
  theme: "light" | "dark";
};

const ImagePreviewModal: React.FC<ImageProps & ThemeProps> = ({
  images,
  setImages,
  showModal,
  setShowModal,
  theme,
  hike,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fetchHikes = useContext(HikeFetchContext);
  const handleImageRemoval = (index: number) => {
    const newImagesArray = [...images];
    newImagesArray.splice(index, 1);
    setImages(newImagesArray);
    notify("Image Removed!", "success", theme);
  };
  const goToNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const handleSubmit = async () => {
    setShowModal(false);
    if (!isLoggedIn()) {
      notify("😞Incorrect Login", "error", theme);
    } else {
      try {
        // Loop through images and make POST request for each
        for (let i = 0; i < images.length; i++) {
          let formData: FormData = new FormData();
          formData.append("imageUrl", images[i]);
          let response = await axios.post<Hike>(
            `${process.env.REACT_APP_URL_HOST}/api/image/${hike._id}/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
        }
        notify("📷Images posted successfully!", "success", theme);
        fetchHikes && fetchHikes();
      } catch (er) {
        notify("😞An error occurred in posting image", "error", theme);
        console.log("Error in posting hike image: ", er);
      }
    }
    setImages([]);
  };

  return showModal && images.length > 0 ? (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-900 text-black"
      } fixed inset-0 flex items-center justify-center z-50 bg-opacity-90 md:bg-opacity-90`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-600 text-white" : "bg-white"
        } p-8 md:p-12 rounded shadow drop-shadow z-50 md:w-auto`}
      >
        <h2 className="mb-4 text-xl font-bold">Image Preview</h2>
        <div className="relative md:w-[500px] md:h-[450px] w-max h-[350px]">
          <img
            src={URL.createObjectURL(images[currentImageIndex] ?? images[0])}
            className="w-[360px] h-[350px] md:w-[500px] md:h-[450px] object-cover"
            alt="Preview"
          />
          <button
            className="absolute top-0 right-0 font-bold text-red-500 bg-opacity-80 p-1 bg-white"
            onClick={() => handleImageRemoval(currentImageIndex)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.9}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row justify-between mt-2">
          <button
            className={`${
              theme === "dark"
                ? "bg-gray-500 hover:bg-grey-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white rounded px-2 py-1 `}
            onClick={goToPreviousImage}
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
          <button
            className={`${
              theme === "dark"
                ? "bg-gray-500 hover:bg-grey-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white rounded px-2 py-1 `}
            onClick={goToNextImage}
          >
            <ChevronRightIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => {
              setImages([]);
              setShowModal(false);
            }}
            className={`${
              theme === "dark"
                ? " bg-gray-500 text-white"
                : "bg-blue-500 text-white"
            } mt-4 px-4 py-2 rounded shadow font-semibold`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`${
              theme === "dark"
                ? " bg-gray-500 text-white"
                : "bg-blue-500 text-white"
            } mt-4 px-4 py-2 rounded shadow font-semibold`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ImagePreviewModal;
