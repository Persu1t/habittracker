import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { action } from '../redux/habitSlice'
import { toast } from 'react-toastify'

const Input = () => {
    // initializing the habit state here
    const [habit, setHabit] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        // if no habit found return immediately 
        if(!habit){
            return
        }
        // capatilizing the first character of the habit here
        let string = habit;
        let capatilizeHabit = string.charAt(0).toUpperCase() +string.slice(1);
        // dispatching the action addhabit using dispatch function
        dispatch(action.addhabit(capatilizeHabit))
        toast.success(`${capatilizeHabit} habit created successfully`)
        setHabit("")
    }
  return (
    <div className='sm:mt-2'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input className='border-2 w-64 m-auto rounded-lg border-gray-500 px-1 bg-gray-200 my-1 sm:text-lg' type='text' placeholder='Enter habit here' value={habit} onChange={(e)=>setHabit(e.target.value)} required/>
            <button className='border-2 rounded-lg bg-green-800 w-32 m-auto text-white sm:mt-2 md:text-lg'>Add habit</button>
        </form>
        
    </div>
  )
}

export default Input