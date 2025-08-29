import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";

export default function Dashboard() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = React.useState({
    totalBookings: 0,
    totalrevenue: 0,
    activeShows: [],
    totalUsers: 0,
  });
  const [loading, setLoading] = React.useState(true);

  const dashBoardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency || "$"} ${dashboardData.totalRevenue || 0}`,

      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-28 md:pt-32 min-h-[80vh]">
      {/* Background blur circles */}
      <BlurCircle top="200px" left="100px" />
      <BlurCircle bottom="100px" right="100px" />

      {/* Page Title */}
      <Title text1="Admin" text2="Dashboard" />

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {dashBoardCards.map((card, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-5 rounded-xl bg-gray-900/80 text-white shadow-md hover:shadow-lg transition backdrop-blur-md"
          >
            <div className="p-3 rounded-full bg-red-500/20 text-white flex items-center justify-center">
              <card.icon className="w-7 h-7" />
            </div>

            {/* Info */}
            <div>
              <p className="text-sm text-white">{card.title}</p>
              <h2 className="text-2xl font-bold">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>
<p className="mt-10 text-lg font-semibold text-white">Active Shows</p>

{dashboardData.activeShows.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
    {dashboardData.activeShows.map((show) => (
      <div
        key={show._id}
        className="bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition p-3 flex flex-col"
      >
        {/* Poster */}
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
        />

        {/* Title */}
        <p className="text-base font-semibold text-white truncate">
          {show.movie.title}
        </p>

        {/* Price + Rating */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-medium text-red-400">
            {currency}{show.showPrice}
          </p>
          <div className="flex items-center text-yellow-400 text-xs">
            <StarIcon className="w-4 h-4 mr-1 fill-yellow-400" />
            {show.movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* Date & Time */}
        <p className="text-xs text-gray-400 mt-1">
          {dateFormat(show.showDateTime)}
        </p>
      </div>
    ))}
  </div>
) : (
  <p className="mt-4 text-gray-400">No active shows available.</p>
)}

    </div>
  ) : (
    <div>
      <div></div>
      <Loading />
    </div>
  );
}
