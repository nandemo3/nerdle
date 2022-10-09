import { atom, selector } from "recoil";

import { MatrixProps, CorrectType } from "./types";

const initialmatrixState = [
  [
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
  ],
  [
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
  ],
  [
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
  ],
  [
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
  ],
  [
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
  ],
  [
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
    { value: "", type: CorrectType.None },
  ],
];

export const matrixState = atom<MatrixProps[][]>({
  key: "matrixState",
  default: initialmatrixState,
});

export const focusState = atom<{ row: number; column: number }>({
  key: "focusState",
  default: { row: 0, column: 0 },
});

export const isOutOfRangeFocusState = selector({
  key: "isOutOfRangeFocusState",
  get: ({ get }) => {
    const focus = get(focusState);

    return focus.row === -1 && focus.column === -1;
  },
});
