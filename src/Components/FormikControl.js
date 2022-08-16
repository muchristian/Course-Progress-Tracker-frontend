import React from "react";
import Input from "./UI/Input";
// import Select from './UI/Select';
// import TextArea from './UI/TextArea';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    //   case 'select':
    //     return <Select {...rest} />
    //   case 'textarea':
    //     return <TextArea {...rest}/>
    default:
      return null;
  }
}

export default FormikControl;
