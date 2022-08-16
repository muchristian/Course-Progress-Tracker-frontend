import React from "react";

function EditBtn(props) {
  return (
    <button class="btn btn-icon" onClick={props.func}>
      <i class="ti-pencil"></i>
    </button>
  );
}

export default EditBtn;
