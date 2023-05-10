import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import { withRouter, Link } from "react-router-dom";
import Pagination from "../../UI/Pagination";
import { paginate } from "../../../Utils/paginate";
import Select from "react-select";
import Semester from "../semester/Table";
import { CSVLink } from "react-csv";

class table extends Component {
  state = {
    pageSize: 6,
    currPage: 1,
    selectedFilter: { name: "All", date: null },
  };
  async componentDidMount() {
    // await this.props.onGetCoursesById(this.props.user.id);
    await this.props.onGetCourses();
    await this.props.onGetCoursesReport({
      name: this.props.user.department,
      id: this.props.user.department_id,
    });
  }

  handleOnclick(id) {
    this.props.history.push(`/course-detail/${id}`);
  }

  handleUpdateCourse(id) {
    this.props.history.push(`/course/${id}/update`);
  }

  handleDeleteCourse(id) {
    this.props.onDeleteCourse(id);
  }

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  getSpecificCourse(id) {
    const { courses } = this.props;
    const dd = courses.filter((el) => el.id === id);
    return dd;
  }

  filterChangeHandler(value) {
    this.setState({ selectedFilter: value });
  }

  render() {
    const { selectedFilter } = this.state;
    const { data, user, courses } = this.props;
    const header =
      data.length > 0 &&
      Object.keys(data[0]).map((el) => ({ label: el, key: el }));
    const currDate = new Date();
    const weeklyDate = new Date();
    const monthlyDate = new Date();
    weeklyDate.setDate(weeklyDate.getDate() - 7);
    monthlyDate.setDate(monthlyDate.getDate() - 30);

    const filterOptions = [
      { name: "All", date: null },
      { name: "Daily", date: currDate },
      { name: "Weekly", date: weeklyDate },
      { name: "Monthly", date: monthlyDate },
    ];
    const courseData = (id) => {
      return courses.find((el) => el.id === id);
    };
    const dateFilter =
      data && selectedFilter.name !== "All"
        ? data.filter((d) => {
            if (selectedFilter.name == "Daily") {
              const created_at = new Date(d.created_at);
              return created_at.getDate() == selectedFilter.date.getDate();
            } else {
              const created_at = new Date(d.created_at);
              return (
                created_at.getDate() > selectedFilter.date.getDate() &&
                created_at.getDate() < currDate.getDate()
              );
            }
          })
        : data;
    const paginatedData = paginate(
      dateFilter,
      this.state.currPage,
      this.state.pageSize
    );
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        <div class="row">
          <div class="col-md-10">
            <h5 class="hk-sec-title">Course Report</h5>
            {/* <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p> */}
          </div>
        </div>
        <div class="row mt-4">
          <div className="col-sm-12 row mb-3 d-flex justify-content-end rounded">
            <div>
              {data && (
                <CSVLink
                  data={data}
                  headers={header}
                  className="btn btn-secondary"
                >
                  export report
                </CSVLink>
              )}
            </div>
            <div className="col-sm-4">
              <Select
                label="Single select"
                options={filterOptions}
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => option.name}
                value={selectedFilter}
                onChange={(selectedOption) =>
                  this.filterChangeHandler(selectedOption)
                }
              />
            </div>
          </div>
          <div class="col-sm-12">
            <div class="table-wrap">
              <div class="table-responsive">
                <table class="table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Lecture Name</th>
                      <th>Session Name</th>
                      <th>Session Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData &&
                      paginatedData.map((item, index) => (
                        <>
                          <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td
                            // onClick={() => this.handleOnclick(item.id)}
                            >
                              {item.course_name}
                            </td>
                            <td
                            // onClick={() => this.handleOnclick(item.id)}
                            >
                              {item.course_code}
                            </td>
                            <td
                            // onClick={() => this.handleOnclick(item.id)}
                            >
                              {courseData(item.course).user.firstName +
                                " " +
                                courseData(item.course).user.lastName}
                            </td>
                            <td
                            //  onClick={() => this.handleOnclick(item.id)}
                            >
                              {item.title}
                            </td>
                            <td
                            // onClick={() => this.handleOnclick(item.id)}
                            >
                              {item.isFinished ? "completed" : "not done"}
                            </td>
                          </tr>
                          {/* )} */}
                        </>
                        // );
                      ))}
                  </tbody>
                </table>
                <div className="d-flex align-items-center">
                  <h5 className="mb-0 mt-1 mr-3">
                    {paginatedData.length} Total
                  </h5>
                  <Pagination
                    total={data.length}
                    pageSize={this.state.pageSize}
                    currPage={this.state.currPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              </div>
              {/* <div class="row mt-16">
                <div class="col-sm">
                  <nav
                    class="pagination-wrap justify-content-end"
                    aria-label="Page navigation example"
                  >
                    <ul
                      class="
                            pagination
                            custom-pagination
                            pagination-rounded
                            mb-0
                          "
                    >
                      <li class="page-item">
                        <a class="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li class="page-item active">
                        <a class="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          ...
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          15
                        </a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    data: state.course.coursesReport,
    courses: state.course.data,
    user: state.auth.user,
    departments: state.department.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourses: () => dispatch(actions.getCourses()),
    onGetDepartments: () => dispatch(actions.getDepartments()),
    onGetCoursesReport: (data) => dispatch(actions.getCourseReport(data)),
    onGetCoursesById: (id) => dispatch(actions.getCoursesById(id)),
    onUpdateCourse: (id, data) => dispatch(actions.updateCourse(id, data)),
    onDeleteCourse: (id) => dispatch(actions.deleteCourse(id)),
  };
};

// export default
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(table));
// );
