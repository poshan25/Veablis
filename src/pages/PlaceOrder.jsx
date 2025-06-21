// // // what this page does
// // // When user clicks Buy, they go to /order/5
// // // 👉 5 is the product ID

// // // On this page we will:

// // // Read that ID from the URL

// // // Fetch that product from Supabase

// // // Show product info

// // // Later, we'll add an order form

// // import React, { useState, useEffect } from "react";
// // import supabase from "../supabaseClient";
// // import { useParams } from "react-router-dom";
// // import UserNav from "../components/UserNav";

// // const PlaceOrder = () => {
// //   const { productId } = useParams(); //url bata id lina ko lagi: http://localhost:5173/order/3
// //   const [quantity, setQuantity] = useState(1);
// //   const [userId, setuserId] = useState(null);

// //   const [product, setProduct] = useState(null);

// //   const handleBuy = async () => {
// //     const { data, error } = await supabase.from("orders").insert([
// //       {
// //         user_id: userId, // supabase auth bata aucha
// //         product_id: product.id,
// //         quantity: quantity,
// //         status: "pending",
// //       },
// //     ])
// //     .select(); // return garcha insert data lai
// //     if (error) {
// //       console.error("Order error:", error);
// //     } else {
// //       alert("Order placed!");
// //       console.log("data:", data)
// //     }
// //   };
// //   if (!productId) return <div>No product selected</div>;


// //   useEffect(() => {
// //     async function fetchProduct() {
// //       const { data, error } = await supabase
// //         .from("products") // connect to products table
// //         .select("*") // get all columns
// //         //find rows jaha id column equal cha productId ko
// //         .eq("id", productId) //supabase bata auta product id bata fetch garna ko lagi

// //         // 1 uta matra object return garna ko lagi, array not return garna ko lagi
// //         .single();

// //       if (error) {
// //         console.error(error);
// //       } else {
// //         setProduct(data);
// //       }
// //     }
// //     fetchProduct();
// //   }, [productId]);

// //   // fetching hudha loading show
// //   if (!product) return <div>Loading...</div>;

// //   return (
// //     // product information show
// //     <>
// //     <UserNav/>
// //     <div className="border p-5 w-fit m-5">
// //       <div>
// //         <h1>{product.name}</h1>
// //         <img className="w-23" src={product.image_url} alt={product.name} />
// //         <p>{product.description}</p>
// //         <p>Price: Rs. {product.price}</p>
// //       </div>
// //       <br />
// //       <div>
// //         <div className="flex gap-2 border p-1 ">
// //           <p>quantity:</p>
// //           <input
// //             type="number"
// //             value={quantity}
// //             min={1}
// //             onChange={(e) => setQuantity(Number(e.target.value))}
// //           />
// //         </div>
// //         <button
// //           onClick={handleBuy}
// //           className="border p-2 cursor-pointer hover:bg-amber-300 bg-green-400"
// //         >
// //           Buy
// //         </button>
// //       </div>
// //     </div>
// //     </>
// //   );
// // };

// // export default PlaceOrder;




// // // buy ma click hudha we go to route order/4
// // // on the order page we get that
// // // id form url ra tio id ko info fetch


















// import React, { useState, useEffect } from "react";
// import supabase from "../supabaseClient";
// import { useParams, useNavigate } from "react-router-dom";
// import UserNav from "../components/UserNav";

// const PlaceOrder = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [userId, setUserId] = useState(null);
//   const [product, setProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProduct() {
//       setIsLoading(true);
//       const { data, error } = await supabase
//         .from("products")
//         .select("*")
//         .eq("id", productId)
//         .single();

//       if (error) {
//         console.error(error);
//       } else {
//         setProduct(data);
//       }
//       setIsLoading(false);
//     }
//     fetchProduct();
//   }, [productId]);

//   const handleBuy = async () => {
//     const { data, error } = await supabase
//       .from("orders")
//       .insert([
//         {
//           user_id: userId,
//           product_id: product.id,
//           quantity: quantity,
//           status: "pending",
//         },
//       ])
//       .select();

//     if (error) {
//       console.error("Order error:", error);
//       alert("Failed to place order. Please try again.");
//     } else {
//       alert("Order placed successfully!");
//       navigate("/user");
//     }
//   };

