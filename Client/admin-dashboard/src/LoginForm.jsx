import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'ZeeBanglaMuktoMancho' && password === 'ZeeBanglaMuktoMancho') {
      // Successful login
      onLogin();
    } else {
      // Failed login
      alert('Invalid username or password');
    }
  };

  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-16 rounded-[30px] shadow-md w-[40%]"> {/* Adjust width and padding */}
        <h1 className="text-3xl text-center text-red-800 font-bold mb-6">
          Zee Bangla Mukto Mancho Admin Dashboard
        </h1>
        <h2 className="text-2xl text-black mt-10 font-medium mb-6">Login</h2> {/* Increase font size */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-4 border rounded-[15px] mb-6 hover:border-red-500 active:border-red-700 focus:outline-red-700"  // Adjust padding
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-4 border rounded-[15px] mb-6 hover:border-red-500 active:border-red-700 focus:outline-red-700" // Adjust padding
        />
        <button
          onClick={handleLogin}
          className="bg-red-500 text-white text-2xl p-4 rounded-[20px] w-full font-semibold hover:bg-red-800" // Adjust padding
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
