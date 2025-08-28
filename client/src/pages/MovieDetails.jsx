import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircle, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

export default function MovieDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const foundShow = dummyShowsData.find((s) => s._id === id);
    if(foundShow){
      setShow({
      movie: foundShow,
      dateTime: dummyDateTimeData,
    });
      
    }
    
  };

  useEffect(() => {
    getShow();
  }, [id]);

  const navigate=useNavigate()

  return show ? (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-16 text-white">
      {/* Background blur effects */}
      <BlurCircle top="-120px" left="-120px" color="bg-blue-700" />
      <BlurCircle bottom="-100px" right="-150px" color="bg-red-700" />

      <div className="flex flex-col md:flex-row gap-10 relative z-10">
        {/* Movie Poster */}
        <div className="w-full md:w-1/3">
          <img
            src={show.movie.poster_path}
            alt={show.movie.title}
            className="rounded-xl shadow-2xl border border-gray-800"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-sm text-gray-400">
            {show.movie.original_language.toUpperCase()}
          </p>
          <h1 className="text-4xl font-bold">{show.movie.title}</h1>

          <div className="flex items-center gap-2 text-yellow-400">
            <StarIcon className="w-5 h-5" />
            <span className="text-lg font-medium">
              {show.movie.vote_average.toFixed(1)} / 10
            </span>
            <span className="text-gray-400">User Rating</span>
          </div>

          <p className="text-gray-300">{show.movie.overview}</p>

          <p className="text-gray-400">
            {timeFormat(show.movie.runtime)} ·{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
            {show.movie.release_date.split("-")[0]}
          </p>
          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition">
              <PlayCircleIcon className="h-5 w-5" />
              <span>Watch Trailer</span>
            </button>

            <a
              href="#dateSelect"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
            >
              Buy Tickets
            </a>

            <button className="p-2 border border-gray-600 rounded-full hover:bg-gray-800 transition">
              <Heart className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>

        <div className="overflow-x-auto no-scrollbar pb-4">
          <div className="flex gap-6">
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-32 flex-shrink-0"
              >
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="w-28 h-28 object-cover rounded-full border-2 border-gray-700 shadow-lg"
                />
                <p className="mt-2 text-sm text-center font-bold">
                  {cast.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DateSelect dateTime={show.dateTime} id={id} />
     <p className="text-lg font-semibold mt-20 mb-8">You May Also Like</p>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
  {dummyShowsData.slice(0, 4).map((movie, index) => (
    <MovieCard key={index} movie={movie} />
  ))}
</div>

<div className="flex justify-center mt-8">
  <button
    onClick={() => {navigate("/movies"); scrollTo(0,0)}}
    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
  >
    Show More
  </button>
</div>

    </div>
  ) : (
    <Loading/>
  );
}
