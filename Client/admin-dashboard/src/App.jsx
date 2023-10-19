import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make an Axios GET request to fetch data from your server
    axios.get('http://localhost:3005/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="bg-red-100 min-h-screen">
      <div className="container mx-auto p-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-red-800 font-semibold mt-5 mb-4">Welcome to ZeeBangla Muktomancho Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {users.map((user) => (
            <div
              key={user._id} // Assuming MongoDB _id is used
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <h2 className="text-lg text-red-800 font-semibold mb-2">{user.name}</h2>
              <div className="text-sm text-red-600 mb-2">
                <strong>Address:</strong> {user.address}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>City:</strong> {user.city}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>Pincode:</strong> {user.pinCode}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>Representation 1:</strong> {user.representation}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>Representation 2:</strong> {user.representation1}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>Phone Number:</strong> {user.phoneNumber}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>Phone Number 2:</strong> {user.phoneNumber1}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong>Registration:</strong> {user.regNumber}
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong className="text-red-600">Id Proof 1:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 1
                  </a>
                </span>
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong className="text-red-600">Id Proof 2:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard1}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 2
                  </a>
                </span>
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong className="text-red-600">Registration Form:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.registrationForm}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View Form
                  </a>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
