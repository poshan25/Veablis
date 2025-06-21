import React from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };
  return (
    <div className="flex flex-col  items-center bg-emerald-400 justify-center h-screen gap-4">
<section className="border rounded-2xl p-5 bg-gray-800 text-white flex flex-col  items-center justify-center  gap-4">
    <h1 className="text-2xl font-bold ">Who are you?</h1>
      <button
        className="bg-purple-700 cursor-pointer px-4 py-2 text-white rounded hover:bg-purple-600"
        onClick={() => handleSelect("admin")}
      >
        I'm Admin
      </button>
      <button
        className="bg-blue-500 cursor-pointer px-4 py-2 text-white rounded hover:bg-blue-600"
        onClick={() => handleSelect("user")}
      >
        I'm User
      </button></section> 
   
    </div>
  );
};

export default Verify;
