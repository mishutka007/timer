import React from "react";
import MUIbutton from "@mui/material/Button";

function Button(props) {
  return (
    <MUIbutton
      variant={props.variant}
      color={props.color}
      onClick={props.metod}
    >
      {props.text}
    </MUIbutton>
  );
}
export default Button;
