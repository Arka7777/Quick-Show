import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

export default function ListShows() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 200,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <div className="px-6 md:px-16 lg:px-40 pt-28 md:pt-32 min-h-[80vh]">
      <Title text1="List" text2="Shows" />
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden text-left text-white">
          <thead className="bg-gray-800 text-gray-300 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Movie Name</th>
              <th className="px-6 py-3">Show Time</th>
              <th className="px-6 py-3">Total Bookings</th>
              <th className="px-6 py-3">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {shows.map((show, idx) => {
              const totalBookings = Object.keys(show.occupiedSeats).length;
              const earnings = totalBookings * show.showPrice;
              return (
                <tr key={idx} className="hover:bg-gray-800/60 transition">
                  <td className="px-6 py-4 font-medium">{show.movie.title}</td>
                  <td className="px-6 py-4">{dateFormat(show.showDateTime)}</td>
                  <td className="px-6 py-4">
                    {Object.keys(show.occupiedSeats).length}
                  </td>
                  <td className="px-6 py-4">
                    {currency}
                    {Object.keys(show.occupiedSeats).length * show.showPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loading />
    </div>
  );
}
