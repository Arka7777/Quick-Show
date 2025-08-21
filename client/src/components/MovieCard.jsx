import { StarIcon } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function MovieCard({ movie }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-between p-3 bg-neutral-900 rounded-2xl 
      hover:-translate-y-2 hover:shadow-xl transition duration-300 w-64 cursor-pointer">
      
      {/* Poster */}
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`)
          scrollTo(0, 0)
        }}
        src={movie.backdrop_path}
        className="rounded-lg h-52 w-full object-cover hover:opacity-90 transition duration-300"
        alt={movie.title}
      />

      {/* Title */}
      <p className="font-semibold mt-3 text-white truncate">{movie.title}</p>

      {/* Meta Info */}
      <p className="text-sm text-gray-400 mt-1">
        {new Date(movie.release_date).getFullYear()} •{" "}
        {movie.genres.slice(0, 2).map((genre) => genre.name).join(" | ")} •{" "}
        {movie.runtime} min
      </p>

      {/* Actions & Rating */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`)
            scrollTo(0, 0)
          }}
          className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium 
            hover:bg-red-700 transition-colors"
        >
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 text-sm text-yellow-400 font-medium">
          <StarIcon className="w-4 h-4 fill-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  )
}
