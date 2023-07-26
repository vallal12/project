function handleClose(audio) {
  audio.pause();
  document.getElementById("alarmWindow").style.visibility = "hidden";
}

function addAlarm(e, alarm, setAlarm) {
  let newAlarm = alarm;
  const day = document.getElementById("day").value;
  const inputTime = `${document.getElementById("hrs").value}:${
    document.getElementById("mins").value
  }`;
  if (day === "8") {
    for (let i of Object.keys(newAlarm)) {
      if (!newAlarm[`${i}`].includes(inputTime)) {
        newAlarm[`${i}`] = [...newAlarm[`${i}`], inputTime];
      }
    }
  } else {
    if (newAlarm[`${day}`].includes(inputTime)) {
      return null;
    } else {
      newAlarm = {
        ...newAlarm,
        [`${day}`]: [...newAlarm[`${day}`], inputTime],
      };
    }
  }
  setAlarm(newAlarm);
}

function handleDelete(e, alarm, setAlarm) {
  const [day, index] = e.target.id.split("-");
  const newAlarm = alarm;
  newAlarm[`${day}`].splice(index, 1);
  setAlarm(newAlarm);
}

async function checkalarm(hrs, mins, day, alarm, audio) {
  if (alarm[`${day}`].includes(`${hrs}:${mins}`)) {
    const secs = new Date().getSeconds();
    if (secs === 0) {
      document.getElementById("alarmWindow").style.visibility = "visible";
      await audio.play();
    }
  }
}

export { handleDelete, checkalarm, addAlarm, handleClose };
