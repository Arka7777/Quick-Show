import { ArrowRight } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { dummyBookingData, dummyShowsData } from "../assets/assets"
import MovieCard from "./MovieCard"

export default function Feature() {
  const navigate = useNavigate()

  return (
    <div className="px-6 md:px-16 xl:px-44 py-10 
      bg-gradient-to-t from-black via-red-900 to-primary 
      transition-all duration-500 ease-in-out">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl md:text-2xl font-semibold text-white">Now Showing</p>

        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 px-4 py-2 rounded-full border border-gray-600 
          text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Content Section
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Example Movie Cards Placeholder */}
        {/* <div className="h-48 bg-neutral-800 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"></div>
        <div className="h-48 bg-neutral-800 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"></div>
        <div className="h-48 bg-neutral-800 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"></div>
        <div className="h-48 bg-neutral-800 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"></div> */}
      {/* </div> */} 

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyShowsData.slice(0,4).map((show)=>(
          <MovieCard key={show._id} movie={show}/>
        ))}
      </div>
    </div>
  )
}
