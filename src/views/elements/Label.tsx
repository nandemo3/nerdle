import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

import { getBackgroundColor } from "../../common/functions";
import { CorrectType, MatrixProps } from "../../common/types";

type StyledProps = {
  type: CorrectType;
  focused?: boolean;
};

interface LabelProps extends MatrixProps {
  focused: boolean;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const StyledDiv = styled("div")<StyledProps>(({ type, focused }) => ({
  width: 50,
  height: 50,
  margin: 2,
  border: "solid",
  borderWidth: 3,
  borderColor: focused ? "black" : "white",
  borderRadius: 7,
  fontWeight: 2,
  color: "white",
  backgroundColor: getBackgroundColor(type, "gray"),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:focus": {
    outline: "none",
  },
}));

const Label: React.FC<LabelProps> = ({
  value,
  type,
  focused,
  onClick,
  onKeyDown,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focused) {
      ref.current?.focus();
    }
  }, [focused]);

  return (
    <StyledDiv
      ref={ref}
      type={type}
      focused={focused}
      onClick={onClick}
      onKeyDown={(event) => onKeyDown(event)}
      tabIndex={0}
    >
      {value}
    </StyledDiv>
  );
};

export default Label;
