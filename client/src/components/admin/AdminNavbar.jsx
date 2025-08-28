import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

export default function AdminNavbar() {
  return (
    <>
    <div className='flex items-center justify-between px-6 h-16 border-b border-gray-300/300'> 
      <Link to='/'>
      <img src={assets.logo} alt="" />
      </Link>
    </div>
    </>
  )
}
