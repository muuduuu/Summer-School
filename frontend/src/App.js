import React from 'react';
import { BrowserRouter,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import SignIn from './pages/SignIn';}
import './App.css';

function App() {
  return (  
    <BrowserRouter>
      <Navbar />
        <Routes path="/" element={<Home />} />
        <Routes path="/register" element={<Register />} />
        <Routes path="/signin" element={<SignIn />} />
  
    </BrowserRouter>
  );
}

export default App;
