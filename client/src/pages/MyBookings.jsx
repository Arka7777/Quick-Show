import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";

export default function MyBookings() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !loading ? (
    <>
      <div className="relative px-6 md:px-16 lg:px-40 pt-28 md:pt-32 min-h-[80vh]">
        {/* Background blur circles */}
        <BlurCircle top="300px" left="100px" />
        <div>
          <BlurCircle bottom="0px" left="500px" />
        </div>

        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        <div className="max-w-5xl space-y-6">
          {bookings.map((item) => (
            <div
              key={item.id || item.show.movie.id}
              className="flex flex-col md:flex-row gap-6 p-5 border rounded-2xl shadow-md bg-red-400/10 backdrop-blur-md max-w-4xl"
            >
              {/* Left Side - Poster and Movie Details */}
              <div className="flex gap-4 flex-1">
                {/* Poster */}
                <img
                  src={item.show.movie.poster_path}
                  alt={item.show.movie.title}
                  className="w-20 h-28 md:w-24 md:h-36 object-cover rounded-xl shadow-md flex-shrink-0"
                />

                {/* Movie Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-semibold">{item.show.movie.title}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Duration: {timeFormat(item.show.movie.runtime)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Showtime: {dateFormat(item.show.showDateTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Seats and Payment */}
              <div className="flex flex-col justify-between min-w-fit">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Tickets</p>
                  <p className="font-medium text-white text-lg">
                    {item.bookedSeats.length}
                  </p>
                  
                  <p className="text-sm text-gray-400 mt-2">Seat Numbers</p>
                  <div className="flex flex-wrap gap-1 justify-end mt-1">
                    {item.bookedSeats.map((seat, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs font-medium"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price + Payment */}
                <div className="mt-4 text-right">
                  <p className="text-2xl font-semibold text-green-400 mb-3">
                    {currency} {item.amount}
                  </p>
                  {!item.isPaid && (
                    <button className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                      Pay Now
                    </button>
                  )}
                  {item.isPaid && (
                    <div className="px-4 py-2 text-sm rounded-lg bg-green-600/20 text-green-400 border border-green-600/30">
                      Paid ✓
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}