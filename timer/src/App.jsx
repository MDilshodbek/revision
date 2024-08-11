import { Button, Modal, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

function App() {
  const timeRef = useRef(null);
  const [milliSecond, setMilliSecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [running, setRunning] = useState(false);
  const [lap, setLap] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);

  const showModal = () => {
    setisModalOpen(true);
  };

  const handleCancel = () => {
    setisModalOpen(false);
  };

  const handleOk = () => {
    reset();
    setisModalOpen(false);
  };

  useEffect(() => {
    if (running)
      timeRef.current = setInterval(() => {
        setMilliSecond(changeMilliSecond);
      }, 10);
    else clearInterval(timeRef.current);
  }, [running]);

  const changeMilliSecond = (previous) => {
    if (previous === 100) {
      setSecond(changeSecond);
      return 0;
    }
    return previous + 1;
  };

  const changeSecond = (previous) => {
    if (previous === 59) {
      setMinute(changeMinute);
      return 0;
    }
    return previous + 1;
  };

  const changeMinute = (previous) => {
    if (previous === 59) {
      setHour((previous) => {
        return previous + 1;
      });

      return 0;
    }
    return previous + 1;
  };

  const reset = () => {
    setMilliSecond(0);
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  const onLap = () => {
    const lapTime = {
      hour: hour,
      minute: minute,
      second: second,
      milliSecond: milliSecond,
      id: v4(),
    };

    setLap((previous) => [...previous, lapTime]);
  };

  const formatTime = (value) => value.toString().padStart(2, "0");

  const resetLaps = () => {
    setLap([]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[500px] h-[500px] bg-orange-500 mt-40">
        <div className="flex justify-center gap-[10px] text-7xl mt-[20px] w-full">
          <h3>{formatTime(hour)}</h3>:<h3>{formatTime(minute)}</h3>:
          <h3>{formatTime(second)}</h3>:<h3>{formatTime(milliSecond)}</h3>
        </div>
        <div className="flex w-[80%] justify-between m-auto mt-[20px]">
          <Button
            type="primary"
            onClick={onLap}
            disabled={
              hour === 0 && minute === 0 && second === 0 && milliSecond === 0
            }
          >
            Lap
          </Button>
          {running ? (
            <Button onClick={() => setRunning(false)}>Pause</Button>
          ) : (
            <Button onClick={() => setRunning(true)}>Start</Button>
          )}
          <Button danger type="primary" onClick={showModal}>
            Restart
          </Button>
          <Modal
            title="Reminder"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Are you sure to reset the timer?</p>
          </Modal>
        </div>

        <div className="w-full flex gap-4 flex-col mt-3 items-center">
          {lap.map(({ second, minute, hour, id }) => (
            <div key={id} className="flex center">
              <h1>{formatTime(hour)}</h1>:<h1>{formatTime(minute)}</h1>:
              <h1>{formatTime(second)}</h1>:<h1>{formatTime(milliSecond)}</h1>
            </div>
          ))}
          {lap?.length > 0 && <Button onClick={resetLaps}>Clear</Button>}
        </div>
      </div>
    </div>
  );
}

export default App;
