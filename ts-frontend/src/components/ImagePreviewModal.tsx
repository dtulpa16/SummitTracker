import React, { useContext } from "react";
import { Hike } from "../interfaces/Hike";
import axios from "axios";
import { HikeFetchContext } from "./HikeList";
type ImageProps = {
  image: File;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  showModal: true | false;
  hike: Hike;
};

type ThemeProps = {
  theme: "light" | "dark";
};

const ImagePreviewModal: React.FC<ImageProps & ThemeProps> = ({
  image,
  setImage,
  showModal,
  setShowModal,
  theme,
  hike,
}) => {
  const fetchHikes = useContext(HikeFetchContext);
  const handleSubmit = async () => {
    let formData: FormData = new FormData();
    formData.append("imageUrl", image);
    try {
      let response = await axios.post<Hike>(
        `http://localhost:5000/api/image/${hike._id}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchHikes && fetchHikes()
      console.log(response.data);
    } catch (er) {
      console.log("Error in posting hike image: ", er);
    }
    setShowModal(false);
    setImage(null);
  };
  return showModal && image ? (
    <div
      className={`${
        theme === "dark" ? "md:bg-gray-600 bg-gray-900 text-white" : "bg-white"
      } fixed inset-0 flex items-center justify-center z-40 bg-opacity-80 md:bg-opacity-60`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-600 text-white" : "bg-white"
        } p-8 md:p-12 rounded shadow-md z-50 md:w-auto w-11/12`}
      >
        <h2 className="mb-4 text-xl font-bold">Image Preview</h2>
        <img
          src={URL.createObjectURL(image)}
          className="md:w-[300px]"
          alt="Preview"
        />
        <div className="flex flex-row justify-between">
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
          <button
            onClick={() => {
              setImage(null);
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
        </div>
      </div>
    </div>
  ) : null;
};

export default ImagePreviewModal;