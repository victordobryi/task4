import { addZero } from './addZero';

export const getCurrentDate = () => {
  const today = new Date();
  const date =
    addZero(today.getFullYear()) +
    '-' +
    addZero(today.getMonth() + 1) +
    '-' +
    addZero(today.getDate());
  return date;
};
