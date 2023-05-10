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
    await this.props.onGetFaculties();
  }

  togglehandler() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { data, onDeleteFaculty } = this.props;
    const { toggle } = this.state;
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        {toggle && <Register />}
        <div class="row">
          <div class="col-sm-8">
            <div class="row">
              <div class="col-md-10">
                <h5 class="hk-sec-title">Faculty</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <button
              class="btn btn-secondary"
              onClick={() => this.togglehandler()}
            >
              Add Faculty
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
                      <th>Faculty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.faculty_name}</td>
                          <td>
                            <EditBtn />
                            <DeleteBtn func={() => onDeleteFaculty(item.id)} />
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
    data: state.faculty.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFaculties: () => dispatch(actions.getFaculties()),
    onDeleteFaculty: (id) => dispatch(actions.deleteFaculty(id)),
  };
};

// export default withRouter(
export default connect(mapStateToProps, mapDispatchToProps)(table);
// );
