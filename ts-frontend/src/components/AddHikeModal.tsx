import React from "react";
type ThemeProps = {
  theme: "light" | "dark";
};
interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddHikeModal: React.FC<ThemeProps & ModalProps> = ({
  theme,
  isOpen,
  setIsOpen,
}) => {
  const handleSubmit = async () => {};

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
      </div>
    </div>
  ) : null;
};
export default AddHikeModal;
