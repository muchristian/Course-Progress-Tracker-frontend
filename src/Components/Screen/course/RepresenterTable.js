import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import {withRouter, Link} from "react-router-dom";

class table extends Component {
  async componentDidMount() {
    await this.props.onGetCoursesById(this.props.user.id);
  }

  handleOnclick(id) {
      this.props.history.push(`/course-detail/${id}`)
  }

  handleUpdateCourse(id) {
    this.props.history.push(`/course/${id}/update`)
  }

  handleDeleteCourse(id) {
    this.props.onDeleteCourse(id)
  }

  render() {
    const { data } = this.props;
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        <div class="row">
          <div class="col-md-10">
        <h5 class="hk-sec-title">Course</h5>
        {/* <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p> */}

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
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr key={item.id}>
                          <th onClick={() => this.handleOnclick(item.id)} scope="row">{item.id}</th>
                          <td onClick={() => this.handleOnclick(item.id)}>{item.course_name}</td>
                          <td onClick={() => this.handleOnclick(item.id)}>{item.course_code}</td>
                          <td onClick={() => this.handleOnclick(item.id)}>{item.course_credits}</td>
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
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCoursesById: (id) => dispatch(actions.getCoursesByRId(id)),
    onUpdateCourse: (id, data) => dispatch(actions.updateCourse(id, data)),
    onDeleteCourse: (id) => dispatch(actions.deleteCourse(id))
  };
};

// export default 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(table));
// );
