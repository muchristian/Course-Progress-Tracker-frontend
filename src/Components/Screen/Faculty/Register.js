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
        faculty_name: "",
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    await this.props.onRegisterFaculty(values);
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
      faculty_name: Yup.string().required("Faculty name is required"),
    });
    let errElement = null;
    let message = error || success;
    if (message) {
      errElement = <Alert message={message} isError={error ? true : false} />;
      this.timeOutHandler(onCloseAlert, 5000);
    }
    return (
      <section class="hk-sec-wrapper shadow-none border-0 px-0">
        <h5 class="hk-sec-title">Register Faculty</h5>
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
                        <label>Faculty Name</label>
                        <div class="row">
                          <div class="col-md-8">
                            <FormikControl
                              control="input"
                              type="text"
                              name="faculty_name"
                              placeholder="faculty name"
                            />
                          </div>
                          <div class="col-md-4">
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
    error: state.faculty.error,
    success: state.faculty.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterFaculty: (data) => dispatch(actions.registerFaculty(data)),
    onCloseAlert: () => dispatch(actions.closeAlert()),
    onUpdateFaculty: (data, id) => dispatch(actions.updateFaculty(data, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
