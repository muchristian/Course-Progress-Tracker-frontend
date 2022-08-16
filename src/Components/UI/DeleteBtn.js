import React from "react";

function DeleteBtn({ func }) {
  return (
    <button class="btn btn-icon" onClick={func}>
      <i class="ti-trash"></i>
    </button>
  );
}

export default DeleteBtn;
