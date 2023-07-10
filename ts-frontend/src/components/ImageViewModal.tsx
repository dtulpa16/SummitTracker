import { ChevronLeftIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { FC, useState } from "react";
import { Image } from "../interfaces/Image";
interface ImageViewModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  images: Image[];
  imageIndex: number;
  setImageIndex: (imageIndex: number) => void;
}
type ThemeProps = {
  theme: "light" | "dark";
};
const ImageViewModal: FC<ImageViewModalProps & ThemeProps> = ({
  isOpen,
  setIsOpen,
  images,
  theme,
}) => {
  const [imageViewIndex, setImageViewIndex] = useState<number>(0);
  const goToNextImage = () => {
    setImageViewIndex((prevImageIndex) => (prevImageIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setImageViewIndex(
      (prevImageIndex) => (prevImageIndex - 1 + images.length) % images.length
    );
  };

  return isOpen ? (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-900 text-black"
      } fixed inset-0 flex items-center justify-center z-50 bg-opacity-90 md:bg-opacity-90`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-600 text-white" : "bg-white"
        } p-3 md:p-8 rounded shadow drop-shadow z-50 md:w-auto`}
      >
        <h2 className="mb-4 text-xl font-bold"></h2>
        <div className="relative md:w-[500px] md:h-[500px] w-max h-[350px]">
          <img
            src={images[imageViewIndex]?.imageUrl}
            className="w-[360px] h-[350px] md:w-[500px] md:h-[500px] object-cover"
            alt="Preview"
          />
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
        <div className="flex flex-row justify-center">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className={`${
              theme === "dark"
                ? " bg-gray-500 text-white"
                : "bg-blue-500 text-white"
            }  mt-4 px-6 py-2 rounded shadow text-lg font-semibold `}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
export default ImageViewModal;
