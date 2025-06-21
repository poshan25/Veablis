// import { useState, useEffect } from "react";
// import supabase from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// const UserProducts = () => {
//     const navigate = useNavigate();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       let { data, error } = await supabase
//         .from("products") // supabase ko table name
//         .select("*"); // sabai column lai get garna

//       if (error) {
//         console.log("err fetching products: ", error);
//       } else {
//         setProducts(data);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleBuyClick = () => {
//     alert("Product added to cart");
//   }

//   return (
//     <div>
//       {/* <h1 className="font-bold">Data</h1> */}
//       <div>
//         {products.map((product,id) => (
//           <div key={id} className="border m-5 p-2" >
//             <p>{product.name}</p>
//             <p>{product.price}</p>
//             <img className="w-25" src={product.image_url} alt="img" />
//             <p>{product.description}</p>
//             <br /><br />
//             <button  className="border rounded-xl px-5 py-2 curser-pointer bg-green-400 hover:bg-amber-400" onClick={() => navigate(`/order/${product.id}`)}>Buy</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserProducts;







import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const UserProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border shadow-md rounded-xl p-4 flex flex-col items-center"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">Rs. {product.price}</p>
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>

            <button
              onClick={() => navigate(`/order/${product.id}`)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
