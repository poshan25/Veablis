// // // // import React, { useEffect } from "react";
// // // // import UserNav from "./UserNav";
// // // // import supabase from "../supabaseClient";

// // // // const UserCart = () => {
// // // //     const [cartProducts, setCartProducts] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchCart = async () => {
// // // //       const { data: cartItems, error: cartError } = await supabase
// // // //         .from("cart")
// // // //         .select("product_id");

// // // //       if (cartError) {
// // // //         console.error("Failed to fetch cart items:", cartError);
// // // //         return;
// // // //       }

// // // //       const productIds = cartItems.map((item) => item.product_id);

// // // //       if (productIds.length === 0) return;

// // // //       const { data: products, error: productError } = await supabase
// // // //         .from("products")
// // // //         .select("*")
// // // //         .in("id", productIds);

// // // //       if (productError) {
// // // //         console.error("Failed to fetch products:", productError);
// // // //       } else {
// // // //         setCartProducts(products);
// // // //       }
// // // //     };

// // // //     fetchCart();
// // // //   }, []);

// // // //   return (
// // // //     <>
// // // //       <UserNav />
// // // //       <div>UserCart</div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default UserCart;


// // // import { useEffect, useState } from "react";
// // // import supabase from "../supabaseClient";
// // // import Nav from "../pages/Nav";

// // // const UserCart = () => {
// // //   const [cartProducts, setCartProducts] = useState([]);

// // //   useEffect(() => {
// // //     const fetchCart = async () => {
// // //       const { data: cartItems, error: cartError } = await supabase
// // //         .from("cart")
// // //         .select("product_id");

// // //       if (cartError) {
// // //         console.error("Failed to fetch cart items:", cartError);
// // //         return;
// // //       }

// // //       const productIds = cartItems.map((item) => item.product_id);

// // //       if (productIds.length === 0) return;

// // //       const { data: products, error: productError } = await supabase
// // //         .from("products")
// // //         .select("*")
// // //         .in("id", productIds);

// // //       if (productError) {
// // //         console.error("Failed to fetch products:", productError);
// // //       } else {
// // //         setCartProducts(products);
// // //       }
// // //     };

// // //     fetchCart();
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <Nav />
// // //       <div className="border w-fit p-2 m-2">
// // //         {cartProducts.map((product) => (
// // //           <div key={product.id}>
// // //             <p>
// // //               {product.name} - Rs. {product.price}
// // //             </p>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserCart;







// // import { useEffect, useState } from "react";
// // import supabase from "../supabaseClient";

// // const UserCart = () => {
// //   const [cartProducts, setCartProducts] = useState([]);

// //   async function removeFromCart(cartItemId) {
// //     const {error} = await supabase
// //     .from('cart')
// //     .delete()
// //     .eq('id', cartItemId);
    
// //   if (error) {
// //     console.error("Failed to remove from cart:", error);
// //     alert("Failed to remove item from cart.");
// //   } else {
// //     alert("Item removed from cart.");
// //     // Optionally refresh cart product removel ko pachi ko lagi
// //     fetchCart();
// //   }
// // }

// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       const { data: cartItems, error: cartError } = await supabase
// //         .from("cart")
// //         .select("product_id");

// //       if (cartError) {
// //         console.error("Failed to fetch cart items:", cartError);
// //         return;
// //       }

// //       const productIds = cartItems.map(item => item.product_id);

// //       if (productIds.length === 0) return;

// //       const { data: products, error: productError } = await supabase
// //         .from("products")
// //         .select("*")
// //         .in("id", productIds);

// //       if (productError) {
// //         console.error("Failed to fetch products:", productError);
// //       } else {
// //         setCartProducts(products);
// //       }
// //     };

// //     fetchCart();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {cartProducts.map((product) => (
// //           <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
// //             <img
// //               src={product.image_url}
// //               alt={product.name}
// //               className="w-full h-48 object-cover rounded mb-4"
// //             />
// //             <h2 className="text-lg font-semibold">{product.name}</h2>
// //             <p className="text-gray-600 mb-1">Rs. {product.price}</p>
// //             <p className="text-sm 
// //              text-gray-500">{product.description}</p>
// //               <button  onClick={() => removeFromCart(item.id)} className="remove-btn border p-2 m-2 rounded-lg cursor-pointer bg-red-400 text-white font-bold">
// //       Remove from Cart
// //     </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserCart;







