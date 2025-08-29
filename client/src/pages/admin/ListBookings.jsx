import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

export default function ListBookings() {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []); // ✅ added dependency array so it runs only once

  return !loading ? (
    <div className="px-6 md:px-16 lg:px-40 pt-28 md:pt-32 min-h-[80vh]">
      <Title text1="List" text2="Bookings" />

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden text-left text-white">
          <thead className="bg-gray-800 text-gray-300 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Movie Name</th>
             
              <th className="px-6 py-3">Show Time</th>
              <th className="px-6 py-3">Seats</th>
              <th className="px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {bookings.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-800/60 transition">
                <td className="px-6 py-4 font-medium">{item.user.name}</td>
                <td className="px-6 py-4">{item.show.movie.title}</td>
                <td className="px-6 py-4">{dateFormat(item.show.showDateTime)}</td>
                <td className="px-6 py-4">
                  {Object.keys(item.bookedSeats).map(seat=>item.bookedSeats[seat]). join(", ")}
                </td>
                <td className="px-6 py-4">
                  {currency}{item.amount}
                </td>
                
              </tr>
            ))}
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
