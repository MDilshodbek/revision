import { Button } from "antd";
import { useEffect, useState } from "react";

const UseState_Practice = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    console.log(count);
  }, []);

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <div className="flex gap-[20px] items-center justify-center">
        <Button type="primary" danger onClick={decrement}>
          -
        </Button>
        {count}
        <Button type="primary" onClick={increment}>
          +
        </Button>
      </div>
    </div>
  );
};

export default UseState_Practice;
