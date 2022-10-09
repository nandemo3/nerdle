import { evaluate } from "mathjs";

import { CorrectType } from "./types";

export const checkEquation = (equation: string): boolean => {
  if (!equation.split("").find((char) => char === "=")) {
    return false;
  }
  const left = equation.split("=")[0];
  const right = equation.split("=")[1];
  if (!left && !right) {
    return false;
  } else {
    return evaluate(left) === evaluate(right);
  }
};

export const delayAlert = (message: string) => {
  setTimeout(() => {
    alert(message);
  }, 100);
};

export const getBackgroundColor = (type: CorrectType, defaultColor: string) => {
  if (type === CorrectType.Correct) {
    return "green";
  } else if (type === CorrectType.PartiallyCorrect) {
    return "purple";
  } else if (type === CorrectType.Incorrect) {
    return "black";
  } else {
    return defaultColor;
  }
};
