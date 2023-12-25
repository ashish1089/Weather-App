import { useState } from "react";

function DateTime() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [time, setTime] = useState(new Date());

  function updateTime() {
    const newTime = new Date();
    setTime(newTime);
  }
  setInterval(() => {
    updateTime();
  }, 1000);

  const month = months[time.getMonth()];
  const day = days[time.getDay()];
  const year = time.getFullYear();
  const today = time.getDate();

  return (
    <div className="date-time">
      <div className="time">{time.toLocaleTimeString()}</div>
      <div className="date">
        {day} {today} {month} {year}
      </div>
    </div>
  );
}

export default DateTime;
