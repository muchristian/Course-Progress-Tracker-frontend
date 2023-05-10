import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import { Link } from "react-router-dom";

class table extends Component {
  async componentDidMount() {
    await this.props.onGetUsers();
  }

  editHandler(id) {
    this.props.history.push(`/user/${id}/update`);
  }

  render() {
    const { data, onUpdateUser, onDeleteUser, isLoggedIn } = this.props;
    const excludedRoles = ["CLASS_REPRESENTER", "TEACHER"];
    const customData =
      isLoggedIn === "DEAN" && data
        ? data.filter((el) => el.role.name === "TEACHER")
        : isLoggedIn === "REGISTRA" && data
        ? data.filter((el) => !excludedRoles.includes(el.role.name))
        : data;

    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        <div class="row">
          <div class="col-md-10">
            <h5 class="hk-sec-title">Users</h5>
            {/* <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p> */}
          </div>
          <div class="col-md-2">
            <Link class="btn btn-secondary" to="/user-add">
              add {isLoggedIn === "DEAN" ? "teacher" : "user"}
            </Link>
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
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customData &&
                      customData.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>
                            <span class="badge badge-success">
                              {item.role.name.toLowerCase()}
                            </span>
                          </td>
                          <td>
                            <EditBtn func={() => this.editHandler(item.id)} />
                            <DeleteBtn func={() => onDeleteUser(item.id)} />
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
    data: state.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: () => dispatch(actions.getUsers()),
    onDeleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

// export default withRouter(
export default connect(mapStateToProps, mapDispatchToProps)(table);
// );
