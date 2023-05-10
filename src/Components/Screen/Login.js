import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../store/action";
import FormikControl from "../FormikControl";
import Alert from "../UI/Alert";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        email: "",
        password: "",
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/");
    }
  }

  async onSubmit(values) {
    await this.props.onLogin({
      email: values.email,
      password: values.password,
    });
    if (this.props.isLoggedIn) {
      setTimeout(() => {
        this.props.history.push("/");
      }, 1500);
    }
  }

  timeOutHandler(func, time) {
    setTimeout(() => {
      func();
    }, time);
  }

  render() {
    const { initialValues } = this.state;
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
    let errElement = null;
    if (this.props.error) {
      errElement = (
        <Alert
          message={this.props.error}
          isError={this.props.error ? true : false}
        />
      );
      this.timeOutHandler(this.props.onCloseAlert, 5000);
    }
    return (
      <div class="hk-wrapper">
        <div class="hk-pg-wrapper" style={{ minHeight: "155px" }}>
          <div class="container-fluid">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
            >
              {(formik, formProps, isSubmitting) => {
                return (
                  <div class="row">
                    <div class="col-xl-12 pa-0">
                      <div class="auth-form-wrap pt-xl-0 pt-56">
                        <div
                          class="
                    auth-form
                    w-xl-35 w-lg-65 w-sm-85 w-100
                    card
                    pa-24
                    shadow-lg
                    mr-auto
                    ml-auto
                  "
                        >
                          {errElement}
                          <Form class="mt-4">
                            <h1 class="display-4 text-center mb-10">Login</h1>
                            <p class="text-center mb-30"></p>
                            <div class="form-group">
                              <FormikControl
                                control="input"
                                type="email"
                                label="Email"
                                name="email"
                                placeholder="Email"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Password
                              </label>
                              <a href="#" class="float-right">
                                Forgot password?
                              </a>
                              <FormikControl
                                control="input"
                                type="password"
                                name="password"
                                placeholder="Password"
                              />
                            </div>
                            <div class="d-inline-block w-100">
                              <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Remember Me
                                </label>
                              </div>
                              <button
                                type="submit"
                                class="btn btn-primary float-right"
                                disabled={!formik.isValid}
                              >
                                Sign in
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    isLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (data) => dispatch(actions.login(data)),
    onCloseAlert: () => dispatch(actions.closeAlert()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
