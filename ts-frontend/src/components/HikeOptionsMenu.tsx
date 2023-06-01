import React, { useState, useRef } from "react";
import { Button } from "../interfaces/Button";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import ImagePreviewModal from "./ImagePreviewModal";
const options: Button[] = [
  {
    label: "Add Note",
    onClick: () => console.log("Button 1 clicked"),
  },
  {
    label: "Add Image",
    onClick: () => {},
  },
  {
    label: "Edit Hike",
    onClick: () => console.log("Button 2 clicked"),
  },
];

type ThemeProps = {
  theme: "light" | "dark";
};

const HikeOptionsMenu: React.FC<ThemeProps> = ({ theme }) => {
  const [showOptions, setShowOptions] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  options[1].onClick = () => fileInputRef.current?.click(); // Overwrite the onClick of the "Add Image" button

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file); // Do something with the file
      setShowModal(true);
    }
  };
  return (
    <div className="">
      <DotsVerticalIcon
        onClick={() => setShowOptions(!showOptions)}
        className={`w-7 ${
          theme === "dark"
            ? "bg-gray-600 text-white "
            : "bg-white text-blue-500 "
        } rounded-full p-[2px] cursor-pointer`}
      />
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      {showOptions ? (
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-600 text-white "
              : "bg-white text-blue-500 "
          } absolute flex flex-col p-2 rounded-md mt-1`}
        >
          {options.map((button, index) => (
            <button className="p-2" key={index} onClick={button.onClick}>
              {button.label}
            </button>
          ))}
        </div>
      ) : null}
      {image && (
        <ImagePreviewModal
          image={image}
          setImage={setImage}
          showModal={showModal}
          setShowModal={setShowModal}
          theme={theme}
        />
      )}
    </div>
  );
};
export default HikeOptionsMenu;
