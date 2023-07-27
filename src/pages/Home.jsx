import React from "react";
// importing actions and selectors from habit slice
import { action, habitSelector } from "../redux/habitSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillCalendar2EventFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import Input from "../components/Input";
const Home = () => {
  // importing habits state from habitslice and using habitSelector in useSelector
  const { habits } = useSelector(habitSelector);
  // using dispatch function
  const dispatch = useDispatch();

  const handleDelete = (id, title) => {
    // dispatching the delete action using dispatch function
    dispatch(action.deletehabit(id));
    // notification handler
    toast.success(`${title} habit deleted successfully`)
  };

  return (
    <>
      <div>
        <h1 className="text-center text-2xl text-white mx-auto sm:text-3xl">
          Habit tracker
        </h1>
        <Input />
        <br />
        <hr className=" xs: w-screen sm:w-screen"/>
        <ul>
          {habits.map((habit) => (
            <>
              <br />
              <li
                className="p-4 border-white-950 border-2 w-4/5 mx-auto flex justify-between"
                key={habit.id}
              >
                <div className="text-white text-xl sm:text-2xl">{habit.habit}</div>
                <div className="flex justify-around">
                  <button className="border-2 bg-stone-300 text-black mx-3 w-10 p-2 rounded-full sm:text-lg md:mx-7 lg:p-2">
                    {/* passing the id to link for dyanimic routes */}
                    <Link to={`/calander/${habit.id}`}>
                      <BsFillCalendar2EventFill className="mx-auto lg: text-xl"/>
                    </Link>
                  </button>
                  <button
                    className="border-2 rounded-full bg-red-500 text-white w-10 p-2 sm:text-lg lg:p-2"
                    onClick={() => handleDelete(habit.id, habit.habit)}
                  >
                    <BsTrash className="mx-auto lg:text-lg" />
                  </button>
                </div>
              </li>
              <br />
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
