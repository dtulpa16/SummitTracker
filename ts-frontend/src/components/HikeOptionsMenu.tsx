import React, { useState, useRef, useContext } from "react";
import { Button } from "../interfaces/Button";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import ImagePreviewModal from "./ImagePreviewModal";
import { Hike } from "../interfaces/Hike";
import NewNoteModal from "./NewNoteModal";
import EditHikeModal from "./EditHikeModal";

const options: Button[] = [
  {
    label: "Add Note",
    onClick: () => {},
  },
  {
    label: "Add Image",
    onClick: () => {},
  },
  {
    label: "Edit Hike",
    onClick: () => {},
  },
];

type ThemeProps = {
  theme: "light" | "dark";
};
interface HikeProps {
  hike: Hike;
}
const HikeOptionsMenu: React.FC<ThemeProps & HikeProps> = ({ theme, hike }) => {
  const [showOptions, setShowOptions] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  options[1].onClick = () => {
    fileInputRef.current?.click();
    setShowOptions(false)
  }; // Overwrite the onClick of the "Add Image" button
  options[0].onClick = () => {
    setShowNoteModal(true);
    setShowOptions(false)
  }; // Overwrite the onClick of the "Add Note" button
  options[2].onClick = () => {
    setShowEditModal(true);
    setShowOptions(false)
  }; // Overwrite the onClick of the "Edit Hike" button

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
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
          } absolute flex flex-col p-2 rounded-md mt-1 z-10`}
        >
          {options.map((button, index) => (
            <button className="p-2" key={index} onClick={button.onClick}>
              {button.label}
            </button>
          ))}
        </div>
      ) : null}
      {image && showModal && (
        <ImagePreviewModal
          image={image}
          setImage={setImage}
          showModal={showModal}
          setShowModal={setShowModal}
          theme={theme}
          hike={hike}
        />
      )}
      <NewNoteModal
        isOpen={showNoteModal}
        theme={theme}
        setIsOpen={setShowNoteModal}
        hike={hike}
        />
      <EditHikeModal
        isOpen={showEditModal}
        theme={theme}
        setIsOpen={setShowEditModal}
        hike={hike}

      />
    </div>
  );
};
export default HikeOptionsMenu;
