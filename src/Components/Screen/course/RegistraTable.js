import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import { withRouter, Link } from "react-router-dom";
import { isLoggedIn } from "../../../store/action/auth";

class table extends Component {
  async componentDidMount() {
    await this.props.onGetCourses();
  }

  handleOnclick(id) {
    // if (this.props.isLoggedIn === "REGISTRA") {
    this.props.history.push(`/course/${id}`);
    // } else {
    //   this.props.history.push(`/${id}`)
    // }
  }

  editHandler(id) {
    this.props.history.push(`/course/${id}/update`);
  }

  render() {
    const { data, onUpdateCourse, onDeleteCourse } = this.props;
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        <div class="row">
          <div class="col-md-10">
            <h5 class="hk-sec-title">Course</h5>
            {/* <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p> */}
          </div>
          <div class="col-md-2">
            {this.props.isLoggedIn === "DEAN" && (
              <Link class="btn btn-secondary" to="/course-add">
                add course
              </Link>
            )}
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="table-wrap">
              <div class="table-responsive">
                <table class="table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Course Credit</th>
                      <th>Semester</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => this.handleOnclick(item.id)}
                        >
                          <th scope="row">{item.id}</th>
                          <td>{item.course_name}</td>
                          <td>{item.course_code}</td>
                          <td>{item.course_credits}</td>
                          <td>{item.semester && item.semester.title}</td>
                          {/* <td>
                            <span class="badge badge-danger">
                              {item.role.name.toLowerCase()}
                            </span>
                          </td> */}
                          <td>
                            <EditBtn func={() => this.editHandler(item.id)} />
                            <DeleteBtn func={() => onDeleteCourse(item.id)} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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
    data: state.course.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourses: () => dispatch(actions.getCourses()),
    onUpdateCourse: (data, id) => dispatch(actions.updateCourse(data, id)),
    onDeleteCourse: (id) => dispatch(actions.deleteCourse(id)),
  };
};

// export default
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(table));
// );
