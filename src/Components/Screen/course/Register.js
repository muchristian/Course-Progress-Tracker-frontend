import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { connect } from "react-redux";
import FormikControl from "../../FormikControl";
import * as actions from "../../../store/action";
import Alert from "../../UI/Alert";
import _ from "lodash";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        course_name: "",
        course_code: "",
        course_credits: "",
        startDate: localStorage.getItem("startDate"),
        endDate: localStorage.getItem("endDate"),
        enroll_key: "",
      },
      selectedTeacher: null,
      selectedFaculty: null,
      selectedDepartment: null,
      selectedStatus: null,
      selectedRepresenter: null,
      course: null,
      selectedSemester: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  async componentDidMount() {
    const { match } = this.props;
    await this.props.onGetFaculties();
    await this.props.onGetDepartments();
    await this.props.onGetUsers();
    await this.props.onGetCourse(match.params.id);
    await this.props.onGetCourseStatuses();
    await this.props.onGetSemesters();
  }

  async onSubmit(values) {
    const { match } = this.props;
    const {
      selectedTeacher,
      selectedFaculty,
      selectedDepartment,
      selectedStatus,
      selectedRepresenter,
      selectedSemester,
    } = this.state;
    const classR = !selectedRepresenter ? null : selectedRepresenter;
    if (match.path.split("/")[match.path.split("/").length - 1] === "update") {
      const upd = {
        user: this.props.user.id,
        faculty: selectedFaculty.id,
        department: selectedDepartment.id,
        semester: selectedSemester.id,
        status: selectedStatus.id,
        class_representer_id: classR.id,
        class_representer_name: `${classR.firstName} ${classR.lastName}`,
        ...values,
      };
      await this.props.onUpdateCourse(match.params.id, upd);
      this.props.history.goBack();
    } else {
      const reg = {
        user: selectedTeacher.id,
        faculty: selectedFaculty.id,
        department: selectedDepartment.id,
        semester: selectedSemester.id,
        ...values,
        enroll_key: "0",
      };
      await this.props.onRegisterCourse(reg);
    }
  }

  timeOutHandler(func, time) {
    setTimeout(() => {
      func();
    }, time);
  }

  teacherChangeHandler(value) {
    this.setState({ selectedTeacher: value });
  }

  representerChangeHandler(value) {
    this.setState({ selectedRepresenter: value });
  }

  facultyChangeHandler(value) {
    this.setState({ selectedFaculty: value });
  }

  departmentChangeHandler(value) {
    this.setState({ selectedDepartment: value });
  }

  semesterChangeHandler(value) {
    this.setState({ selectedSemester: value });
  }

  statusChangeHandler(value) {
    this.setState({ selectedStatus: value });
  }

  render() {
    const {
      initialValues,
      selectedTeacher,
      selectedFaculty,
      selectedDepartment,
      selectedStatus,
      selectedRepresenter,
      selectedSemester,
    } = this.state;
    const {
      error,
      success,
      onCloseAlert,
      users,
      faculties,
      departments,
      a_course,
      match,
      statuses,
      isLoggedIn,
      semesters,
    } = this.props;
    let data_department;
    if (match.path.split("/")[match.path.split("/").length - 1] === "update") {
      data_department =
        departments &&
        a_course &&
        departments.filter(
          (obj) =>
            a_course[0].faculty &&
            obj.faculty.faculty_name === a_course[0].faculty.faculty_name
        );
    } else {
      data_department =
        departments &&
        departments.filter(
          (obj) =>
            selectedFaculty &&
            obj.faculty.faculty_name === selectedFaculty.faculty_name
        );
    }
    const data_user_teachers =
      users && users.filter((obj) => obj.role.name === "TEACHER");
    const data_user_representers =
      users && users.filter((obj) => obj.role.name === "CLASS_REPRESENTER");
    const validationSchema = Yup.object({
      course_name: Yup.string().required("Couse name is required"),
      course_code: Yup.string().required("Couse code is required"),
      course_credits: Yup.string().required("Couse credit is required"),
    });
    let errElement = null;
    let message = error || success;
    if (message) {
      errElement = <Alert message={message} isError={error ? true : false} />;
      this.timeOutHandler(onCloseAlert, 5000);
    }
    return (
      <section class="hk-sec-wrapper shadow-none border-0">
        {match.path.split("/")[match.path.split("/").length - 1] ===
        "update" ? (
          <>
            <h5 class="hk-sec-title mb-24">Update Course</h5>
            {a_course && (
              <Formik
                initialValues={
                  a_course
                    ? {
                        ...initialValues,
                        ..._.pick(a_course[0], [
                          "course_name",
                          "course_code",
                          "course_credits",
                          "enroll_key",
                        ]),
                      }
                    : initialValues
                }
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
                                label="Course Name"
                                name="course_name"
                                placeholder="course name"
                              />
                            </div>
                            <div class="col-md-4 form-group">
                              <FormikControl
                                control="input"
                                type="text"
                                label="Course Code"
                                name="course_code"
                                placeholder="course code"
                              />
                            </div>
                            <div class="col-md-4 form-group">
                              <FormikControl
                                control="input"
                                type="text"
                                label="Course Credit"
                                name="course_credits"
                                placeholder="course credit"
                              />
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-4 mb-16">
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
                            <div class="col-md-4 mb-16">
                              <div class="form-group">
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
                            </div>
                            <div class="col-md-4 mb-16">
                              <div class="form-group">
                                <label for="Semester">Semester</label>
                                <Select
                                  label="Single select"
                                  options={semesters}
                                  getOptionLabel={(option) => `${option.title}`}
                                  getOptionValue={(option) => option.id}
                                  value={selectedSemester}
                                  onChange={(selectedOption) =>
                                    this.semesterChangeHandler(selectedOption)
                                  }
                                />
                              </div>
                            </div>
                            {isLoggedIn !== "TEACHER" && (
                              <div class="col-md-4 mb-16">
                                <div class="form-group">
                                  <label for="Teacher">
                                    Assigned To Teacher
                                  </label>
                                  <Select
                                    label="Single select"
                                    options={data_user_teachers}
                                    getOptionLabel={(option) =>
                                      `${option.firstName} ${option.lastName}`
                                    }
                                    getOptionValue={(option) => option.id}
                                    value={selectedTeacher}
                                    onChange={(selectedOption) =>
                                      this.teacherChangeHandler(selectedOption)
                                    }
                                  />
                                </div>
                              </div>
                            )}
                            <div class="col-md-4 mb-16">
                              <div class="form-group">
                                <label for="Teacher">
                                  Assign To Class representer
                                </label>
                                <Select
                                  label="Single select"
                                  options={data_user_representers}
                                  getOptionLabel={(option) =>
                                    `${option.firstName} ${option.lastName}`
                                  }
                                  getOptionValue={(option) => option.id}
                                  value={selectedRepresenter}
                                  onChange={(selectedOption) =>
                                    this.representerChangeHandler(
                                      selectedOption
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div class="col-md-4 mb-16">
                              <div class="form-group">
                                <label for="Teacher">Status</label>
                                <Select
                                  label="Single select"
                                  options={statuses}
                                  getOptionLabel={(option) => `${option.name}`}
                                  getOptionValue={(option) => option.id}
                                  value={selectedStatus}
                                  onChange={(selectedOption) =>
                                    this.statusChangeHandler(selectedOption)
                                  }
                                />
                              </div>
                            </div>
                            <div class="col-md-4 form-group">
                              <FormikControl
                                control="input"
                                type="text"
                                label="Unrollment key"
                                name="enroll_key"
                                placeholder="ITC203..."
                              />
                            </div>
                          </div>
                          <button class="btn btn-primary" type="submit">
                            Update
                          </button>
                        </Form>
                      </div>
                    </div>
                  );
                }}
              </Formik>
            )}
          </>
        ) : (
          <>
            <h5 class="hk-sec-title mb-24">Register Course</h5>
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
                              label="Course Name"
                              name="course_name"
                              placeholder="course name"
                            />
                          </div>
                          <div class="col-md-4 form-group">
                            <FormikControl
                              control="input"
                              type="text"
                              label="Course Code"
                              name="course_code"
                              placeholder="course code"
                            />
                          </div>
                          <div class="col-md-4 form-group">
                            <FormikControl
                              control="input"
                              type="text"
                              label="Course Credit"
                              name="course_credits"
                              placeholder="course credit"
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4 mb-16">
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
                          <div class="col-md-4 mb-16">
                            <div class="form-group">
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
                          </div>
                          <div class="col-md-4 mb-16">
                            <div class="form-group">
                              <label for="Semester">Semester</label>
                              <Select
                                label="Single select"
                                options={semesters}
                                getOptionLabel={(option) => `${option.title}`}
                                getOptionValue={(option) => option.id}
                                value={selectedSemester}
                                onChange={(selectedOption) =>
                                  this.semesterChangeHandler(selectedOption)
                                }
                              />
                            </div>
                          </div>
                          <div class="col-md-4 mb-16">
                            <div class="form-group">
                              <label for="Teacher">Assign To Teacher</label>
                              <Select
                                label="Single select"
                                options={data_user_teachers}
                                getOptionLabel={(option) =>
                                  `${option.firstName} ${option.lastName}`
                                }
                                getOptionValue={(option) => option.id}
                                value={selectedTeacher}
                                onChange={(selectedOption) =>
                                  this.teacherChangeHandler(selectedOption)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <button class="btn btn-primary" type="submit">
                          Register
                        </button>
                      </Form>
                    </div>
                  </div>
                );
              }}
            </Formik>
          </>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    users: state.user.data,
    faculties: state.faculty.data,
    departments: state.department.data,
    error: state.course.error,
    success: state.course.success,
    a_course: state.course.course,
    statuses: state.course.statuses,
    semesters: state.course.semesters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourseStatuses: () => dispatch(actions.getStatuses()),
    onRemoveCourse: () => dispatch(actions.ariseCourseState()),
    onGetCourse: (id) => dispatch(actions.getCourse(id)),
    onGetFaculties: () => dispatch(actions.getFaculties()),
    onGetDepartments: () => dispatch(actions.getDepartments()),
    onGetUsers: () => dispatch(actions.getUsers()),
    onUpdateCourse: (id, data) => dispatch(actions.updateCourse(id, data)),
    onRegisterCourse: (data) => dispatch(actions.registerCourse(data)),
    onCloseAlert: () => dispatch(actions.closeAlert()),
    onGetSemesters: () => dispatch(actions.getSemesters()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
