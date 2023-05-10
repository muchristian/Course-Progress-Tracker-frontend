import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { connect } from "react-redux";
import FormikControl from "../../FormikControl";
import * as actions from "../../../store/action";
import Alert from "../../UI/Alert";

class RegClassRepresenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
        selectedRole: "",
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {}

  async onSubmit(values) {
    const { selectedRole } = this.state;
    const data = {
      role: selectedRole.id,
      ...values,
    };
    await this.props.onRegister(data);
  }

  timeOutHandler(func, time) {
    setTimeout(() => {
      func();
    }, time);
  }

  roleChangeHandler(value) {
    this.setState({ selectedRole: value });
  }

  render() {
    const { initialValues, selectedRole } = this.state;
    const { error, success, onCloseAlert, roles, isLoggedIn } = this.props;
    const teacherArr = ["CLASS_REPRESENTER"];
    const deanArr = ["TEACHER"];
    const registra = ["DEAN"];
    const data_role =
      roles && roles.filter((obj) => !registra.includes(obj.name));
    const custom_role =
      isLoggedIn === "DEAN" && data_role
        ? data_role.filter((obj) => deanArr.includes(obj.name))
        : isLoggedIn === "TEACHER"
        ? data_role.filter((obj) => teacherArr.includes(obj.name))
        : data_role;
    const validationSchema = Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Password is required"),
      password: Yup.string().required("Password is required"),
    });
    let errElement = null;
    let message = error || success;
    if (message) {
      errElement = <Alert message={message} isError={error ? true : false} />;
      this.timeOutHandler(onCloseAlert, 5000);
    }
    return (
      <section class="hk-sec-wrapper shadow-none border-0">
        <h5 class="hk-sec-title mb-24">Register User</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        >
          {(formik, formProps, isSubmitting) => {
            return (
              <div class="row">
                <div class="col-sm">
                  {errElement}
                  <Form>
                    <div class="row">
                      <div class="col-md-4 form-group">
                        <FormikControl
                          control="input"
                          type="text"
                          label="First Name"
                          name="firstName"
                          placeholder="first name"
                        />
                      </div>
                      <div class="col-md-4 form-group">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Last Name"
                          name="lastName"
                          placeholder="last name"
                        />
                      </div>
                      <div class="col-md-4 form-group">
                        <FormikControl
                          control="input"
                          type="email"
                          label="Email"
                          name="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Phone"
                          name="phoneNumber"
                          placeholder="phone"
                        />
                      </div>
                      <div class="col-md-6 form-group">
                        <FormikControl
                          control="input"
                          type="password"
                          label="Password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4 form-group">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Address"
                          name="address"
                          placeholder="address"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="role">Role</label>
                        <Select
                          label="Single select"
                          options={custom_role}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.name}
                          value={selectedRole}
                          onChange={(selectedOption) =>
                            this.roleChangeHandler(selectedOption)
                          }
                        />
                      </div>
                    </div>
                    <button
                      class="btn btn-primary"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Register User
                    </button>
                  </Form>
                </div>
              </div>
            );
          }}
        </Formik>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (data) => dispatch(actions.registerUser(data)),
    onCloseAlert: () => dispatch(actions.closeAlert()),
    onUpdateUser: (data, id) => dispatch(actions.updateUser(data, id)),
  };
};

export default connect(null, mapDispatchToProps)(RegClassRepresenter);
