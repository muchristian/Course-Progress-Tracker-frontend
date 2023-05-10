import React, { Component } from "react";
import axios from "axios";

class Todo extends Component {
  state = {
    data: null,
  };
  async componentDidMount() {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    this.setState(result);
  }
  render() {
    return (
      <div>
        {this.state.data.data.map((dt) => (
          <div>
            <p>{dt.userId}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Todo;
