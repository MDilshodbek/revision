import { Button, Input, Modal, notification } from "antd";
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
  const [lapName, setLapName] = useState("");
  const [showInput, setShowInput] = useState(false);

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
    setShowInput(false);
  };

  const addLap = () => {
    if (lapName.trim() !== "") {
      setLap((previous) => {
        return [
          ...previous,
          {
            hour: formatTime(hour),
            minute: formatTime(minute),
            second: formatTime(second),
            milliSecond: formatTime(milliSecond),
            name: lapName,
            id: v4(),
          },
        ];
      });
      setLapName("");
      setShowInput(false);
    }
  };

  const formatTime = (value) => value.toString().padStart(2, "0");

  const resetLaps = () => {
    setLap([]);
  };

  useEffect(() => {
    if (running)
      timeRef.current = setInterval(() => {
        setMilliSecond(changeMilliSecond);
      }, 10);
    else clearInterval(timeRef.current);
  }, [running]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[500px] h-[500px] bg-orange-500 mt-40">
        <div className="flex justify-center gap-[10px] text-5xl mt-[20px] w-full font-mono">
          <h3 className="w-[40px] text-center">{formatTime(hour)}</h3>:
          <h3 className="w-[40px] text-center">{formatTime(minute)}</h3>:
          <h3 className="w-[40px] text-center">{formatTime(second)}</h3>:
          <h3 className="w-[40px] text-center">{formatTime(milliSecond)}</h3>
        </div>
        <div className="flex w-[80%] justify-between m-auto mt-[20px]">
          {showInput ? (
            <Input
              placeholder="Enter lap name"
              value={lapName}
              onChange={(e) => setLapName(e.target.value)}
            />
          ) : (
            <Button
              type="primary"
              onClick={() => {
                setShowInput(true);
              }}
              disabled={
                hour === 0 && minute === 0 && second === 0 && milliSecond === 0
              }
            >
              Lap
            </Button>
          )}
          {showInput && (
            <Button type="primary" onClick={addLap}>
              Add
            </Button>
          )}
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
          {lap.map(({ milliSecond, second, minute, hour, name, id }) => (
            <div key={id} className="flex center">
              <h1>{formatTime(hour)}</h1>:<h1>{formatTime(minute)}</h1>:
              <h1>{formatTime(second)}</h1>:<h1>{formatTime(milliSecond)}</h1> -{" "}
              <h1>{name}</h1>
            </div>
          ))}
          {lap?.length > 0 && <Button onClick={resetLaps}>Clear</Button>}
        </div>
      </div>
    </div>
  );
}

export default App;
