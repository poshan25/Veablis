import React from 'react'

const NewNav = () => {
  return (
    <nav
            className="hidden md:flex items-center mt-15 gap-8 text-base text-[#3f2b2a]
 font-semibold tracking-widest uppercase"
          >
            <a href="#" className="hover:text-black">
              Shop
            </a>
            <a href="#" className="hover:text-black">
              About Us
            </a>
            <a href="#" className="hover:text-black">
              Contact
            </a>
            <a href="#" className="hover:text-black">
              FAQ
            </a>
          </nav>
  )
}

export default NewNav