import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, StarIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";

export default function AddShows() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  // ✅ Add new date/time
  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
    setDateTimeInput(""); // clear input after adding
  };

  // ✅ Remove a specific time
  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-6 text-lg font-semibold">Now Playing Movies</p>

      {/* 🎬 Movies list */}
      <div className="overflow-x-auto pb-4 mt-4">
        <div className="flex gap-6">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative min-w-[180px] bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer ${
                selectedMovie?.id === movie.id
                  ? "ring-2 ring-red-500"
                  : "hover:ring-1 hover:ring-gray-500"
              }`}
              onClick={() =>
                setSelectedMovie(
                  selectedMovie?.id === movie.id ? null : movie
                )
              }
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="rounded-t-xl w-full h-64 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold truncate">{movie.title}</p>
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                  <span className="ml-1 text-xs text-gray-400">
                    ({kConverter(movie.vote_count)} votes)
                  </span>
                </div>
              </div>

              {/* ✅ Selected checkmark */}
              {selectedMovie?.id === movie.id && (
                <div className="absolute top-2 right-2 bg-red-600 rounded-full p-1 shadow-md">
                  <CheckIcon className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 💰 Show price input */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Show Price
        </label>
        <div className="flex items-center gap-2 bg-gray-900/80 border border-gray-700 rounded-lg px-2 py-1 w-40">
          <p className="text-gray-400">{currency}</p>
          <input
            type="number"
            value={showPrice}
            min={0}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent outline-none text-white placeholder-gray-500 text-sm"
          />
        </div>
      </div>

      {/* ⏰ Date & Time input */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Date & Time
        </label>
        <div className="flex items-center gap-2">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="bg-gray-900/80 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm outline-none"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* 📅 Show added times */}
      <div className="mt-4 space-y-3">
        {Object.keys(dateTimeSelection).map((date) => (
          <div key={date} className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-300">{date}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {dateTimeSelection[date].map((time) => (
                <span
                  key={time}
                  className="flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs"
                >
                  {time}
                  <button
                    onClick={() => handleRemoveTime(date, time)}
                    className="ml-1 text-xs hover:text-gray-200"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

        {/* add show  */}
      <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed">Add Show</button>
      
    </>
  ) : (
    <Loading />
  );
}
