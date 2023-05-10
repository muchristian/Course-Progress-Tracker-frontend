import { Component } from "react";
import TopNavbar from "../widget/TopNavbar";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../store/action";
import EnterUnRollKey from "./EnterUnRollKey";

class Home extends Component {
  state = {
    showUnrollModal: false,
    showId: null,
  };
  async componentDidMount() {
    await this.props.onGetCourses(2);
    if (this.props.isLoggedIn) {
      this.props.history.push("/");
    }
  }

  onOpenUnrollModal(id) {
    this.setState({ showUnrollModal: true, showId: id });
  }
  render() {
    const { showUnrollModal, showId } = this.state;
    const { courses } = this.props;
    return (
      <div class="hk-wrapper hk-vertical-nav">
        <EnterUnRollKey
          show={showUnrollModal}
          close={() => this.hideModal()}
          id={showId}
        />
        <nav class="navbar navbar-expand-xl navbar-light fixed-top hk-navbar d-flex align-items-center">
          <a
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            href="javascript:void(0);"
          >
            <span class="feather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </span>
          </a>
          {/* <a
            id="navbar_toggle_btn"
            class="navbar-toggle-btn nav-link-hover"
            href="javascript:void(0);"
          >
            <span class="feather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </span>
          </a> */}
          <a class="navbar-brand" href="index.html">
            <h4 style={{ fontWeight: 700 }}>
              PROG<span style={{ color: "#009b84" }}>MS</span>
            </h4>
          </a>
          <ul class="navbar-nav hk-navbar-content order-xl-2">
            <li class="nav-item">
              <Link to="/login" class="btn btn-secondary">
                Login
              </Link>
            </li>
          </ul>
        </nav>
        <div
          class="hk-pg-wrapper"
          style={{ minHeight: "215px", marginLeft: 0 }}
        >
          <div class="container-fluid pt-16">
            <div className="row">
              {courses &&
                courses.map((el) => (
                  <div className="col-md-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{el.course_name}</h5>
                        <p class="card-text">Course code: {el.course_code}</p>
                        <p class="card-text" style={{ marginTop: "-1rem" }}>
                          Lecture name: {el.user.firstName} {el.user.lastName}
                        </p>
                        <button
                          class="btn btn-primary"
                          onClick={() => this.onOpenUnrollModal(el.id)}
                        >
                          Go To Course
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.course.homeCourses,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourses: (id) => dispatch(action.getCoursesByStatus(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
