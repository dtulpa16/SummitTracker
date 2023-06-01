import React from "react";

type ImageProps = {
  image: File;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  showModal: true | false;
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
}) => {
  const handleSubmit = async () => {};
  return showModal ? (
    <div
      className={`${
        theme === "dark" ? "md:bg-gray-600 bg-gray-900 text-white" : "bg-white"
      } fixed inset-0 flex items-center justify-center z-40 bg-opacity-80 md:bg-opacity-60`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-600 text-white" : "bg-white"
        } p-8 rounded shadow-md z-50`}
      >
        <h2 className="mb-4 text-lg font-bold">Image Preview</h2>
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
              setShowModal(false);
              setImage(null);
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
