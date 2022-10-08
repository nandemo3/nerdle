import React from "react";
import { Box } from "@mui/material";
import TextField from "../elements/TextField";

const Table: React.FC = () => {
  return (
    <Box
      sx={{
        width: 800,
        height: 600,
      }}
    >
      <Box
        sx={{
          width: 800,
          height: 600,
          flexDirection: "row",
        }}
      >
        <TextField />
      </Box>
    </Box>
  );
};

export default Table;
