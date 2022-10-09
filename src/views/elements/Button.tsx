import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

import { getBackgroundColor } from "../../common/functions";
import { CorrectType } from "../../common/types";

interface ButtonProps extends MuiButtonProps {
  correcttype: CorrectType;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { correcttype } = props;

  const style = {
    minWidth: 50,
    minHeight: 50,
    margin: 5,
    alignText: "center",
    color: correcttype === CorrectType.None ? "black" : "white",
    backgroundColor: getBackgroundColor(correcttype, "#e2e8f0"),
  };

  return (
    <MuiButton variant="contained" style={style} {...props}>
      {props.children}
    </MuiButton>
  );
};

export default Button;
