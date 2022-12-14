import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import Register from "./Register";

class table extends Component {
  state = {
    toggle: false
  }
  async componentDidMount() {
    await this.props.onGetDepartments();
  }

  togglehandler() {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    const { data, onDeleteDepartment } = this.props;
    const {toggle} = this.state;
    console.log(data);
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        {toggle && <Register/>}
        <div class="row">
          <div class="col-sm-8">
          <div class="row">
          <div class="col-md-10">
        <h5 class="hk-sec-title">Departments</h5>
        {/* <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p> */}

        </div>
        </div>
          </div>
          <div class="col-sm-4">
            <button class="btn btn-secondary" onClick={() => this.togglehandler()}>Add Department</button>
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
                      <th>Department</th>
                      <th>Faculty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.department_name}</td>
                          <td>{item.faculty.faculty_name}</td>
                          {/* <td>
                            <span class="badge badge-danger">
                              {item.role.name.toLowerCase()}
                            </span>
                          </td> */}
                          <td>
                            <EditBtn />
                            <DeleteBtn
                              func={() => onDeleteDepartment(item.id)}
                            />
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
    data: state.department.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDepartments: () => dispatch(actions.getDepartments()),
    onDeleteDepartment: (id) => dispatch(actions.deleteDepartment(id)),
  };
};

// export default withRouter(
export default connect(mapStateToProps, mapDispatchToProps)(table);
// );
