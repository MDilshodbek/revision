import React, { Component } from "react";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: "1",
          name: "A",
          surname: "A",
          age: "A",
        },
        {
          id: "2",
          name: "B",
          surname: "B",
          age: "B",
        },
        {
          id: "3",
          name: "C",
          surname: "C",
          age: "C",
        },
      ],
    };
  }

  render() {
    return (
      <div className="flex items-center justify-center w-[100%] h-[100vh] flex-col">
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((value) => {
              return (
                <tr>
                  <td>{value.name}</td>
                  <td>{value.surname}</td>
                  <td>{value.age}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Counter;