//   if (!productId) return <div className="min-h-screen bg-gray-50 p-8 text-center">No product selected</div>;
//   if (isLoading) return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="animate-pulse text-xl text-gray-600">Loading product details...</div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <UserNav />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
//           {/* Product Image */}
//           <div className="md:w-1/2 lg:w-2/5 bg-gray-100 flex items-center justify-center p-8">
//             <img 
//               src={product.image_url} 
//               alt={product.name} 
//               className="w-full h-auto max-h-96 object-contain rounded-lg"
//             />
//           </div>
          
//           {/* Product Details */}
//           <div className="md:w-1/2 lg:w-3/5 p-8 md:p-12">
//             <div className="mb-6">
//               <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
//                 Premium Hemp Product
//               </span>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//                 {product.name}
//               </h1>
//               <p className="text-xl font-semibold text-green-600 mb-6">
//                 Rs. {product.price}
//               </p>
//               <p className="text-gray-600 mb-8 leading-relaxed">
//                 {product.description}
//               </p>
//             </div>
            
//             {/* Order Form */}
//             <div className="border-t border-gray-200 pt-6">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
//                 <div className="w-full sm:w-auto">
//                   <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
//                     Quantity
//                   </label>
//                   <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                     <button 
//                       onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//                       className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       id="quantity"
//                       min="1"
//                       value={quantity}
//                       onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
//                       className="w-16 text-center border-0 focus:ring-0"
//                     />
//                     <button 
//                       onClick={() => setQuantity(prev => prev + 1)}
//                       className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="w-full sm:w-auto">
//                   <p className="text-sm text-gray-500 mb-2">Total Price</p>
//                   <p className="text-2xl font-bold text-gray-800">
//                     Rs. {(product.price * quantity).toFixed(2)}
//                   </p>
//                 </div>
//               </div>
              
//               <button
//                 onClick={handleBuy}
//                 className="w-full bg-gradient-to-r from-[#b79494] to-[#926362] hover:from-[#a37878] hover:to-[#c1a9a9] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//               >
//                 Place Order
//               </button>
              
//               <button
//                 onClick={() => navigate(-1)}
//                 className="w-full mt-4 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition"
//               >
//                 Back to Products
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;























import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useParams, useNavigate } from "react-router-dom";
import UserNav from "../components/UserNav";
import Footer from "./Footer";

const PlaceOrder = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error(error);
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    }
    fetchProduct();
  }, [productId]);

  const handleBuy = async () => {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          product_id: product.id,
          quantity: quantity,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Order error:", error);
      alert("Failed to place order. Please try again.");
    } else {
      alert("Order placed successfully!");
      navigate("/");
    }
  };

  if (!productId) return <div className="min-h-screen bg-[#acc8b1] p-8 text-center">No product selected</div>;
  if (isLoading) return (
    <div className="min-h-screen bg-[#acc8b1] flex items-center justify-center">
      <div className="animate-pulse text-xl text-gray-600">Loading product details...</div>
    </div>
  );

  return (
  
    <div>
        <div className="min-h-screen  px-38  bg-[#acc8b1] flex flex-col">
      <UserNav />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 lg:w-2/5 bg-gray-100 flex items-center justify-center p-8">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-auto max-h-96 object-contain rounded-lg"
              />
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 lg:w-3/5 p-8 md:p-12">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
                  Premium Hemp Product
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <p className="text-xl font-semibold text-green-600 mb-6">
                  Rs. {product.price}
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Order Form */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                  <div className="w-full sm:w-auto">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-16 text-center border-0 focus:ring-0"
                      />
                      <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <p className="text-sm text-gray-500 mb-2">Total Price</p>
                    <p className="text-2xl font-bold text-gray-800">
                      Rs. {(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleBuy}
                  className="w-full bg-gradient-to-r from-[#b79494] to-[#926362] hover:from-[#a37878] hover:to-[#c1a9a9] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Place Order
                </button>
                
                <button
                  onClick={() => navigate(-1)}
                  className="w-full mt-4 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition"
                >
                  Back to Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

     {/* <Footer/> */}
    </div>
      <Footer/>
    </div>
  );
};

export default PlaceOrder;