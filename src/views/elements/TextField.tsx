import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const style = {
  width: 50,
  height: 50,
  marginLeft: 4,
  marginRight: 4,
  alignText: "center",
};

const TextField: React.FC = () => {
  return (
    <MuiTextField
      id="outlined-basic"
      style={style}
      inputProps={{
        maxLength: 1,
      }}
    />
  );
};

export default TextField;
