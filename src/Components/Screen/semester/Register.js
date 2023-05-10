import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
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
        title: "",
        startDate: "",
        endDate: "",
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    await this.props.onRegisterSemester(values);
  }

  timeOutHandler(func, time) {
    setTimeout(() => {
      func();
    }, time);
  }

  render() {
    const { initialValues } = this.state;
    const { error, success, onCloseAlert } = this.props;
    const validationSchema = Yup.object({
      title: Yup.string().required("title is required"),
      startDate: Yup.string().required("Couse start date is required"),
      endDate: Yup.string().required("Couse end date is required"),
    });
    let errElement = null;
    let message = error || success;
    if (message) {
      errElement = (
        <Alert
          message={"Semester registered successfully"}
          isError={error ? true : false}
        />
      );
      this.timeOutHandler(onCloseAlert, 5000);
    }
    return (
      <section class="hk-sec-wrapper shadow-none border-0 px-0">
        <h5 class="hk-sec-title">Register Semester</h5>
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
                        <label>Semester</label>
                        <div class="row">
                          <div class="col-md-6">
                            <FormikControl
                              control="input"
                              type="text"
                              name="title"
                              placeholder="Semester"
                            />
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-md-6 form-group">
                            <FormikControl
                              control="input"
                              type="date"
                              label="Start Date"
                              name="startDate"
                              placeholder=""
                            />
                          </div>
                          <div class="col-md-6 form-group">
                            <FormikControl
                              control="input"
                              type="date"
                              label="End Date"
                              name="endDate"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <button class="btn btn-primary" type="submit">
                          Register
                        </button>
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
    error: state.faculty.error,
    success: state.faculty.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterSemester: (data) => dispatch(actions.registerSemester(data)),
    onCloseAlert: () => dispatch(actions.closeAlert()),
    // onUpdateFaculty: (data, id) => dispatch(actions.updateFaculty(data, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
