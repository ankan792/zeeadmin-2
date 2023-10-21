import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './LoginForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [verifiedParticipants, setVerifiedParticipants] = useState([]);
  const [unverifiedParticipants, setUnverifiedParticipants] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentTab, setCurrentTab] = useState('Users'); // 'Users' or 'Participants'
  const [currentSubTab, setCurrentSubTab] = useState('All');

  useEffect(() => {
    // Fetch data based on currentTab and currentSubTab
    axios.defaults.baseURL = 'http://localhost:3005';

    const fetchData = async () => {
      try {
        let response;
        if (currentTab === 'Users') {
          if (currentSubTab === 'All') {
            response = await axios.get('/users');
            setUsers(response.data);
          } else if (currentSubTab === 'Verified') {
            response = await axios.get('/verified-users');
            setVerifiedUsers(response.data);
          } else if (currentSubTab === 'Unverified') {
            response = await axios.get('/unverified-users');
            setUnverifiedUsers(response.data);
          }
        } else if (currentTab === 'Participants') {
          if (currentSubTab === 'All') {
            response = await axios.get('/participants');
            setParticipants(response.data);
          } else if (currentSubTab === 'Verified') {
            response = await axios.get('/verified-participants');
            setVerifiedParticipants(response.data);
          } else if (currentSubTab === 'Unverified') {
            response = await axios.get('/unverified-participants');
            setUnverifiedParticipants(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentTab, currentSubTab]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setCurrentSubTab('All'); // Reset subtab to 'All' when switching main tabs
  };

  const handleAccept = (userId) => {
    // Find the user by ID
    const userToAccept = users.find((user) => user._id === userId);
  
    // Remove the user from the 'All' tab
    setUsers(users.filter((user) => user._id !== userId));
  
    // Create a copy of the user data with the "label" property set to "accept"
    const userCopy = { ...userToAccept, label: 'accept' };
  
    // Update the user data in the database with the new label
    axios.post('https://zee-bangla-mukto-mancho-admin-backend.vercel.app/verified-users', userCopy)
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
    axios.post('https://zee-bangla-mukto-mancho-admin-backend.vercel.app/unverified-users', userCopy1)
      .then(() => {
        // User update was successful
        setUnverifiedUsers([...unverifiedUsers, userToDecline]);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  const handleParticipantAccept = (participantId) => {
    // Find the participant by ID
    const participantToAccept = participants.find((participant) => participant._id === participantId);
  
    // Remove the participant from the 'Unverified' tab
    setParticipants(participants.filter((participant) => participant._id !== participantId));
  
    // Create a copy of the participant data with the "label" property set to "accept"
    const participantCopy = { ...participantToAccept, label: 'accept' };
  
    // Update the participant data in the database with the new label
    axios.post('http://localhost:3005/verified-participants', participantCopy)
      .then(() => {
        // Participant update was successful
        setVerifiedParticipants([...verifiedParticipants, participantToAccept]);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  
  const handleParticipantDecline = (participantId) => {
    // Find the participant by ID
    const participantToDecline = participants.find((participant) => participant._id === participantId);
  
    // Remove the participant from the 'Unverified' tab
    setParticipants(participants.filter((participant) => participant._id !== participantId));
  
    // Create a copy of the participant data with the "label" property set to "decline"
    const participantCopy = { ...participantToDecline, label: 'decline' };
  
    // Update the participant data in the database with the new label
    axios.post('http://localhost:3005/unverified-participants', participantCopy)
      .then(() => {
        // Participant update was successful
        setUnverifiedParticipants([...unverifiedParticipants, participantToDecline]);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <div>
      {loggedIn ? (
        <div className="bg-[#E6C8C8] min-h-screen">
          <div className="container mx-auto p-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl text-red-800 font-semibold mt-5 mb-4">
              Welcome to ZeeBangla Muktomancho Admin Dashboard
            </h1>
            <div className="flex justify-center my-10">
              <button
                className={`${
                  currentTab === 'Users' ? 'bg-black text-white' : 'bg-white text-gray-600'
                } py-2 px-4 rounded-lg mr-4 text-xl`}
                onClick={() => handleTabChange('Users')}
              >
                Users
              </button>
              <button
                className={`${
                  currentTab === 'Participants' ? 'bg-black text-white' : 'bg-white text-gray-600'
                } py-2 px-4 rounded-lg text-xl`}
                onClick={() => handleTabChange('Participants')}
              >
                Participants
              </button>
            </div>

            {/* Sub Tabs */}
            {currentTab === 'Users' && (
              <div className="flex justify-center my-6">
                <button
                  className={`${
                    currentSubTab === 'All' ? 'bg-black text-white' : 'bg-white text-gray-600'
                  } py-2 px-4 rounded-lg mr-4`}
                  onClick={() => setCurrentSubTab('All')}
                >
                  All
                </button>
                <button
                  className={`${
                    currentSubTab === 'Verified' ? 'bg-black text-white' : 'bg-white text-gray-600'
                  } py-2 px-4 rounded-lg mr-4`}
                  onClick={() => setCurrentSubTab('Verified')}
                >
                  Verified
                </button>
                <button
                  className={`${
                    currentSubTab === 'Unverified' ? 'bg-black text-white' : 'bg-white text-gray-600'
                  } py-2 px-4 rounded-lg`}
                  onClick={() => setCurrentSubTab('Unverified')}
                >
                  Unverified
                </button>
              </div>
            )}
            {currentTab === 'Participants' && (
              <div className="flex justify-center my-6">
                <button
                  className={`${
                    currentSubTab === 'All' ? 'bg-black text-white' : 'bg-white text-gray-600'
                  } py-2 px-4 rounded-lg mr-4`}
                  onClick={() => setCurrentSubTab('All')}
                >
                  All
                </button>
                <button
                  className={`${
                    currentSubTab === 'Verified' ? 'bg-black text-white' : 'bg-white text-gray-600'
                  } py-2 px-4 rounded-lg mr-4`}
                  onClick={() => setCurrentSubTab('Verified')}
                >
                  Verified
                </button>
                <button
                  className={`${
                    currentSubTab === 'Unverified' ? 'bg-black text-white' : 'bg-white text-gray-600'
                  } py-2 px-4 rounded-lg`}
                  onClick={() => setCurrentSubTab('Unverified')}
                >
                  Unverified
                </button>
              </div>
            )}

            {/* Display User or Participant Data Based on Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {(currentTab === 'Users' && currentSubTab === 'All') &&
                // Render user data
                users.map((user) => (
                  // ... (user card component)
                  <div
                  key={user._id}
                  className="bg-white rounded-[15px] shadow-md p-4 mb-4 border border-gray-300 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer hover:bg-white"
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
                        className="bg-[#2E7D31] text-white p-2 rounded-lg w-20 hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(user._id)}
                        className="bg-red-800 text-white p-2 rounded-lg w-20 hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              {(currentTab === 'Users' && currentSubTab === 'Verified') &&
                // Render verified user data
                verifiedUsers.map((user) => (
                  // ... (verified user card component)
                  <div
                  key={user._id}
                  className="bg-white rounded-[15px] shadow-md p-4 mb-4 border border-gray-300 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer hover:bg-white"
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
                    
                  </div>
                ))}
              {(currentTab === 'Users' && currentSubTab === 'Unverified') &&
                // Render unverified user data
                unverifiedUsers.map((user) => (
                  // ... (unverified user card component)
                  <div
                  key={user._id}
                  className="bg-white rounded-[15px] shadow-md p-4 mb-4 border border-gray-300 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer hover:bg-white"
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
                   
                  </div>
                ))}
              {(currentTab === 'Participants' && currentSubTab === 'All') &&
                // Render participant data
                participants.map((participant) => (
                  // ... (participant card component)
                  <div
                    key={participant._id}
                    className="bg-white rounded-[15px] shadow-md p-4 mb-4 border border-gray-300 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer hover:bg-white"
                  >
                    {/* Display participant details from the participants schema */}
                    <div>
                      <h2 className="text-xl text-red-800 font-semibold mb-6">{participant.name}</h2>
                      <div className="text-sm text-black mb-2">
                        <strong>Video link:</strong> {participant.videoLink}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Selected Category:</strong> {participant.selectedCategory}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Participant Name:</strong> {participant.participantName}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>For Myself:</strong> {participant.forMyself}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Age:</strong> {participant.age}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Gender:</strong> {participant.gender}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong className="text-black">Id Proof:</strong>
                        <span className="text-blue-500 ml-2">
                          <a href={`http//localhost:3005/${participant.aadharCard}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                            View ID Proof 
                          </a>
                        </span>
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Email:</strong> {participant.forMyChild}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Registration:</strong> {participant.childAge}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Child gender:</strong> {participant.childGender}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Parent name:</strong> {participant.parentName}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Relationship:</strong> {participant.relationship}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong className="text-black">Id Proof :</strong>
                        <span className="text-blue-500 ml-2">
                          <a href={`http://localhost:3005/${participant.aadharCard1}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                            View ID Proof 
                          </a>
                        </span>
                     </div>
                    </div>
                    <div className="flex mt-5 justify-between">
                      <button
                        onClick={() => handleParticipantAccept(participant._id)}
                        className="bg-[#2E7D31] text-white p-2 rounded-lg w-20 hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleParticipantDecline(participant._id)}
                        className="bg-red-800 text-white p-2 rounded-lg w-20 hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              {(currentTab === 'Participants' && currentSubTab === 'Verified') &&
                // Render verified participant data
                verifiedParticipants.map((participant) => (
                  // ... (verified participant card component)
                  <div
                    key={participant._id}
                    className="bg-white rounded-[15px] shadow-md p-4 mb-4 border border-gray-300 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer hover:bg-white"
                  >
                    {/* Display participant details from the participants schema */}
                    <div>
                      <h2 className="text-xl text-red-800 font-semibold mb-6">{participant.name}</h2>
                      <div className="text-sm text-black mb-2">
                        <strong>Video link:</strong> {participant.videoLink}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Selected Category:</strong> {participant.selectedCategory}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Participant Name:</strong> {participant.participantName}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>For Myself:</strong> {participant.forMyself}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Age:</strong> {participant.age}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Gender:</strong> {participant.gender}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong className="text-black">Id Proof:</strong>
                        <span className="text-blue-500 ml-2">
                          <a href={`http//localhost:3005/${participant.aadharCard}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                            View ID Proof 
                          </a>
                        </span>
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Email:</strong> {participant.forMyChild}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Registration:</strong> {participant.childAge}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Child gender:</strong> {participant.childGender}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Parent name:</strong> {participant.parentName}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Relationship:</strong> {participant.relationship}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong className="text-black">Id Proof :</strong>
                        <span className="text-blue-500 ml-2">
                          <a href={`http://localhost:3005/${participant.aadharCard1}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                            View ID Proof 
                          </a>
                        </span>
                     </div>
                    </div>
                  </div>
                ))}
              {(currentTab === 'Participants' && currentSubTab === 'Unverified') &&
                // Render unverified participant data
                unverifiedParticipants.map((participant) => (
                  // ... (unverified participant card component)
                  <div
                    key={participant._id}
                    className="bg-white rounded-[15px] shadow-md p-4 mb-4 border border-gray-300 flex flex-col justify-between hover:translate-y-2 hover:transition hover:ease-linear hover:cursor-pointer hover:bg-white"
                  >
                    {/* Display participant details from the participants schema */}
                    <div>
                      <h2 className="text-xl text-red-800 font-semibold mb-6">{participant.name}</h2>
                      <div className="text-sm text-black mb-2">
                        <strong>Video link:</strong> {participant.videoLink}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Selected Category:</strong> {participant.selectedCategory}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Participant Name:</strong> {participant.participantName}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>For Myself:</strong> {participant.forMyself}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Age:</strong> {participant.age}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Gender:</strong> {participant.gender}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong className="text-black">Id Proof:</strong>
                        <span className="text-blue-500 ml-2">
                          <a href={`http//localhost:3005/${participant.aadharCard}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                            View ID Proof 
                          </a>
                        </span>
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Email:</strong> {participant.forMyChild}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Registration:</strong> {participant.childAge}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Child gender:</strong> {participant.childGender}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Parent name:</strong> {participant.parentName}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong>Relationship:</strong> {participant.relationship}
                      </div>
                      <div className="text-sm text-black mb-2">
                        <strong className="text-black">Id Proof :</strong>
                        <span className="text-blue-500 ml-2">
                          <a href={`http://localhost:3005/${participant.aadharCard1}`} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                            View ID Proof 
                          </a>
                        </span>
                     </div>
                    </div>
                  </div>
                ))}
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
