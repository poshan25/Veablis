// import React, { useEffect, useState } from "react";
// import UserNav from "./UserNav";
// import supabase from "../supabaseClient";

// const OrderStatus = () => {
//   const [orders, setOrders] = useState([]);
//   // const [popupMsg, setPopupMsg] = useState("");

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
//         .neq("status", "received");

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
//       <div>Order Status</div>
//        {orders.length === 0 && <p>No orders found.</p>}
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

// export default OrderStatus;








import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import supabase from "../supabaseClient";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      let { data, error } = await supabase
        .from("orders")
        .select(
          `*,
          products(id, name, price, image_url)`
        )
        .neq("status", "received")
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

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen px-38 bg-[#acc8b1]">
      <UserNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Your Order Status
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.8 5.5M21 21H7M7 13l-2.3 5.1A1 1 0 007 20h12a1 1 0 00.97-.757L21 13M16 16a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mt-4">No orders found</h3>
            <p className="text-gray-500 mt-2">Recent orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 md:flex">
                  {/* Product Image */}
                  <div className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                    <img
                      src={order.products?.image_url}
                      alt={order.products?.name}
                      className="w-full h-40 object-contain rounded-lg"
                    />
                  </div>
                  
                  {/* Order Details */}
                  <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800">
                        {order.products?.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
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
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="text-gray-700">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-lg font-bold text-gray-800">
                          Rs. {(order.products?.price * order.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#b79494] to-[#926362] text-white rounded-lg hover:from-[#a37878] hover:to-[#c1a9a9] transition">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;