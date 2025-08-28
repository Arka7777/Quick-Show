// src/components/BlurCircle.jsx
import React from "react"

export default function BlurCircle({ top = "0", left, right, bottom }) {
  return (
    <div
      className="absolute w-[400px] h-[400px] rounded-full bg-red-600 opacity-30 blur-3xl"
      style={{ top, left, right, bottom }}
    />
  )
}
