import React, { useState } from "react"
import { dummyTrailers } from "../assets/assets.js"
import ReactPlayer from "react-player"
import BlurCircle from "./BlurCircle"
import YouTube from "react-youtube";

export default function Trailer() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
  const [isPlaying, setIsPlaying] = useState(false)

  const handleTrailerClick = (trailer) => {
    setCurrentTrailer(trailer)
    setIsPlaying(true) // autoplay new trailer
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden relative">
      {/* Section Title */}
      <p className="text-2xl md:text-3xl font-semibold text-white">🎬 Trailers</p>

      {/* Video Player */}
      <div className="relative mt-8 flex justify-center">
        {/* Background effect */}
        <BlurCircle top="-120px" right="-120px" />

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          <YouTube
            url={currentTrailer.videoUrl}
            controls={true}
            playing={isPlaying}   // 🔥 autoplay new trailer
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            className="react-player"
            width="960px"
            height="540px"
          />
        </div>
      </div>

      {/* Trailer Thumbnails / Controls */}
      <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
        {dummyTrailers.map((trailer, index) => (
          <img
            key={index}
            src={trailer.image}
            onClick={() => handleTrailerClick(trailer)}
            className={`h-24 w-40 object-cover rounded-lg cursor-pointer border-2 transition 
              ${currentTrailer.videoUrl === trailer.videoUrl 
                ? "border-red-600 scale-105" 
                : "border-transparent hover:scale-105"}`}
          />
        ))}
      </div>
    </div>
  )
}
