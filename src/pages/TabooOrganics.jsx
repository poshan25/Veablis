import React from "react";
import { Link } from "react-router-dom";
import NewNav from "../components/NewNav";
import UserNav from "../components/UserNav";

const TabooOrganicsPage = () => {
  return (
    <div className="relative px-38 w-full h-screen font-sans">
      {/* Background Image */}
      <img
        src="/images/beauty1.png"
        alt="Taboo Products"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Content */}
      <div className="relative  z-10 w-full h-full">
       <UserNav/>
        {/* Hero Section */}
        <section className="px-6 py-16 mt-[-90px] flex flex-col md:flex-row items-center justify-between h-full">
          {/* Text Section */}
          <div className="max-w-md text-left space-y-4">
            <p className="text-lg tracking-widest font-semibold  text-gray-600">
              PREMIUM HEMP PRODUCTS
            </p>
            <h1 className="text-5xl font-bold mb-10 mt-[-10px] text-gray-800">
              Veablis Organics
            </h1>
            <p className="text-base font-semibold text-gray-600">
              Using organic farming methods, premium ingredients, and meticulous
              care, we're able to produce powerful family friendly hemp products
              at a reasonable price.
            </p>
            {/* <button className="mt-4 px-6 py-2 bg-[#7d5452] text-white rounded-full text-sm hover:bg-[#8e5c5c]"> */}
            {/* <button className="mt-4 px-6 py-2 bg-[#926362] text-white rounded-full text-sm hover:bg-[#8e5c5c]">

              Shop now
              
            </button> */}
            {/* <p class="font-light ...">The quick brown fox ...</p>
<p class="font-normal ...">The quick brown fox ...</p>
<p class="font-medium ...">The quick brown fox ...</p>
<p class="font-semibold ...">The quick brown fox ...</p>
<p class="font-bold ...">The quick brown fox ...</p> */}
            {/* <Link to="/userCart">Order Status</Link> */}

            <div className="mt-4 w-fit font-semibold cursor-pointer px-6 py-3.5 bg-gradient-to-r from-[#b79494] to-[#926362]  text-white rounded-full text-sm hover:from-[#a37878] hover:to-[#c1a9a9]">
              <Link to="/products">Shop now</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TabooOrganicsPage;
