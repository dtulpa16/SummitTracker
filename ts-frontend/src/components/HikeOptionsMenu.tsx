import React, { useState } from "react";
import { Button } from "../interfaces/Button";
import { DotsVerticalIcon } from "@heroicons/react/solid";
const options: Button[] = [
  {
    label: "Add Note",
    onClick: () => console.log("Button 1 clicked"),
  },
  {
    label: "Add Image",
    onClick: () => console.log("Button 2 clicked"),
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
    </div>
  );
};
export default HikeOptionsMenu;
