import { useEffect, useReducer } from "react";

const action = (state, { type, payload }) => {
  switch (type) {
    case "DATA_CHANGE":
      return { ...state, data: payload.data };
    case "DELETE":
      return {
        ...state,
        data: state.data.filter(({ id }) => id !== payload.id),
      };
    case "Change":
      return { ...state, value: payload.value };
    default:
      return state;
  }
  // if (reducer.type === "Increment") {
  //   return { ...state, count: state.count + 1 };
  // }

  // if (reducer.type === "Decrement" && state.count > 0) {
  //   return { ...state, count: state.count - 1 };
  // }

  // if (reducer.type === "Change") {
  //   return { ...state, value: reducer.payload.value };
  // }
  // return state;
};

function App() {
  const [state, dispatch] = useReducer(action, {
    data: [],
    value: localStorage.getItem("inputValue") || "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      dispatch({ type: "DATA_CHANGE", payload: { data } });
    };
    getData();

    localStorage.setItem("inputValue", state.value);
  }, [state.value]);

  const onDelete = async (id) => {
    dispatch({ type: "DELETE", payload: { id } });

    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json",
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-[100vh] gap-4 flex-col">
      {state.data.map(({ id, title }) => (
        <div key={id}>
          {title} <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
