import React, { Component, createRef } from "react";

class NavDropdown extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };

    this.toggleOpen = this.toggleOpen.bind(this);
  }
  componentDidMount() {
    window.addEventListener("click", (e) => {
      this.state.show && this.toggleOpen(e);
    });
  }
  toggleOpen(e) {
    e.stopPropagation();
    this.setState((prevState) => ({ show: !prevState.show }));
  }

  render() {
    const { show } = this.state;
    const { liclasses, classes, comp1, comp2 } = this.props;
    return (
      <li class={`${liclasses} ${show ? "iq-show" : ""}`}>
        <a
          className={`${classes} ${show ? "active" : ""}`}
          onClick={this.toggleOpen}
        >
          {comp1}
        </a>
        {comp2}
      </li>
    );
  }
}

export default NavDropdown;
