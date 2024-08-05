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
      selectedColumn: null,
    };
  }

  render() {
    const onEdit = (value) => {
      this.setState({
        selectedColumn: value,
      });
      console.log(value);
    };

    const onSave = () => {
      this.setState({
        data: this.state.data.map((value) => {
          return value.id === this.state.selectedColumn.id
            ? this.state.selectedColumn
            : value;
        }),
        selectedColumn: null,
      });
    };

    const onDelete = (value) => {
      this.setState({
        data: this.state.data.filter((item) => item.id !== value.id),
      });
    };

    const onAdd = (event) => {
      event.preventDefault();
      console.log(event);
    };

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
                <tr key={value.id}>
                  <td>
                    {this.state.selectedColumn &&
                    value.id === this.state.selectedColumn.id ? (
                      <input
                        type="text"
                        defaultValue={this.state.selectedColumn.name}
                        onChange={(e) => {
                          this.setState({
                            selectedColumn: {
                              name: e.target.value,
                              surname: this.state.selectedColumn.surname,
                              age: this.state.selectedColumn.age,
                              id: this.state.selectedColumn.id,
                            },
                          });
                        }}
                      />
                    ) : (
                      value.name
                    )}
                  </td>
                  <td>
                    {this.state.selectedColumn &&
                    value.id === this.state.selectedColumn.id ? (
                      <input
                        type="text"
                        defaultValue={this.state.selectedColumn.surname}
                        onChange={(e) => {
                          this.setState({
                            selectedColumn: {
                              name: this.state.selectedColumn.name,
                              surname: e.target.value,
                              age: this.state.selectedColumn.age,
                              id: this.state.selectedColumn.id,
                            },
                          });
                        }}
                      />
                    ) : (
                      value.surname
                    )}
                  </td>
                  <td>
                    {this.state.selectedColumn &&
                    value.id === this.state.selectedColumn.id ? (
                      <input
                        type="text"
                        defaultValue={this.state.selectedColumn.age}
                        onChange={(e) => {
                          this.setState({
                            selectedColumn: {
                              name: this.state.selectedColumn.name,
                              surname: this.state.selectedColumn.surname,
                              age: e.target.value,
                              id: this.state.selectedColumn.id,
                            },
                          });
                        }}
                      />
                    ) : (
                      value.age
                    )}
                  </td>

                  <td>
                    {this.state.selectedColumn &&
                    value.id === this.state.selectedColumn.id ? (
                      <button onClick={onSave}>Save</button>
                    ) : (
                      <button
                        className="border-2 border-black"
                        onClick={() => {
                          onEdit(value);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="border-2 border-black"
                      onClick={() => {
                        onDelete(value);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <form className="mt-[100px]">
          <input
            className="border-2 border-black"
            type="text"
            placeholder="Name..."
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="Surname..."
          />
          <input
            className="border-2 border-black"
            type="text"
            placeholder="Age..."
          />
          <button
            className="border-2 border-black"
            type="submit"
            onClick={onAdd}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Counter;
