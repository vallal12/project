import { useEffect, useState } from "react";
import sound from "./alarm.mp3";
import "./index.css";
import Send from "./getAlarms";
import {
  handleDelete,
  checkalarm,
  addAlarm,
  handleClose,
} from "./alarmFunctions";

export default function App() {
  const audio = new Audio(sound);
  const [time, setTime] = useState("00:00:00");
  const [intervalId, setId] = useState("");
  const [alarm, setAlarm] = useState(() => {
    const defaultAlarm = {};
    for (let i = 1; i <= 7; i++) {
      defaultAlarm[i] = [];
    }
    return defaultAlarm;
  });

  useEffect(() => {
    const id = setInterval(() => {
      const date = new Date();
      const hrs = date.getHours();
      const mins = date.getMinutes();
      const secs = date.getSeconds();
      const day = date.getDay();
      setTime(`${hrs}-${mins}-${secs}`);
      checkalarm(hrs, mins, day, alarm, audio);
    }, 1000);
    setId(id);
    return clearInterval(intervalId);
  }, [alarm]);

  return (
    <div className="App" id="App">
      <h1 id="clock">{time}</h1>
      <form id="form">
        <input
          id="hrs"
          min="0"
          max="24"
          type="number"
          placeholder="hours"
          required
        />
        <input
          id="mins"
          min="0"
          max="59"
          type="number"
          placeholder="minutes"
          required
        />
        <select id="day" required>
          <option value="">Choose day</option>
          <option value={1}>Monday</option>
          <option value={2}>Tuesday</option>
          <option value={3}>Wednesday</option>
          <option value={4}>Thursday</option>
          <option value={5}>Friday</option>
          <option value={6}>Saturday</option>
          <option value={7}>Sunday</option>
          <option value={8}>Everyday</option>
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            addAlarm(e, alarm, setAlarm);
          }}
        >
          Submit
        </button>
      </form>
      <div id="alarmWindow">
        <h1>Yendira vengayam</h1>
        <button
          onClick={() => {
            handleClose(audio);
          }}
        >
          X
        </button>
      </div>
      <Send
        alarm={alarm}
        handleDelete={(e) => {
          handleDelete(e, alarm, setAlarm);
        }}
      />
    </div>
  );
}
