import React from "react"
import { Link } from "react-router-dom"
import { assets } from "../assets/assets"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-800">
        
        {/* Logo + About */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-36 h-auto mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop destination for movies, theaters, and releases.
            Stay updated with the latest entertainment news.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3 text-sm">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/movies" className="hover:text-gray-300">Movies</Link>
          <Link to="/theatres" className="hover:text-gray-300">Theaters</Link>
          <Link to="/releases" className="hover:text-gray-300">Releases</Link>
          <Link to="/favourite" className="hover:text-gray-300">Favorites</Link>
        </div>

        {/* Social Media */}
        {/* <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div> */}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Team: Quick Show. All rights reserved.
      </div>
    </footer>
  )
}
