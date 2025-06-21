// import React, { useEffect, useState } from 'react'
// import UserNav from './UserNav'
// import supabase from '../supabaseClient';

// const ToReceive = () => {
//      const [orders, setOrders] = useState([]);
//        const [popupMsg, setPopupMsg] = useState("");
     

//   async function confirmOrder(id) {
//     const { error } = await supabase
//       .from("orders")
//       .update({ status: "received" })
//       .eq("id", id);

//     if (error) {
//       setPopupMsg("failed while submitting received status");
//       console.error(error);
//       return;
//     }

//     setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));

//     setPopupMsg("Order received!");

//     // Hide popup after 1 second
//     setTimeout(() => setPopupMsg(""), 1000);
//   }

//   useEffect(() => {
//     async function fetchOrders() {
//       let { data, error } = await supabase
//         .from("orders")
//         .select(
//           `
//       *,
//       products(id, name, price, image_url)
//     `
//         )
//         .eq("status", "confirmed");

//       if (error) {
//         console.error("err fetching orders:", error);
//       } else {
//         setOrders(data);
//       }
//     }
//     fetchOrders();
//   }, []);

//   return (
//     <>
//     <UserNav/>
//      {popupMsg && (
//         <div
//           style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             backgroundColor: "#4caf50",
//             color: "white",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             zIndex: 1000,
//           }}
//         >
//           {popupMsg}
//         </div>
//       )}
//         <div>ToReceive</div>
//          {orders.length === 0 && <p>No orders found.</p>}
//       {orders.map((order) => (
//         <div
//           key={order.id}
//           style={{ border: "1px solid gray", margin: 10, padding: 10 }}
//         >
//           <h3>{order.products?.name}</h3>
//           <img
//             src={order.products?.image_url}
//             alt={order.products?.name}
//             width="100"
//           />
//           <p>Price: Rs. {order.products?.price}</p>
//           <p>Quantity: {order.quantity}</p>
//           <p>Status: {order.status} <span>order is on the way</span></p>
//           <br />

//           {/* <button
//             className="border rounded-xl cursor-pointer p-2 bg-green-300 m-2"
//             onClick={() => confirmOrder(order.id)}
//           >
//             Confirm Order
//           </button> */}
//           <button
//             className="border rounded-xl cursor-pointer p-2 bg-green-300 m-2"
//             onClick={() => confirmOrder(order.id)}
//           >
//             Order Received
//           </button>
//         </div>
//       ))}

//     </>
//   )
// }

// export default ToReceive;




import React, { useEffect, useState } from 'react';
import UserNav from './UserNav';
import supabase from '../supabaseClient';

const ToReceive = () => {
  const [orders, setOrders] = useState([]);
  const [popupMsg, setPopupMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function confirmOrder(id) {
    const { error } = await supabase
      .from("orders")
      .update({ status: "received" })
      .eq("id", id);

    if (error) {
      setPopupMsg("Failed to update order status");
      console.error(error);
      return;
    }

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    setPopupMsg("Order marked as received!");
    setTimeout(() => setPopupMsg(""), 3000);
  }

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      let { data, error } = await supabase
        .from("orders")
        .select(`*, products(id, name, price, image_url)`)
        .eq("status", "confirmed")
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
      setIsLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen px-38 bg-[#acc8b1]">
      <UserNav />
      
      {/* Notification Popup */}
      {popupMsg && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
          popupMsg.includes("Failed") ? "bg-red-500" : "bg-green-500"
        }`}>
          {popupMsg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl mt-[-20px] md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Orders To Receive
        </h1>
        <p className="text-center text-gray-600 mb-12">Your confirmed orders that are on the way</p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mt-4">No orders to receive</h3>
            <p className="text-gray-500 mt-2">Your confirmed orders will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                {/* Product Image */}
                <div className="p-4 bg-gray-50 flex justify-center">
                  <img
                    src={order.products?.image_url}
                    alt={order.products?.name}
                    className="h-48 w-full object-contain"
                  />
                </div>
                
                {/* Order Details */}
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {order.products?.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Unit Price</p>
                      <p className="text-lg font-semibold text-green-600">
                        Rs. {order.products?.price}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="text-lg font-medium text-gray-700">
                        {order.quantity}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-bold text-gray-800">
                        Rs. {(order.products?.price * order.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {order.status}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-1">Order placed on:</p>
                  <p className="text-gray-700 mb-4">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Your order is on the way!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => confirmOrder(order.id)}
                    className="w-full bg-gradient-to-r from-[#b79494] to-[#926362] hover:from-[#a37878] hover:to-[#c1a9a9] text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  >
                    Mark as Received
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToReceive;