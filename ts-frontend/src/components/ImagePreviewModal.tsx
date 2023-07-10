import React, { useContext, useState } from "react";
import { Hike } from "../interfaces/Hike";
import axios from "axios";
import { HikeFetchContext } from "./HikeList";
import { notify } from "../helpers/notify";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

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
    let enteredPassword = prompt("Please enter password:");
    if (enteredPassword !== process.env.REACT_APP_PERMISSION_PASSWORD) {
      notify("😞Incorrect password", "error", theme);
    } else {
      try {
        debugger;
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
      } fixed inset-0 flex items-center justify-center z-40 bg-opacity-90 md:bg-opacity-90`}
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
            className="absolute top-0 right-0 text-xl font-bold text-red-500 bg-opacity-80 px-2 bg-white"
            onClick={() => handleImageRemoval(currentImageIndex)}
          >
            X
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
