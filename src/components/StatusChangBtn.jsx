
import { useDispatch, useSelector } from "react-redux";
import { action, habitSelector } from "../redux/habitSlice";
// importing icons from react icons this below one is checked from bootstrap
import { BsCheckLg } from "react-icons/bs";
// importing icons from react icons this below one is cross from rx
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useState } from "react";

const StatusChangBtn = ({ id, weekday }) => {
  // setting the check that when the checked clicked again it must not notify the user
  const [trueNotification, setTrueNotification] = useState(true)
  // setting the check that when the cross clicked again it must not notify the user
  const [falseNotification, setFalseNotification] = useState(true)
  const dispatch = useDispatch();
  const { habits } = useSelector(habitSelector);

  const handleTrue = (id, day) => {
    // dispatching the statusChangeTrue when checked button is clicked 
    dispatch(action.statusChangeTrue({ id: id, day: day }));
    // setting the check so that again clicked it must not notify the user
    setTrueNotification(false)
    if(trueNotification === true){
      toast.success("Hurray!! You have successfully completed repetation")
    }
  };

  const handleFalse = (id, day)=>{
    // dispatching the statusChangeFalse when cross button is clicked 
    dispatch(action.statusChangeFalse({ id: id, day: day }));
    // setting the check so that again clicked it must not notify the user
    setFalseNotification(false)
    if(falseNotification === true){
      toast.error("You unable to complete repetation")
    }
  }

  // this function checks the classname and according give class to the element of checked button
  const getStatusClassName = () => {
    const habit = habits.find((obj) => obj.id === id);
    if (habit) {
      let className = "text-white"; // Default class when status is not done
      habit.days.forEach((day) => {
        if (day.day === weekday && day.status === "done") {
          className = "border-2 text-black rounded-full bg-slate-50";
        }
      });
      return className;
    }
    return "text-white"; // Default class when habit is not found
  };
  //this function checks the classname and according give class to the element of cross button
  const getStatusClassName2 = ()=>{
    const habit = habits.find((obj) => obj.id === id);
    if (habit) {
      let className = "text-white"; // Default class when status is not done
      habit.days.forEach((day) => {
        if (day.day === weekday && day.status === "fail") {
          className = "border-2 text-black rounded-full bg-slate-50";
        }
      });
      return className;
    }
    return "text-white"; // Default class when habit is not found
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <button
          className={getStatusClassName()}
          onClick={() => handleTrue(id, weekday)}
        >
          <BsCheckLg className="sm:text-lg lg:text-xl xl:text-3xl"/>
        </button>
        <button className={getStatusClassName2()} onClick={()=> handleFalse(id, weekday)}>
          <RxCross2 className="sm:text-lg lg:text-xl xl:text-3xl"/>
        </button>
      </div>
    </div>
  );
};

export default StatusChangBtn;
