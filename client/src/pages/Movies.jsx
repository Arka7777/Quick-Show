import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'

export default function Movies() {
  return dummyShowsData.length > 0 ? (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-16">
      {/* Background Blue Blur Circle */}
      <BlurCircle top="-100px" left="-100px" color="bg-blue-600" />
      <BlurCircle bottom="-120px" right="-120px" color="bg-blue-800" />

      <h1 className="text-3xl font-bold text-white mb-8">🎬 Now Showing</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-400 py-20">No movies available</div>
  )
}
