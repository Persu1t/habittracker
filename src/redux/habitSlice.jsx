// importing the createSlice function from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// getting the habits from local storage if any exists
let habitItem = JSON.parse(localStorage.getItem("habit"));

// initializing the state
const initialState = {
  habits: habitItem?.habits || [],
};

// creating habitSlice object
const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    // addhabit reducer function
    addhabit: (state, action) => {
      state.habits = [
        ...state.habits,
        {
          id: String(Date.now()),
          habit: action.payload,
          days: [
            { day: "Monday", status: "none" },
            { day: "Tuesday", status: "none" },
            { day: "Wednesday", status: "none" },
            { day: "Thursday", status: "none" },
            { day: "Friday", status: "none" },
            { day: "Saturday", status: "none" },
            { day: "Sunday", status: "none" },
          ],
        },
      ];
      localStorage.setItem("habit", JSON.stringify(state));
    },

    // deletehabit reducer function
    deletehabit: (state, action) => {
      let id = action.payload;
      let index = state.habits.findIndex((item) => id === item.id);
      state.habits.splice(index, 1);
      localStorage.setItem("habit", JSON.stringify(state.habits));
    },

    // marking the status as done if checked button clicked using stausChangeTrue reducer function

    statusChangeTrue: (state, action) => {
      const { id, day } = action.payload;
      state.habits.forEach((item) =>{
        if (item.id === id) {
          item.days.forEach((obj) => {
            if (obj.day === day) {
              obj.status = obj.status === "done" ? "none" : "done";
            }
          });
        }
      });
      localStorage.setItem("habit", JSON.stringify(state))
    },

    // marking the status as fail if cross button clicked using stausChangeFalse reducer function
    statusChangeFalse: (state, action) => {
      const {id, day} = action.payload;
      state.habits.forEach((item)=>{
        if(item.id === id){
          item.days.forEach((obj)=>{
            if(obj.day === day){
              obj.status = obj.status === "fail" ? "none" : "fail"
            }
          })
        }
      })
      localStorage.setItem("habit", JSON.stringify(state))
    },
  },
});

// exporting all necessary exports reducers, actions and state
export const habitReducer = habitSlice.reducer;
export const action = habitSlice.actions;
export const habitSelector = (state) => state.habitReducer;
