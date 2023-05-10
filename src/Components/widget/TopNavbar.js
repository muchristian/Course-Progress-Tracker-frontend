import React, { useState } from "react";
import * as actions from "../../store/action";
import { connect } from "react-redux";
import NavDropdown from "../UI/NavDropdown";
import { Link } from "react-router-dom";

function TopNavbar({ isOpen, toggleSBHandler, user }) {
  return (
    <nav class="navbar navbar-expand-xl navbar-light fixed-top hk-navbar">
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
      <a
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
      </a>
      <a class="navbar-brand" href="index.html">
        <h4 style={{ fontWeight: 700 }}>
          P<span style={{ color: "#009b84" }}>MS</span>
        </h4>
      </a>
      <ul class="navbar-nav hk-navbar-content order-xl-2">
        <li class="nav-item">
          <div class="media pa-8 border-0 align-items-center">
            <div class="avatar avatar-sm mr-8">
              <span class="avatar-text avatar-secondary-color rounded-circle">
                <span class="initial-wrap">
                  <span>SC</span>
                </span>
              </span>
            </div>
            <div class="media-body">
              <h6 class="mb-0">
                {user.firstName} {user.lastName}
              </h6>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.SB.isOpen,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSBHandler: () => dispatch(actions.toggleSB()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);
