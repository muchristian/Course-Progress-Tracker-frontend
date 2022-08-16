import React from "react";

function Alert({ isError, message }) {
  return (
    <div
      class={`alert ${!isError ? "alert-success" : "alert-danger"}`}
      role="alert"
    >
      <div class="iq-alert-text">{message}</div>
    </div>
  );
}

export default Alert;
