import React, { useState } from "react";
import { notify } from "../helpers/notify";
type ThemeProps = {
  theme: "light" | "dark";
};
interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<ThemeProps & ModalProps> = ({
  theme,
  isOpen,
  setIsOpen,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      // Store credentials in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      notify("👋Login Successful!", "success", theme);
    } else {
      notify("😞Incorrect username or password", "error", theme);
    }
    setUsername("");
    setPassword("");
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
        <h1 className="font-semibold text-xl mb-2">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={`mb-4 md:w-[450px] border rounded p-2 ${
              theme === "dark" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
          />
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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
              Log In
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
export default LoginModal;
