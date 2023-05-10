import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";

class table extends Component {
  async componentDidMount() {
    await this.props.onGetCourses();
  }

  render() {
    const { data, onDeleteCourse } = this.props;
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        <h5 class="hk-sec-title">Regular Table</h5>
        <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.course_name}</td>
                          <td>{item.course_code}</td>
                          <td>{item.course_credits}</td>
                          {/* <td>
                            <span class="badge badge-danger">
                              {item.role.name.toLowerCase()}
                            </span>
                          </td> */}
                          <td>
                            <button
                              class="
                                btn
                                btn-icon
                                btn-icon-circle
                                btn-secondary
                                btn-icon-style-3
                              "
                            >
                              <span class="btn-icon-wrap">
                                {/* <i class="fa fa-pencil"></i> */}
                                <p>up</p>
                              </span>
                            </button>
                            <button
                              class="
                                btn
                                btn-icon
                                btn-icon-circle
                                btn-info
                                btn-icon-style-3
                              "
                              onClick={() => onDeleteCourse(item.id)}
                            >
                              <span class="btn-icon-wrap">
                                {/* <i class="icon-trash"></i> */}
                                <p>del</p>
                              </span>
                            </button>
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
    data: state.course.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourses: () => dispatch(actions.getCourses()),
    onDeleteCourse: (id) => dispatch(actions.deleteCourse(id)),
  };
};

// export default withRouter(
export default connect(mapStateToProps, mapDispatchToProps)(table);
// );
