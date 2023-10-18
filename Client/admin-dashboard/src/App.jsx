import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Make an Axios GET request to fetch data from your server
    axios.get('http://localhost:3000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="bg-red-100 min-h-screen">
      <div className="container mx-auto p-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-red-800 font-semibold mt-5 mb-4">Welcome to ZeeBangla Muktomancho Admin DashBoard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product._id} // Assuming MongoDB _id is used
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <h2 className="text-lg text-red-800 font-semibold mb-2">{product.name}</h2>
              <div className="text-sm text-red-600 mb-2">
                <strong>Bio:</strong> ${product.price}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>User Info:</strong> {product.quantity}
              </div>
              <div className="text-sm text-red-600">
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default App;
