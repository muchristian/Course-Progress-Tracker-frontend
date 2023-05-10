import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import Register from "./Register";

class Semester extends Component {
  state = {
    toggle: false,
  };
  async componentDidMount() {
    await this.props.onGetSemesters();
  }

  togglehandler() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { data } = this.props;
    const { toggle } = this.state;
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        {toggle && <Register />}
        <div class="row">
          <div class="col-sm-8">
            <div class="row">
              <div class="col-md-10">
                <h5 class="hk-sec-title">Semester</h5>
                {/* <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p> */}
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <button
              class="btn btn-secondary"
              onClick={() => this.togglehandler()}
            >
              Set Semester
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
                      <th>title</th>
                      <th>startDate</th>
                      <th>endDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((el, index) => (
                        <tr key={index}>
                          <td>{el.title}</td>
                          <td>{el.startDate}</td>
                          <td>{el.endDate}</td>
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
    data: state.course.semesters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSemesters: () => dispatch(actions.getSemesters()),
  };
};

// export default withRouter(
export default connect(mapStateToProps, mapDispatchToProps)(Semester);
// );
