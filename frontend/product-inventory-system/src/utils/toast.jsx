import toast from "react-hot-toast";

const Toast = (message, type = "success") => {
  // Check if the device is mobile using window.matchMedia
  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  // Only show toast if it's not a mobile screen
  if (!isMobile) {
    toast[type](message, {
      duration: 2000,
      position: "top-right",
      style: { borderRadius: "8px", minWidth: "250px" },
      className: "",
    });
  }
};

export default Toast;
