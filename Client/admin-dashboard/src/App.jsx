
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './LoginForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);

  useEffect(() => {
    // Fetch all users when the component mounts
    axios.get('http://localhost:3005/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch verified users when the component mounts
    axios.get('http://localhost:3005/verified-users')
      .then((response) => {
        setVerifiedUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching verified users:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch verified users when the component mounts
    axios.get('http://localhost:3005/unverified-users')
      .then((response) => {
        setUnverifiedUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching unverified users:', error);
      });
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleAccept = (userId) => {
    // Find the user by ID
    const userToAccept = users.find((user) => user._id === userId);
  
    // Remove the user from the 'All' tab
    setUsers(users.filter((user) => user._id !== userId));
  
    // Create a copy of the user data with the "label" property set to "accept"
    const userCopy = { ...userToAccept, label: 'accept' };
  
    // Update the user data in the database with the new label
    axios.post('http://localhost:3005/verified-users', userCopy)
      .then(() => {
        // User update was successful
        setVerifiedUsers([...verifiedUsers, userCopy]);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };
  
  

  const handleDecline = (userId) => {
    // Find the user by ID
    const userToDecline = users.find((user) => user._id === userId);

    // Remove the user from the 'All' tab
    setUsers(users.filter((user) => user._id !== userId));

    // Add the user to the 'Unverified User' tab

    const userCopy1 = { ...userToDecline, label: 'decline' };
  
    // Update the user data in the database with the new label
    axios.post('http://localhost:3005/unverified-users', userCopy1)
      .then(() => {
        // User update was successful
        setUnverifiedUsers([...unverifiedUsers, userToDecline]);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <div>
      {loggedIn ? (
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto p-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl text-red-800 font-semibold mt-5 mb-4">
              Welcome to ZeeBangla Muktomancho Admin Dashboard
            </h1>

            <div className="flex justify-center my-10">
              <button
                className={`${
                  activeTab === 'All' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                } py-2 px-4 rounded-lg mr-4 text-xl bg-red-100 `}
                onClick={() => setActiveTab('All')}
              >
                All
              </button>
              <button
                className={`${
                  activeTab === 'Verified' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                } py-2 px-4 rounded-lg mr-4 text-xl`}
                onClick={() => setActiveTab('Verified')}
              >
                Verified Users
              </button>
              <button
                className={`${
                  activeTab === 'Unverified' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
                } py-2 px-4 rounded-lg text-xl`}
                onClick={() => setActiveTab('Unverified')}
              >
                Unverified Users
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {activeTab === 'All' &&
                users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-[15px] shadow-md p-4 mb-4 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer hover:bg-red-100"
                  >
                    <div>
                      <h2 className="text-xl text-red-800 font-semibold mb-6">{user.name}</h2>
                      <div className="text-sm text-black mb-2">
                <strong>Address:</strong> {user.address}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>City:</strong> {user.city}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Pincode:</strong> {user.pinCode}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Representation 1:</strong> {user.representation}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Representation 2:</strong> {user.representation1}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Phone Number:</strong> {user.phoneNumber}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Phone Number 2:</strong> {user.phoneNumber1}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Registration:</strong> {user.regNumber}
              </div>
              <div className="text-sm text-black mb-2">
                <strong className="text-black">Id Proof 1:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 1
                  </a>
                </span>
              </div>
              <div className="text-sm text-black mb-2">
                <strong className="text-black">Id Proof 2:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard1}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 2
                  </a>
                </span>
              </div>
              <div className="text-sm text-black mb-2">
                <strong className="text-black">Registration Form:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.registrationForm}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View Form
                  </a>
                </span>
              </div>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <button
                        onClick={() => handleAccept(user._id)}
                        className="bg-green-500 text-white p-2 rounded-lg w-20 hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(user._id)}
                        className="bg-red-500 text-white p-2 rounded-lg w-20 hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}

{activeTab === 'Verified' &&
                verifiedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-green-100 rounded-[15px] shadow-md p-4 mb-4 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer"
                  >
                    {/* Display user details from the verifiedUsers schema */}
                    <div>
                      <h2 className="text-xl text-green-900 font-semibold mb-6">{user.name}</h2>
                      <div className="text-sm text-black mb-2">
                <strong>Address:</strong> {user.address}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Address:</strong> {user.address}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>City:</strong> {user.city}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Pincode:</strong> {user.pinCode}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Representation 1:</strong> {user.representation}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Representation 2:</strong> {user.representation1}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Phone Number:</strong> {user.phoneNumber}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Phone Number 2:</strong> {user.phoneNumber1}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Registration:</strong> {user.regNumber}
              </div>
              <div className="text-sm text-black mb-2">
                <strong className="text-black">Id Proof 1:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 1
                  </a>
                </span>
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong className="text-black">Id Proof 2:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard1}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 2
                  </a>
                </span>
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong className="text-black">Registration Form:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.registrationForm}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View Form
                  </a>
                </span>
              </div>
              </div>
                    {/* Add more user details as needed */}
                  </div>
                ))
              }



              {activeTab === 'Unverified' &&
                unverifiedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-red-100 rounded-[15px] shadow-md p-4 mb-4 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer"
                  >
                    
                    <div>
                      <h2 className="text-xl text-red-900 font-semibold mb-6">{user.name}</h2>
                      <div className="text-sm text-black mb-2">
                <strong>Address:</strong> {user.address}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Address:</strong> {user.address}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>City:</strong> {user.city}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Pincode:</strong> {user.pinCode}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Representation 1:</strong> {user.representation}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Representation 2:</strong> {user.representation1}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Phone Number:</strong> {user.phoneNumber}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Phone Number 2:</strong> {user.phoneNumber1}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="text-sm text-black mb-2">
                <strong>Registration:</strong> {user.regNumber}
              </div>
              <div className="text-sm text-black mb-2">
                <strong className="text-black">Id Proof 1:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 1
                  </a>
                </span>
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong className="text-black">Id Proof 2:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.aadharCard1}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View ID Proof 2
                  </a>
                </span>
              </div>
              <div className="text-sm text-red-600 mb-2">
                <strong className="text-black">Registration Form:</strong>
                <span className="text-blue-500 ml-2">
                  <a href={`https://backend.zeebanglamuktomancho.com/${user.registrationForm}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    View Form
                  </a>
                </span>
              </div>
              </div>
                    {/* Add more user details as needed */}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;