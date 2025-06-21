// import React, { useEffect, useState } from "react";
// import UserNav from "./UserNav";
// import supabase from "../supabaseClient";

// const Received = () => {
//   const [orders, setOrders] = useState([]);

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
//         .eq("status", "received");

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
//       <UserNav />
//       {orders.length === 0 && <p>No orders found.</p>}
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
//           <p>Status: {order.status}</p>
//           <br />

//           {/* <button
//             className="border rounded-xl cursor-pointer p-2 bg-green-300 m-2"
//             onClick={() => confirmOrder(order.id)}
//           >
//             Confirm Order
//           </button> */}
//         </div>
//       ))}
//     </>
//   );
// };

// export default Received;
import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import supabase from "../supabaseClient";

const Received = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      let { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          products(id, name, price, image_url)
        `)
        .eq("status", "received")
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Received Orders
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your successfully delivered purchases
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mt-4">No received orders</h3>
            <p className="text-gray-500 mt-2">Your completed orders will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Product Image */}
                <div className="p-4 bg-gray-50 flex justify-center">
                  <img
                    src={order.products?.image_url}
                    alt={order.products?.name}
                    className="h-48 w-full object-contain"
                  />
                </div>
                
                {/* Order Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {order.products?.name}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Delivered
                    </span>
                  </div>
                  
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
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="text-gray-700">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          Successfully delivered 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                  <button className="text-gray-600 hover:text-gray-800 font-medium">
                    Buy Again
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 font-medium">
                    Leave Review
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

export default Received;