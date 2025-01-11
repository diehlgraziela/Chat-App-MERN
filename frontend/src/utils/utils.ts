import dayjs from "dayjs";

export const formatDateTime = (date: string) => {
  return dayjs(date).format("DD/MM/YYYY - HH:mm");
};

export const formatHour = (date: string) => {
  return dayjs(date).format("HH:mm");
};

export const getUserInitials = (name: string) => {
  if (!name) return "";

  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return initials;
};
