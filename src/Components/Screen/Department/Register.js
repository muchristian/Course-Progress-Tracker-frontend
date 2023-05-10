import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { connect } from "react-redux";
import FormikControl from "../../FormikControl";
import * as actions from "../../../store/action";
import Alert from "../../UI/Alert";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        department_name: "",
      },
      selectedFaculty: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.onGetFaculties();
  }

  async onSubmit(values) {
    const { selectedFaculty } = this.state;
    const data = {
      faculty: selectedFaculty.id,
      ...values,
    };
    await this.props.onRegisterDepartment(data);
  }

  timeOutHandler(func, time) {
    setTimeout(() => {
      func();
    }, time);
  }

  facultyChangeHandler(value) {
    this.setState({ selectedFaculty: value });
  }
  render() {
    const { initialValues, selectedFaculty } = this.state;
    const { data: faculties, error, success, onCloseAlert } = this.props;
    const validationSchema = Yup.object({
      department_name: Yup.string().required("Department name is required"),
    });
    let errElement = null;
    let message = error || success;
    if (message) {
      errElement = <Alert message={message} isError={error ? true : false} />;
      this.timeOutHandler(onCloseAlert, 5000);
    }
    return (
      <section class="hk-sec-wrapper shadow-none border-0 px-0">
        <h5 class="hk-sec-title">Register Department</h5>
        <p class="mb-25"></p>
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
                      <div class="col-md-10 form-group">
                        <div class="row">
                          <div class="col-md-5">
                            <label>Department Name</label>
                            <FormikControl
                              control="input"
                              type="text"
                              name="department_name"
                              placeholder="department name"
                            />
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="Faculty">Faculty</label>
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
                          </div>
                          <div class="col-md-3 d-flex align-items-center">
                            <button class="btn btn-primary" type="submit">
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
    data: state.faculty.data,
    error: state.department.error,
    success: state.department.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterDepartment: (data) => dispatch(actions.registerDepartment(data)),
    onGetFaculties: () => dispatch(actions.getFaculties()),
    onCloseAlert: () => dispatch(actions.closeAlert()),
    onUpdateDepartment: (id, data) =>
      dispatch(actions.updateDepartment(id, data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
