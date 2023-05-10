import React from "react";

function TextError(props) {
  return <div className="invalid-feedback d-block mt-1">{props.children}</div>;
}

export default TextError;
