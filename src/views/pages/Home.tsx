import React, { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

// common
import {
  focusState,
  isOutOfRangeFocusState,
  matrixState,
} from "../../common/atoms";
import { ROWS, COLUMNS } from "../../common/constant";
import { checkEquation, delayAlert } from "../../common/functions";
import { CorrectType, MatrixProps } from "../../common/types";

// components
import Button from "../elements/Button";
import HorizontalList from "../parts/HorizontalList";

type ControllerProps = {
  correctAnswer: string;
};

const Controller: React.FC<ControllerProps> = ({ correctAnswer }) => {
  const [focus, setFocus] = useRecoilState(focusState);
  const [matrix, setMatrix] = useRecoilState(matrixState);
  const isOutOfRangeFocus = useRecoilValue(isOutOfRangeFocusState);

  const [usedText, setUsedText] = useState<MatrixProps[]>([]);

  const updateMatrixValue = useCallback(
    (targetRow: number, targetColumn: number, value: string) => {
      setMatrix((prev) => {
        const next = prev[targetRow].map((column, index) =>
          index === targetColumn ? { ...column, value: value } : column
        );
        const newMatrix = prev.map((p, index) =>
          focus.row === index ? next : p
        );
        return newMatrix;
      });
    },
    [focus, setMatrix]
  );

  const updateMatrixType = useCallback(
    (targetRow: number, targetColumn: number, type: CorrectType) => {
      setMatrix((prev) => {
        const next = prev[targetRow].map((column, index) =>
          index === targetColumn ? { ...column, type: type } : column
        );
        const newMatrix = prev.map((p, index) =>
          focus.row === index ? next : p
        );
        return newMatrix;
      });
    },
    [focus, setMatrix]
  );

  const updateFocus = useCallback(
    (row: number, column: number) => {
      if (-1 <= row && row < ROWS && -1 <= column && column < COLUMNS) {
        setFocus({ row, column });
      }
    },
    [setFocus]
  );

  const handleClick = useCallback(
    (text: string) => {
      // ???????????????????????????????????????????????????
      if (isOutOfRangeFocus) return;

      updateMatrixValue(focus.row, focus.column, text);
      updateFocus(focus.row, focus.column + 1);
    },
    [focus, isOutOfRangeFocus, updateFocus, updateMatrixValue]
  );

  const handleSubmit = useCallback(() => {
    // ???????????????????????????????????????????????????
    if (isOutOfRangeFocus) return;

    let isFilled = true;
    let isAllCorrect = true;
    let currentAnswer = "";
    // ?????????????????????
    for (let i = 0; i < COLUMNS; i++) {
      if (matrix[focus.row][i].value === "") {
        // 1???????????????????????????????????????
        isFilled = false;
      } else {
        currentAnswer = currentAnswer.concat(matrix[focus.row][i].value);
      }
    }
    // ?????????????????????
    if (!isFilled) {
      delayAlert("White space exists.");
    } else {
      // ???????????????????????????????????????
      if (!checkEquation(currentAnswer)) {
        delayAlert("The equation is incorrect.");
      } else {
        // ???????????????????????? ???????????????????????????
        for (let i = 0; i < COLUMNS; i++) {
          let matrixType: CorrectType = CorrectType.None;
          // ???????????????????????????
          const newMatrix = matrix[focus.row].slice(0, i);
          if (currentAnswer[i] === correctAnswer[i]) {
            // ?????????????????????????????????
            matrixType = CorrectType.Correct;
          } else if (
            newMatrix.some((matrix) => matrix.value === currentAnswer[i])
          ) {
            matrixType = CorrectType.Incorrect;
          } else if (
            correctAnswer.split("").find((char) => char === currentAnswer[i])
          ) {
            // ??????????????????????????????????????????????????????????????????
            matrixType = CorrectType.PartiallyCorrect;
          } else {
            // ???????????????????????????????????????
            matrixType = CorrectType.Incorrect;
          }
          // ??????????????????????????????
          setUsedText((prev) => {
            const exist = prev.find((p) => p.value === currentAnswer[i]);
            if (exist === undefined) {
              return [
                ...prev,
                { value: matrix[focus.row][i].value, type: matrixType },
              ];
            } else {
              return prev;
            }
          });
          // Correct???????????????
          if (matrixType !== CorrectType.Correct) isAllCorrect = false;
          // CorrectType?????????
          updateMatrixType(focus.row, i, matrixType);
        }
        // row???6?????????
        if (focus.row + 1 === ROWS) {
          // ?????????????????????
          delayAlert("You lose. Game Over!");
          // ????????????????????????????????????
          updateFocus(-1, -1);
        } else {
          // ??????????????????
          if (isAllCorrect) {
            // ??????????????????
            delayAlert("You won. Game Clear!");
            // ????????????????????????????????????
            updateFocus(-1, -1);
          } else {
            // row????????????????????????
            updateFocus(focus.row + 1, 0);
          }
        }
      }
    }
  }, [
    correctAnswer,
    focus.row,
    isOutOfRangeFocus,
    matrix,
    updateFocus,
    updateMatrixType,
  ]);

  const handleDelete = useCallback(() => {
    // ???????????????????????????????????????????????????
    if (isOutOfRangeFocus) return;

    updateMatrixValue(focus.row, focus.column, "");
    const currentValue = matrix[focus.row][focus.column].value;
    if (currentValue === "" && 0 <= focus.column - 1) {
      updateFocus(focus.row, focus.column - 1);
    }
  }, [focus, isOutOfRangeFocus, matrix, updateFocus, updateMatrixValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // ???????????????????????????????????????????????????
      if (isOutOfRangeFocus) return;

      if (e.key.toLowerCase() === "enter") {
        // Enter
        handleSubmit();
      } else if (e.key === "Backspace") {
        // Backspace
        handleDelete();
      } else if (e.key.match(/[\d-/]/) && !e.shiftKey) {
        // 0-9 or - /
        handleClick(e.key);
      } else if (e.key.match(/[+*=]/) && e.shiftKey) {
        // + * =
        handleClick(e.key);
      } else if (e.key === "ArrowLeft") {
        // left
        if (focus.column === 0) return;
        updateFocus(focus.row, focus.column - 1);
      } else if (e.code === "ArrowRight") {
        // right
        updateFocus(focus.row, focus.column + 1);
      }
    },
    [
      focus,
      handleSubmit,
      handleDelete,
      handleClick,
      updateFocus,
      isOutOfRangeFocus,
    ]
  );

  return (
    <Grid container justifyContent="center">
      <Grid item>
        {[0, 1, 2, 3, 4, 5].map((row) => {
          return (
            <HorizontalList
              key={row}
              row={row}
              matrix={matrix[row]}
              onKeyDown={handleKeyDown}
            />
          );
        })}
      </Grid>
      <Grid
        item
        container
        sx={{
          marginTop: 4,
        }}
        justifyContent="center"
      >
        <Grid
          item
          sx={{
            flexDirection: "row",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number, index) => {
            return (
              <Button
                key={index}
                correcttype={
                  usedText.find((t) => t.value === number.toString())?.type ||
                  CorrectType.None
                }
                onClick={() => handleClick(number.toString())}
              >
                {number}
              </Button>
            );
          })}
        </Grid>
        <Grid
          item
          sx={{
            flexDirection: "row",
          }}
        >
          {["+", "-", "*", "/", "="].map((text, index) => {
            return (
              <Button
                key={index}
                correcttype={
                  usedText.find((t) => t.value === text)?.type ||
                  CorrectType.None
                }
                onClick={() => handleClick(text)}
              >
                {text}
              </Button>
            );
          })}
          <Button correcttype={CorrectType.None} onClick={() => handleSubmit()}>
            Enter
          </Button>
          <Button correcttype={CorrectType.None} onClick={() => handleDelete()}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Controller;
