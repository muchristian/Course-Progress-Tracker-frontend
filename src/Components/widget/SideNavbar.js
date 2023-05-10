import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/action";
import { isLoggedIn } from "../../store/action/auth";

function SideNavbar(props) {
  const { onLogout, isLoggedIn, match } = props;
  return (
    <>
      <nav class="hk-nav hk-nav-light">
        <a href="javascript:void(0);" id="hk_nav_close" class="hk-nav-close">
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
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        </a>
        <div class="navbar-nav-wrap">
          <div class="nav-header">
            <span>Getting Started</span>
            <span>GS</span>
          </div>
          <ul class="navbar-nav flex-column">
            {isLoggedIn === "ADMIN" ? (
              <>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/">
                    <i class="ti-angle-double-right"></i>
                    <span class="nav-link-text">Users</span>
                  </Link>
                </li>
              </>
            ) : isLoggedIn === "REGISTRA" ? (
              <>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/">
                    <i class="ti-angle-double-right"></i>
                    <span class="nav-link-text">Users</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/faculties">
                    <i class="ti-angle-double-right"></i>
                    <span class="nav-link-text">Faculty</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/departments">
                    <i class="ti-angle-double-right"></i>
                    <span class="nav-link-text">Department</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/courses">
                    <i class="fa fa-files-o"></i>
                    <span class="nav-link-text">Courses</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/semester">
                    <i class="fa fa-files-o"></i>
                    <span class="nav-link-text">Semester</span>
                  </Link>
                </li>
              </>
            ) : isLoggedIn === "DEAN" ? (
              <>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/">
                    <i class="ti-angle-double-right"></i>
                    <span class="nav-link-text">Dashboard</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/teachers">
                    <i class="ti-angle-double-right"></i>
                    <span class="nav-link-text">Teachers</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/courses">
                    <i class="fa fa-files-o"></i>
                    <span class="nav-link-text">Courses</span>
                  </Link>
                </li>
              </>
            ) : isLoggedIn === "TEACHER" ? (
              <>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/">
                    <i class="fa fa-files-o"></i>
                    <span class="nav-link-text">Courses</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link link-with-badge" to="/user-add">
                    <i class="fa fa-files-o"></i>
                    <span class="nav-link-text">add user</span>
                  </Link>
                </li>
              </>
            ) : (
              <li class="nav-item">
                <Link class="nav-link link-with-badge" to="/">
                  <i class="fa fa-files-o"></i>
                  <span class="nav-link-text">Courses</span>
                </Link>
              </li>
            )}
            <li class="nav-item">
              <a
                class="nav-link link-with-badge"
                href="javascript:void(0);"
                onClick={() => onLogout()}
              >
                <i class="ti-user"></i>
                <span class="nav-link-text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNavbar);
