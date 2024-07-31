import React, { Component } from "react";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
    };
  }

  render() {
    return (
      <div>
        <div className="flex items-center justify-center m-auto w-[300px] h-[300px] gap-4">
          <input
            onChange={(event) => {
              this.setState({
                name: event.target.value,
              });
            }}
            type="text"
            placeholder="Input your name..."
            className="border-2 border-black-600 rounded-md"
          />
          <input
            onChange={(event) => {
              this.setState({
                surname: event.target.value,
              });
            }}
            type="text"
            placeholder="Input your surname..."
            className="border-2 border-black-600 rounded-md"
          />
        </div>
        <div className="flex items-center justify-center m-auto w-[300px] h-vh gap-4">
          <h3>Name: {this.state.name}</h3>
          <h3>Surname: {this.state.surname}</h3>
        </div>
      </div>
    );
  }
}

// class Counter extends Component {
//   constructor() {
//     super();
//     this.state = {
//       count: 0,
//     };
//   }

//   render() {
//     const increment = () => {
//       console.log("incremented");
//       this.setState({
//         count: this.state.count + 1,
//       });
//     };

//     const decrement = () => {
//       console.log("decremented");
//       if (this.state.count > 0)
//         this.setState({
//           count: this.state.count - 1,
//         });
//     };

//     return (
//       <div className="flex items-center justify-center m-auto w-[300px] h-[300px] gap-4">
//         <button
//           onClick={increment}
//           className="w-[100px] text-[70px]  bg-green-600 rounded-md text-center"
//         >
//           +
//         </button>
//         <p className="w-[100px] text-[70px] flex items-center text-center justify-center ">
//           {this.state.count}
//         </p>
//         <button
//           onClick={decrement}
//           className="w-[100px] text-[70px] bg-red-600 flex items-center justify-center rounded-md text-center"
//         >
//           -
//         </button>
//       </div>
//     );
//   }
// }

export default Counter;
