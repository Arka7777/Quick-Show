import React from 'react'
import { assets } from '../assets/assets.js'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {

  const navigate=useNavigate()

  return (
    <>
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      <img src={assets.marvelLogo} alt='' className='max-h-11 lg:h-11 mt-20' />
    <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110 ' >
      Guardians <br/> of the Galaxy
    </h1>

    <div className='flex items-center gap-4 text-gray-300'  >
      <span>Action | Adventure | Sci-Fi</span>
      <div className='flex items-center gap-1'>
        <CalendarIcon className='w-4.5 h-4.5'/>2018
      </div>
      <div className='flex items-center gap-1'>
        <ClockIcon className='w-4.5 h-4.5'/>2 h 8m 
      </div>

    </div>
    <p>
      <p>
        In a post-apocalypic world where cities ride on wheels and consume each other to survive , two peoplw meet in  London and try to stop a conspirancy.
      </p>
      <button className='bg-red-500 hover:bg-red-800 rounded-full text-sm cursor-pointer hover:bg-primary-dull font-medium px-6 py-3 transition flex items-center gap-1  ' onClick={()=>navigate('/movies')}>
        Explore movies
        <ArrowRight className='w-5 h-5'/>

      </button>
    </p>

    </div>
    </>
  )
}
