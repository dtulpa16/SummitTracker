import { useState } from "react";
import {
  SunIcon,
  MoonIcon,
  LoginIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import MountainIcon from "./MountainIcon";
import { useTheme } from "../context/ThemeContext";
import LoginModal from "./LoginModal";
import { isLoggedIn } from "../helpers/simpleAuth";
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [theme, themeToggler] = useTheme();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  };

  return (
    <nav
      className={`p-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-blue-500"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto md:px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center px-1 lg:px-0">
            <MountainIcon />
            <div className="ml-1 md:text-2xl text-lg font-semibold">
              Summit Tracker
            </div>
          </div>
          <div className="lg:ml-4 flex items-center">
            {isLoggedIn() ? (
              <LogoutIcon className="h-6 w-6 cursor-pointer" onClick={logout} />
            ) : (
              <LoginIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setModalOpen(true)}
              />
            )}
            <button
              className="p-1 border-2 border-transparent text-white rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out ml-4"
              aria-label="Toggle dark mode"
              onClick={themeToggler}
            >
              {theme === "dark" ? (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <LoginModal
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
          theme={theme}
        />
      )}
    </nav>
  );
};
export default Navbar;
