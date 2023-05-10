import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import FormikControl from "../../FormikControl";
import * as actions from "../../../store/action";
import Alert from "../../UI/Alert";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        username: "",
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
    await this.props.onSignup(values);
    if (!this.props.isLoading) {
      setTimeout(() => {
        this.props.history.push("/login");
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
      username: Yup.string().required("Name is required"),
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
      <section class="hk-sec-wrapper shadow-none border-0">
        <h5 class="hk-sec-title">Default Layout</h5>
        <p class="mb-25">
          More complex forms can be built using the grid classes. Use these for
          form layouts that require multiple columns, varied widths, and
          additional alignment options.
        </p>
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
                      <div class="col-md-8 form-group">
                        <FormikControl
                          control="input"
                          type="text"
                          label="name"
                          name="Role Name"
                          placeholder="role name"
                        />
                      </div>
                      <div class="col-md-4">
                        <button class="btn btn-primary" type="submit">
                          Continue to checkout
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
    isLoggedIn: state.auth.isLoggedIn,
    error: state.reg.error,
    isLoading: state.reg.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (data) => dispatch(actions.signup(data)),
    onCloseAlert: () => dispatch(actions.closeAlert()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
