import { useState } from "react";

export default function Send(props) {
  const [day, changeDay] = useState("");
  function renderAlarms() {
    if (day !== "") {
      return props.alarm[day].map((k, ind) => {
        return (
          <div className="alarm">
            <p>{k}</p>
            <button
              onClick={props.handleDelete}
              id={`${day}-${ind}`}
              className="fa-solid fa-trash"
            />
          </div>
        );
      });
    } else {
    }
  }
  function handleChange() {
    changeDay(document.getElementById("alarmday").value);
  }
  return (
    <div className="alarms">
      <select id="alarmday" onChange={handleChange}>
        <option value={1}></option>
        <option value={1}>Monday</option>
        <option value={2}>Tuesday</option>
        <option value={3}>Wednesday</option>
        <option value={4}>Thursday</option>
        <option value={5}>Friday</option>
        <option value={6}>Saturday</option>
        <option value={7}>Sunday</option>
      </select>
      <div className="alarminthisday">{renderAlarms()}</div>
    </div>
  );
}
