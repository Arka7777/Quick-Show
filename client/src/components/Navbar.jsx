import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react"
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const {user}=useUser();
  const {openSignIn} = useClerk();
  const navigate=useNavigate()
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full  text-white shadow-md">
      <div className="flex items-center justify-between px-6 md:px-16 py-4">
        {/* Logo */}
        <Link to="/" className="max-md:flex-1">
          <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
        </Link>

        {/* Desktop Menu in pill style */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium bg-neutral-900 px-6 py-2 rounded-full shadow-lg">
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Movies
          </Link>
          <Link
            to="/theatres"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Theaters
          </Link>
          <Link
            to="/releases"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Releases
          </Link>
          <Link
            to="/favourite"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Favorites
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <SearchIcon className="max-md:hidden w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors duration-200" />
          {
            !user?(<button onClick={openSignIn} className="px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-200">
            Login
          </button>):(
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="My Booking" labelIcon={<TicketPlus width={15} />} onClick={()=> navigate('/my-bookings') } />
              </UserButton.MenuItems>

            </UserButton>
          )
          }
          

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="w-7 h-7" />
            ) : (
              <MenuIcon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-black text-white gap-4 px-6 py-6 border-t border-gray-800">
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="hover:text-gray-300 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Movies
          </Link>
          <Link
            to="/theatres"
            className="hover:text-gray-300 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Theaters
          </Link>
          <Link
            to="/releases"
            className="hover:text-gray-300 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Releases
          </Link>
          <Link
            to="/favourite"
            className="hover:text-gray-300 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Favorites
          </Link>
        </div>
      )}
    </header>
  )
}
