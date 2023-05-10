import React, { Fragment } from "react";
import { Field, ErrorMessage, getIn } from "formik";
import TextError from "./TextError";

// function getStyles(errors, fieldName) {
//     if (getIn(errors, fieldName)) {
//       return {
//         border: '1px solid red'
//       }
//     }
//   }
// function CustomInput({ field, form: { errors } }) {

//   return <div>
//     <input {...field} style={getStyles(errors, field.name)} />
//     <ErrorMessage name={field.name} />
//   </div>
// }

function Input(props) {
  const { name, label, ...rest } = props;
  return (
    <Fragment>
      {label && <label for={`${name}`}>{label}</label>}
      <Field
        component="input"
        name={name}
        className={"form-control mb-0"}
        {...rest}
      />
      {rest.type !== "file" ? (
        <ErrorMessage component={TextError} name={name} />
      ) : null}
    </Fragment>
  );
}

export default Input;
