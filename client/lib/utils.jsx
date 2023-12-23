import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const getImageSrc = (userType) => {
  if (userType === "student") {
    return "/student.svg";
  } else if (userType === "professor") {
    return "/professor.svg";
  }
};

export const cn = (...inptus) => {
  return twMerge(clsx(...inptus));
};

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, 
  };

  const date = new Date(dateString);
  return date.toLocaleString(undefined, options);
};