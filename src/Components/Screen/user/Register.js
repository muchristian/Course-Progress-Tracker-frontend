import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { connect } from "react-redux";
import FormikControl from "../../FormikControl";
import * as actions from "../../../store/action";
import Alert from "../../UI/Alert";

class Register extends Component {
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
        selectedFaculty: null,
        selectedDepartment: null,
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.onGetRoles();
    await this.props.onGetFaculties();
    await this.props.onGetDepartments();
  }

  async onSubmit(values) {
    const { selectedRole, selectedDepartment } = this.state;
    const data = {
      role: selectedRole.id,
      department: selectedDepartment
        ? selectedDepartment.department_name
        : null,
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

  facultyChangeHandler(value) {
    this.setState({ selectedFaculty: value });
  }

  departmentChangeHandler(value) {
    this.setState({ selectedDepartment: value });
  }

  render() {
    const { initialValues, selectedRole, selectedFaculty, selectedDepartment } =
      this.state;
    const {
      error,
      success,
      onCloseAlert,
      roles,
      isLoggedIn,
      faculties,
      departments,
    } = this.props;
    const data_department =
      departments &&
      departments.filter(
        (obj) =>
          selectedFaculty &&
          obj.faculty.faculty_name === selectedFaculty.faculty_name
      );
    const teacherArr = ["CLASS_REPRESENTER"];
    const deanArr = ["TEACHER"];
    const registra = ["ADMIN", "CLASS_REPRESENTER", "TEACHER"];
    let custom_role;
    if (roles) {
      const data_role = roles.filter((obj) => !registra.includes(obj.name));
      custom_role =
        isLoggedIn === "DEAN" && data_role
          ? data_role.filter((obj) => deanArr.includes(obj.name))
          : isLoggedIn === "TEACHER"
          ? data_role.filter((obj) => teacherArr.includes(obj.name))
          : data_role;
    }

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
                    <div class="row mb-4">
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
                      {selectedRole && selectedRole.name === "DEAN" && (
                        <>
                          <div class="col-md-4">
                            <label for="faculty">Faculty</label>
                            <Select
                              label="Single select"
                              options={faculties}
                              getOptionLabel={(option) =>
                                `${option.faculty_name}`
                              }
                              getOptionValue={(option) => option.id}
                              value={selectedFaculty}
                              onChange={(selectedOption) =>
                                this.facultyChangeHandler(selectedOption)
                              }
                            />
                          </div>
                          <div class="col-md-4">
                            <label for="Department">Department</label>
                            <Select
                              label="Single select"
                              options={data_department}
                              getOptionLabel={(option) =>
                                `${option.department_name}`
                              }
                              getOptionValue={(option) => option.id}
                              value={selectedDepartment}
                              onChange={(selectedOption) =>
                                this.departmentChangeHandler(selectedOption)
                              }
                            />
                          </div>
                        </>
                      )}
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    roles: state.role.data,
    error: state.user.error,
    success: state.user.success,
    isLoading: state.user.loading,
    faculties: state.faculty.data,
    departments: state.department.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFaculties: () => dispatch(actions.getFaculties()),
    onGetDepartments: () => dispatch(actions.getDepartments()),
    onRegister: (data) => dispatch(actions.registerUser(data)),
    onGetRoles: () => dispatch(actions.getRoles()),
    onCloseAlert: () => dispatch(actions.closeAlert()),
    onUpdateUser: (data, id) => dispatch(actions.updateUser(data, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
