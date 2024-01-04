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

export const generateRequestFileName = (student, professor) => {
  const studentName = student.name.split(" ").join("_");
  const professorName = professor.name.split(" ").join("_");
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString().split("/").join("-");
  const time = currentDate.toLocaleTimeString().split(":").join("-");
  return `${studentName}-${professorName}-${date}-${time}.pdf`;
}