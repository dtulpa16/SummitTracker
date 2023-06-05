import React, { useContext } from "react";
import { HikeFetchContext } from "./HikeList";
import axios from "axios";
type ThemeProps = {
  theme: "light" | "dark";
};
interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormFields {
  name: string;
  altitude: number;
  length: number;
}
const AddHikeModal: React.FC<ThemeProps & ModalProps> = ({
  theme,
  isOpen,
  setIsOpen,
}) => {
  const fetchHikes = useContext(HikeFetchContext);
  const [fields, setFields] = React.useState<FormFields>({
    name: "",
    altitude: 0,
    length: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      debugger;
      let payload = {
        name: fields.name,
        altitude: Number(fields.altitude),
        length: Number(fields.length),
      };
      let response = await axios.post(
        `http://localhost:5000/api/summit/`,
        payload
      );
      fetchHikes && fetchHikes();
    } catch (error) {
      console.log("Error in postHike: ", error);
    }
    console.log(fields);
    setIsOpen(false);
  };

  return isOpen ? (
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
        <h1 className="font-semibold text-xl mb-2">Add New Hike</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleInputChange}
            placeholder="Hike Name"
            className={`mb-4 border rounded p-2 ${
              theme === "dark" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
          />
          <label>Altitude</label>
          <input
            type="number"
            name="altitude"
            value={fields.altitude}
            onChange={handleInputChange}
            placeholder="Altitude"
            className={`mb-4 border rounded p-2 ${
              theme === "dark" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
          />
          <label>Length</label>
          <input
            type="number"
            name="length"
            value={fields.length}
            onChange={handleInputChange}
            placeholder="Length"
            className={`mb-4 border rounded p-2 ${
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
export default AddHikeModal;