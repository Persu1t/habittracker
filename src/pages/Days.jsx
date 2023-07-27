import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { habitSelector } from "../redux/habitSlice";
import { useEffect } from "react";
import StatusChangBtn from "../components/StatusChangBtn";
const Days = () => {
  // getting the required value from the link by using useParams
  const { id } = useParams();
  // initial state of all the days of a week
  const [weekdays, setWeekdays] = useState([]);
  const { habits } = useSelector(habitSelector);
  const habited = habits.find((obj) => {
    if (id === obj.id) {
      return obj;
    }
    return null;
  });

  // In this use effect we are getting the next 7 days on initial render
  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date(); // Get the current date
    const nextSevenDays = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const dayName = daysOfWeek[nextDay.getDay()]; // Getting the day name
      const dateString = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1) // getting the date string
        .toString()
        .padStart(2, "0")}-${nextDay.getDate().toString().padStart(2, "0")}`;
      nextSevenDays.push({ day: dayName, date: dateString });
      // setting the days of week here 
      setWeekdays(nextSevenDays);
    }
  }, []);
  return (
    <div className="h-screen flex flex-col items-center">
      <div>
        {" "}
        <h1 className="text-xl text-white text-center sm:text-2xl lg:text-3xl">{habited.habit}</h1>
      </div>

      <ul className="flex flex-wrap justify-between my-auto">
        {weekdays.map((weekday, i) => (
          <li key={i} className="border-2 m-3 p-3 sm:m-12 lg:m-20 xl:m-28 xl:p-8">
            <div className="text-white sm:text-xl lg:text-2xl">{weekday.day}</div>
            <div className="text-white sm:text-xl lg:text-2xl">{weekday.date}</div>
            <div>
              <StatusChangBtn id={id} weekday={weekday.day} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Days;
