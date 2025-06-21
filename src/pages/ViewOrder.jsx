// // import React, { useEffect, useState } from "react";
// // // import { supabase } from "./supabaseClient";
// // // import { supabase } from "../supabaseClient";
// // import supabase from "../supabaseClient";
// // // import { QRCode } from "qrcode.react";

// // const ViewOrder = () => {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     async function fetchOrders() {
// //       let { data, error } = await supabase.from("orders").select(`
// //         *,
// //         products(id, name, price, image_url)
// //         `);
// //         if(error) {
// //           console.error("err fetching orders:", error);
// //         } else{
// //           setOrders(data);
// //         }
// //     }

// //     fetchOrders();
// //   }, []);

// //   //confirm order function
// //   async function confirmOrder(id){
// //     const {error} = await supabase
// //     .from("orders")
// //     .update({status: "confirmed"})
// //     .eq("id", id);

// //     if (error) {
// //       alert("Failed to confirm order");
// //       console.error(error);
// //       return;
// //     }

// //     // Remove order from the list locally
// //     setOrders(prevOrders => prevOrders.filter(order => order.id !== id));

// //     alert("Order confirmed!");
// //   }

// //   return (<div>
// //       <h2>Orders</h2>
// //       {orders.length === 0 && <p>No orders found.</p>}
// //       {orders.map((order) => (
// //         <div key={order.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
// //           <h3>{order.products?.name}</h3>
// //           <img src={order.products?.image} alt={order.products?.name} width="100" />
// //           <p>Price: Rs. {order.products?.price}</p>
// //           <p>Quantity: {order.quantity}</p>
// //           <p>Status: {order.status}</p>
// //           <br />
// //           <button onClick={() => confirmOrder(order.id)}  className="border rounded-xl cursor-pointer p-2 bg-green-300 m-2">Confirm Order</button>
// //         </div>

// //       ))}
// //   </div>)
// // };

// // export default ViewOrder;
// import React, { useEffect, useState } from "react";
// import supabase from "../supabaseClient";

// const ViewOrder = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     async function fetchOrders() {
//       let { data, error } = await supabase.from("orders").select(`
//         *,
//         products(id, name, price, image_url)
//       `);
//       if (error) {
//         console.error("err fetching orders:", error);
//       } else {
//         setOrders(data);
//       }
//     }

//     fetchOrders();
//   }, []);

//   // Function to confirm order
//   async function confirmOrder(id) {
//     // Update status in Supabase
//     const { error } = await supabase
//       .from("orders")
//       .update({ status: "confirmed" })
//       .eq("id", id);

//     if (error) {
//       alert("Failed to confirm order");
//       console.error(error);
//       return;
//     }

//     // Remove order from the list locally
//     setOrders(prevOrders => prevOrders.filter(order => order.id !== id));

//     alert("Order confirmed!");
//   }

//   return (
//     <div>
//       <h2>Orders</h2>
//       {orders.length === 0 && <p>No orders found.</p>}
//       {orders.map((order) => (
//         <div
//           key={order.id}
//           style={{ border: "1px solid gray", margin: 10, padding: 10 }}
//         >
//           <h3>{order.products?.name}</h3>
//           <img src={order.products?.image_url} alt={order.products?.name} width="100" />
//           <p>Price: Rs. {order.products?.price}</p>
//           <p>Quantity: {order.quantity}</p>
//           <p>Status: {order.status}</p>
//           <br />
//           <button
//             className="border rounded-xl cursor-pointer p-2 bg-green-300 m-2"
//             onClick={() => confirmOrder(order.id)}
//           >
//             Confirm Order
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewOrder;





import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import AdminNav from "../components/AdminNav";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [popupMsg, setPopupMsg] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      let { data, error } = await supabase
        .from("orders")
        .select(
          `
      *,
      products(id, name, price, image_url)
    `
        )
        .neq("status", "confirmed");

      if (error) {
        console.error("err fetching orders:", error);
      } else {
        setOrders(data);
      }
    }
    fetchOrders();
  }, []);

  async function confirmOrder(id) {
    const { error } = await supabase
      .from("orders")
      .update({ status: "confirmed" })
      .eq("id", id);

    if (error) {
      setPopupMsg("Failed to confirm order");
      console.error(error);
      return;
    }

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));

    setPopupMsg("Order confirmed!");

    // Hide popup after 1 second
    setTimeout(() => setPopupMsg(""), 1000);
  }

  return (
    <>
    <AdminNav/>
   
    <div>
      <h2>Orders</h2>

      {popupMsg && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#4caf50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {popupMsg}
        </div>
      )}

      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order) => (
        <div
          key={order.id}
          style={{ border: "1px solid gray", margin: 10, padding: 10 }}
        >
          <h3>{order.products?.name}</h3>
          <img
            src={order.products?.image_url}
            alt={order.products?.name}
            width="100"
          />
          <p>Price: Rs. {order.products?.price}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Status: {order.status}</p>
          <br />
          <button
            className="border rounded-xl cursor-pointer p-2 bg-green-300 m-2"
            onClick={() => confirmOrder(order.id)}
          >
            Confirm Order
          </button>
        </div>
      ))}
    </div>
     </>
  );
};

export default ViewOrder;


// My code first gets all orders from the database that are not confirmed yet.
// Then, it shows these orders on the page with their details. Each order has
// a “Confirm Order” button. When I click the button, the order status changes
// to “confirmed” in the database. The order is removed from the list on the
// page, and a small message appears for 1 second to show it is confirmed.
// When I refresh the page, only orders that are not confirmed show again.
// This way, the app updates the order status both in the database and
// on the page quickly and easily.