// import { useEffect, useState } from "react";
// import supabase from "../supabaseClient";

// const UserCart = () => {
//   const [cartProducts, setCartProducts] = useState([]);

//   async function removeFromCart(cartItemId) {
//     const { error } = await supabase
//       .from("cart")
//       .delete()
//       .eq("id", cartItemId);

//     if (error) {
//       console.error("Failed to remove from cart:", error);
//       alert("Failed to remove item from cart.");
//     } else {
//       alert("Item removed from cart.");
//       fetchCart();  // Refresh cart after removal
//     }
//   }

//   async function fetchCart() {
//     const { data: cartItems, error: cartError } = await supabase
//       .from("cart")
//       .select(`
//         id,
//         product:product_id (id, name, price, description, image_url)
//       `);

//     if (cartError) {
//       console.error("Failed to fetch cart items:", cartError);
//       return;
//     }

//     setCartProducts(cartItems);
//   }

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cartProducts.length === 0 && <p>Your cart is empty.</p>}

//         {cartProducts.map((item) => (
//           <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
//             <img
//               src={item.product.image_url}
//               alt={item.product.name}
//               className="w-full h-48 object-cover rounded mb-4"
//             />
//             <h2 className="text-lg font-semibold">{item.product.name}</h2>
//             <p className="text-gray-600 mb-1">Rs. {item.product.price}</p>
//             <p className="text-sm text-gray-500">{item.product.description}</p>
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="remove-btn border p-2 m-2 rounded-lg cursor-pointer bg-red-400 text-white font-bold"
//             >
//               Remove from Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserCart;






















import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Nav from "../pages/Nav";
import UserNav from "./UserNav";

const UserCart = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      // Step 1: Fetch all cart items
      const { data: cartItems, error: cartError } = await supabase
        .from("cart")
        .select("*"); // get all columns including product_id and id (cart item id)

      if (cartError) {
        console.error("Failed to fetch cart items:", cartError);
        return;
      }

      console.log(cartProducts.length)
      // Step 2: Get all product IDs from cart items
      const productIds = cartItems.map(item => item.product_id);


      // Step 3: Fetch products by IDs
      const { data: products, error: productError } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

      if (productError) {
        console.error("Failed to fetch products:", productError);
        return;
      }

      // Step 4: Combine cart items with product details
      const combined = cartItems.map(cartItem => {
        return {
          ...cartItem, // includes cart id, product_id, etc.
          product: products.find(prod => prod.id === cartItem.product_id),
        };
      });

      setCartProducts(combined);
    };

    fetchCartAndProducts();
  }, []);

  async function removeFromCart(cartItemId) {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      console.error("Failed to remove from cart:", error);
      alert("Failed to remove item from cart.");
    } else {
      alert("Item removed from cart.");
      // Refresh cart after removing
      // You might want to call fetchCartAndProducts here or use a better state management
      //AILA KO LAGI WORST WAY HO CHITAI IMPROVE GARCHU
      //AILE KAM VAI RAKHYA CHA , JUST FOR NOW
      // window.location.reload();
      setCartProducts(prev => prev.filter((item => item.id !== cartItemId)))
    }
  }

  return (
    <div className="min-h-screen px-38 bg-gradient-to-b from-[#cfe3d4] to-[#95b59a] p-6">
        <UserNav cartLength={cartProducts.length}/>
      <h1 className="text-2xl font-bold text-center mt-10 mb-6">My Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {cartProducts.length === 0 && <p>Your cart is empty.</p>} */}

        {cartProducts.map(({ id, product }) => (
          product && (
            <div
              key={id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 mb-1">Rs. {product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              <button className="bg-green-500 mt-2 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all" onClick={() => navigate(`/order/${product.id}`)}>Buy</button>
              <button
                onClick={() => removeFromCart(id)}
                className="remove-btn border p-2 m-2 rounded-lg cursor-pointer bg-red-400 text-white font-bold"
              >
                Remove from Cart
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default UserCart;
