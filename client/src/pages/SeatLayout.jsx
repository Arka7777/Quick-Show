import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";

export default function SeatLayout() {
  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  // Define seat layout structure
  const seatLayout = [
    // Front section (2 rows after screen)
    { section: "front", rows: ["F1", "F2"], seatsPerRow: 16, type: "regular" },
    // Main section (4 rows A-D)
    { section: "main", rows: ["A", "B", "C", "D"], seatsPerRow: 18, type: "regular" },
    // Premium section (2 rows)
    { section: "premium", rows: ["P1", "P2"], seatsPerRow: 14, type: "premium" }
  ];

  // Sample booked seats (you can replace this with actual data)
  const bookedSeats = ["A5", "A6", "B10", "C3", "P1-7"];

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Don't allow selecting booked seats
    
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClass = (seatId, type) => {
    if (bookedSeats.includes(seatId)) {
      return "bg-gray-500 text-gray-300 cursor-not-allowed";
    }
    if (selectedSeats.includes(seatId)) {
      return "bg-red-600 text-white shadow-md scale-105";
    }
    if (type === "premium") {
      return "bg-yellow-700 text-yellow-100 hover:bg-yellow-600 hover:scale-105";
    }
    return "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:scale-105";
  };

  const renderSeatSection = (section) => {
    return (
      <div key={section.section} className="mb-8">
        {section.rows.map((rowLabel) => {
          const leftSeats = Math.floor(section.seatsPerRow / 2);
          const rightSeats = section.seatsPerRow - leftSeats;
          
          return (
            <div key={rowLabel} className="flex items-center justify-center mb-2">
              {/* Row label */}
              <div className="w-8 text-center font-bold text-gray-300 mr-4">
                {rowLabel}
              </div>
              
              {/* Left side seats */}
              <div className="flex gap-1">
                {Array.from({ length: leftSeats }).map((_, i) => {
                  const seatNum = i + 1;
                  const seatId = `${rowLabel}-${seatNum}`;
                  return (
                    <button
                      key={seatId}
                      type="button"
                      onClick={() => handleSeatClick(seatId)}
                      className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg text-xs font-bold transition shadow-sm ${getSeatClass(seatId, section.type)}`}
                    >
                      {seatNum}
                    </button>
                  );
                })}
              </div>

              {/* Center aisle for walking */}
              <div className="w-12 flex items-center justify-center">
                <div className="w-px h-6 bg-gray-600 opacity-50"></div>
              </div>

              {/* Right side seats */}
              <div className="flex gap-1">
                {Array.from({ length: rightSeats }).map((_, i) => {
                  const seatNum = leftSeats + i + 1;
                  const seatId = `${rowLabel}-${seatNum}`;
                  return (
                    <button
                      key={seatId}
                      type="button"
                      onClick={() => handleSeatClick(seatId)}
                      className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg text-xs font-bold transition shadow-sm ${getSeatClass(seatId, section.type)}`}
                    >
                      {seatNum}
                    </button>
                  );
                })}
              </div>

              {/* Row label on right side too */}
              <div className="w-8 text-center font-bold text-gray-300 ml-4">
                {rowLabel}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <>
      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
        {/* available timing */}
        <div className="w-full md:w-60 bg-primary/10 border border-primary/10 rounded-lg py-8 h-max md:sticky md:top-20">
          <p className="text-lg font-semibold px-6">Available Timings</p>
          <div className="mt-5 space-y-1">
            {show.dateTime[date] && show.dateTime[date].length > 0 ? (
              show.dateTime[date].map((item) => (
                <div
                  key={item.time} 
                  onClick={() => setSelectedTime(item)}
                  className={`flex items-center gap-2 px-6 py-2 w-max rounded-md cursor-pointer transition ${
                    selectedTime?.time === item.time
                      ? "bg-primary text-white"
                      : "bg-gray-800 hover:bg-primary/20"
                  }`}
                >
                  <ClockIcon className="w-4 h-4" />
                  <p>{isoTimeFormat(item.time)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No timings available for this date</p>
            )}
          </div>
        </div>

        {/* seat layout */}
        <div className="flex-1 md:ml-10 mt-10 md:mt-0 relative">
          {/* background blur circle */}
          <BlurCircle top="-50px" right="-150px" />
          <BlurCircle bottom="-100px" left="-150px" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
              Select Your Seats
            </h2>

            {/* screen divider */}
            <div className="w-full max-w-4xl mx-auto mb-12">
              <div className="w-full h-3 bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 rounded-full shadow-lg"></div>
              <p className="text-center text-gray-400 mt-3 text-sm tracking-wide uppercase">
                🎬 Screen
              </p>
            </div>

            {/* seat layout container */}
            <div className="bg-gray-900/40 rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
              {/* Front section */}
              <div className="mb-12">
                <h3 className="text-center text-gray-400 mb-4 uppercase tracking-wide text-sm">Front Section</h3>
                {renderSeatSection(seatLayout[0])}
              </div>

              {/* Gap between front and main */}
              <div className="h-8 border-b border-dashed border-gray-600 mb-8 relative">
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 px-3 text-xs text-gray-500">AISLE</span>
              </div>

              {/* Main section */}
              <div className="mb-12">
                <h3 className="text-center text-gray-400 mb-4 uppercase tracking-wide text-sm">Main Section</h3>
                {renderSeatSection(seatLayout[1])}
              </div>

              {/* Gap between main and premium */}
              <div className="h-8 border-b border-dashed border-yellow-600 mb-8 relative">
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 px-3 text-xs text-yellow-600">PREMIUM AISLE</span>
              </div>

              {/* Premium section */}
              <div>
                <h3 className="text-center text-yellow-400 mb-4 uppercase tracking-wide text-sm">Premium Section</h3>
                {renderSeatSection(seatLayout[2])}
              </div>
            </div>

            {/* legend */}
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-800 rounded-md border"></span>
                Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-red-600 rounded-md border"></span>
                Selected
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-500 rounded-md border"></span>
                Booked
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-yellow-700 rounded-md border"></span>
                Premium
              </div>
            </div>

            {/* book button */}
            {selectedTime && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() =>
                    navigate(`/checkout/${id}/${date}/${selectedTime.time}`, {
                      state: { seats: selectedSeats },
                    })
                  }
                  disabled={selectedSeats.length === 0}
                  className={`px-8 py-3 rounded-xl shadow-lg text-lg font-semibold tracking-wide transition-all ${
                    selectedSeats.length > 0
                      ? "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white scale-105"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  🎟️ Book {selectedSeats.length} Seat
                  {selectedSeats.length > 1 ? "s" : ""}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}