import { toast } from "react-toastify";

export const notify = (
  message: string,
  status: "success" | "error",
  theme: "light" | "dark"
) => {
  if (status === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: theme,
    });
  } else {
    toast.error("An error occurred", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: theme,
    });
  }
};
