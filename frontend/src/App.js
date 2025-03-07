// App.js
import React from 'react';
import { Box, ThemeProvider, Grid2 } from '@mui/material';
import theme from './components/theme';
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from './pages/About';
import UserDashboard from './pages/UserDashboard'; 
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const Name = localStorage.getItem("token");
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box className="App">
          <Navbar />
          <Grid2 container spacing={0.5}>
            <Grid2 size={12}>
              <Routes>
                <Route path="/" element={<Home User={Name ? Name : "UserName"} />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/About" element={<About />} />
                <Route path="/UserDashboard" element={<UserDashboard />} /> {/* New */}
                <Route path="/AdminDashboard" element={<AdminDashboard />} /> {/* New */}
              </Routes>
            </Grid2>
          </Grid2>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
