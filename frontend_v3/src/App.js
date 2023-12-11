import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import BlankPage from "./pages/BlankPage";
export const backendUri = process.env.REACT_APP_BACKEND_URI;

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("pbg")) {
      setAuthenticated(true);
    }
    else{
      setAuthenticated(false)
    }
  }, [authenticated]);

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full relative">
        <ToastContainer />
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<Signup setAuthenticated={setAuthenticated} />}
          />
          {authenticated === false ? (
            <Route path="/dashboard" element={<BlankPage />} />
          ) : (
            <Route path="/dashboard" element={<Dashboard setAuthenticated={setAuthenticated}/>} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
