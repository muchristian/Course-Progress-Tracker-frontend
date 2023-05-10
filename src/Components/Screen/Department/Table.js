import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import Register from "./Register";

class table extends Component {
  state = {
    toggle: false,
  };
  async componentDidMount() {
    await this.props.onGetDepartments();
  }

  togglehandler() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { data, onDeleteDepartment } = this.props;
    const { toggle } = this.state;
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        {toggle && <Register />}
        <div class="row">
          <div class="col-sm-8">
            <div class="row">
              <div class="col-md-10">
                <h5 class="hk-sec-title">Departments</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <button
              class="btn btn-secondary"
              onClick={() => this.togglehandler()}
            >
              Add Department
            </button>
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
