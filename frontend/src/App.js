import { Box, Card, Grid2 } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
  const Name = localStorage.getItem("token");
  return (
      <Box className="App">
        <BrowserRouter>
          <Navbar />
          <Grid2 container spacing={0.5}>
            
            <Grid2 size={12}>
              <Routes>
                <Route
                  path="/"
                  element={<Home User={Name ? Name : "UserName"} />}
                />
                <Route path="/Register" element={<Register />} />
                <Route path="/SignIn" element={<SignIn />} />
              </Routes>
            </Grid2>
          </Grid2>
        </BrowserRouter>
      </Box>
  );
}

export default App;
