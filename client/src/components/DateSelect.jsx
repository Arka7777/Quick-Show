import React, { useState } from "react"
import BlurCircle from "./BlurCircle"
import { ChevronLeft, ChevronRight } from "lucide-react"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

export default function DateSelect({ dateTime, id }) {

  const nevigate=useNavigate()
  const [selected,setSelected]=useState(null);

  const onBookHandler=()=>{
    if(!selected){
      return toast('Please Select A Date')
    }
    nevigate(`/movies/${id}/${selected}`)
    scrollTo(0,0)

  }
  return (
    <div id="dateSelect" className="relative py-20 text-white">
     
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle top="100px" right="-100px" />

      <div className="relative z-10">
        
        <p className="text-2xl font-semibold mb-6">Choose Date</p>

       
        <div className="flex items-center gap-4">
        
          <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
            <ChevronLeft className="h-6 w-6" />
          </button>

          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {Object.keys(dateTime).map((date) => (
             <button
  onClick={() => setSelected(date)}
  key={date}
  className={`flex flex-col items-center px-4 py-2 rounded-lg shadow-md transition min-w-[80px] 
    ${selected === date ? "bg-red-600 text-white" : "bg-gray-800 border border-red-600 text-gray-300 hover:bg-red-700"}`}
>
  <span className="text-lg font-bold">
    {new Date(date).getDate()}
  </span>
  <span className="text-sm">
    {new Date(date).toLocaleDateString("en-US", { month: "short" })}
  </span>
</button>
            ))}
          </div>

     
          <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

  
        <div className="mt-8 flex justify-center">
          <button onClick={onBookHandler} className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl shadow-lg text-lg font-semibold transition">
            🎟️ Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
