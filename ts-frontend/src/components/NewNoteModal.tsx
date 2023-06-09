import React, { useContext, useState } from "react";
import { HikeFetchContext } from "./HikeList";
import axios from "axios";
import { Hike } from "../interfaces/Hike";
import { notify } from "../helpers/notify";
import { isLoggedIn } from "../helpers/simpleAuth";
type ThemeProps = {
  theme: "light" | "dark";
};
interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hike: Hike;
}

const NewNoteModal: React.FC<ThemeProps & ModalProps> = ({
  theme,
  isOpen,
  setIsOpen,
  hike,
}) => {
  const fetchHikes = useContext(HikeFetchContext);
  const [text, settext] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      notify("😞Incorrect Login", "error", theme);
    } else {
      try {
        let response = await axios.post(
          `${process.env.REACT_APP_URL_HOST}/api/summit/${hike._id}/note`,
          {
            text: text,
          }
        );
        notify("✍️Note posted successfully!", "success", theme);
        fetchHikes && fetchHikes();
      } catch (error) {
        notify("😞An error occurred in posting new note", "error", theme);
        console.log("Error in postHike: ", error);
      }
    }

    setIsOpen(false);
  };

  return isOpen ? (
    <div
      className={`${
        theme === "dark" ? " bg-gray-900 text-white" : "bg-gray-900 text-black"
      } fixed inset-0 flex items-center justify-center z-50 bg-opacity-80 md:bg-opacity-80`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-600 text-white" : "bg-white text-black"
        } p-8 md:p-12 rounded shadow-md z-50 md:w-auto w-11/12`}
      >
        <h1 className="font-semibold text-xl mb-2">Add Note</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Text</label>
          <input
            type="text"
            name="name"
            value={text}
            onChange={(e) => settext(e.target.value)}
            placeholder="New Note"
            className={`mb-4 md:w-[450px] border rounded p-2 ${
              theme === "dark" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
          />

          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className={`${
                theme === "dark"
                  ? " bg-gray-500 text-white"
                  : "bg-blue-500 text-white"
              } mt-4 px-4 py-2 rounded shadow font-semibold`}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
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
        </form>
      </div>
    </div>
  ) : null;
};
export default NewNoteModal;
