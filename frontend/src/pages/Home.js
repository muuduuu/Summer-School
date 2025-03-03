// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div>
      <div className="hero bg-dark text-white p-5">
        <h1>Welcome to the Event Registration</h1>
        <p>Register now to participate in exciting events!</p>
      </div>
      <div className="container my-5">
        <h2>About the Event</h2>
        <p>Details about the event...</p>
        <h2>Location</h2>
        <p>Location details...</p>
      </div>
    </div>
  );
};

export default Home;
