
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Nav from "./Nav";
import UserNav from "../components/UserNav";
import Footer from "./Footer";
// import productsNav from "./productsNav";

const products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }

      setLoading(false)
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Fetching...</p>; 
  }
  
  return (
    
    <div>

        <div className="min-h-screen  bg-gradient-to-b from-[#cfe3d4] to-[#95b59a]  sm:px-6 pb-20">
      <div className=" px-38">
        <UserNav/>
 {/* <productsNav /> */}
      
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl  pt-30 sm:text-4xl font-bold mb-8 text-center text-gray-800">
          New Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#e1f2e6] rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-lg font-semibold text-green-600 mb-3">
                  Rs. {product.price}
                </p>
                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`/order/${product.id}`)}
                    className="flex-1 bg-gradient-to-r from-[#94ce4c] to-[#5baf2f] hover:from-[#a37878] hover:to-[#c1a9a9] text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

    </div>
                   <Footer/>

    </div>
  );
};

export default products;