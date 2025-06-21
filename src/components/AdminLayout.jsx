import React from "react";
import AdminNav from "./AdminNav";
import Footer from "./Footer";

// import AdminNav from "./AdminNav";
// import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <>
      <AdminNav />
       <div className=' bg-fuchsia-500 p-5 text-gray-100 flex flex-col items-center  '>
             <h3 className='text-3xl font-bold'>Welcome Admin</h3>
             <br />
             <h1 className='text-xl'>Hope You Are Doing Great</h1>
        </div>
      {/* <main>{children}</main> */}
      <Footer />
    </>
  );
};

export default AdminLayout;
