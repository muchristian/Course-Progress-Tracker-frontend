import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/action";
import EditBtn from "../../UI/EditBtn";
import DeleteBtn from "../../UI/DeleteBtn";
import {withRouter, Link} from "react-router-dom";

function currentDate() {
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
const year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

const today = year + "-" + month + "-" + day;
return today;
}

class table extends Component {
    state = {
        currDate: currentDate()
    }
  async componentDidMount() {
    await this.props.onGetAttendances();
  }

  render() {
    const { data } = this.props;
    const {currDate} = this.state;
    return (
      <section class="hk-sec-wrapper border-0 shadow-none">
        <div class="row mb-24">
          <div class="col-md-10">
        <h5 class="hk-sec-title">Attendance Report</h5>
        {/* <p class="mb-40">
          Add class <code>.table</code> in table tag.
        </p> */}

        </div>
        <div class="col-md-2">
            <input type="date" value={currDate}/>
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
                      <th>Attendance</th>
                      <th>Teacher</th>
                      <th>date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td><i class={item.isPresent === 1 ? `ti-check` : `ti-minus`}></i></td>
                          <td>{item.user.firstName} {item.user.lastName}</td>
                          <td>{item.currDate}</td>
                          {/* <td>
                            <span class="badge badge-danger">
                              {item.role.name.toLowerCase()}
                            </span>
                          </td> */}
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
    data: state.attendance.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAttendances: () => dispatch(actions.getAttendances()),
  };
};

// export default 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(table));
// );
