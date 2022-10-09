import React, { useCallback } from "react";
import { Grid } from "@mui/material";
import { useRecoilState } from "recoil";

// common
import { focusState } from "../../common/atoms";
import { MatrixProps } from "../../common/types";

// components
import Label from "../elements/Label";

type HorizontalListProps = {
  row: number;
  matrix: MatrixProps[];
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

const HorizontalList: React.FC<HorizontalListProps> = ({
  row,
  matrix,
  onKeyDown,
}) => {
  const [focus, setFocus] = useRecoilState(focusState);

  const isFocused = useCallback(
    (column: number) => {
      return focus.row === row && focus.column === column;
    },
    [focus, row]
  );

  const updateFocus = useCallback(
    (column: number) => {
      if (focus.row === row) setFocus({ row, column });
    },
    [focus, row, setFocus]
  );

  const handleClick = useCallback(
    (column: number) => {
      updateFocus(column);
    },
    [updateFocus]
  );

  return (
    <Grid container spacing={1}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((column) => {
        return (
          <Grid item key={column}>
            <Label
              {...matrix[column]}
              focused={isFocused(column)}
              onClick={() => handleClick(column)}
              onKeyDown={onKeyDown}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HorizontalList;
