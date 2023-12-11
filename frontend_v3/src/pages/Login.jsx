import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUri } from "../App";

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();
  const authenticateUser = async () => {
    try {
      const main_data = {
        email,
        password,
      };
      const response = await fetch(`${backendUri}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(main_data),
        // Add body data here if needed
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("pbg", data?.token);
      toast.success("Login Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setAuthenticated(true);
      setTimeout(() => {
        router("/dashboard");
      }, 2000);
    } catch (error) {
      // console.log(error)
      toast.error("Invalid Email or Password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 min-h-screen overflow-hidden lg:grid-cols-2">
      <div className=" lg:h-[1000px] flex flex-col items-center justify-between">
        <div></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authenticateUser();
          }}
          className="w-[350px]"
        >
          <h1 className="font-[800] text-[30px] pb-5 lemon text-[#44B486]">
            Login
          </h1>

          <p className="text-[14px] font-[600]  text-[#344054] pb-1">Email*</p>
          <input
            required
            style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="border text-[16px] rounded-[8px] outline-none text-[#667085] border-[#D0D5DD] font-[400] px-[14px] w-full py-[10px]"
          />
          <p className="text-[14px] font-[600] pt-[20px] text-[#344054] pb-1">
            Password*
          </p>
          <input
            required
            style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="border text-[16px] rounded-[8px] outline-none text-[#667085] border-[#D0D5DD] font-[400] px-[14px] w-full py-[10px]"
          />
          <p className="text-[14px] text-[#667085] font-[400] pt-[6px] pb-[24px]">
            Must be at least 8 characters.
          </p>
          <button
            type="submit"
            className=" bg-pr text-white text-[16px] flex items-center justify-center py-[12px] w-full rounded-[8px]"
          >
            Login
          </button>

          <p className="text-tbt text-[14px] text-center mt-5">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-pr font-[600]">
              Sign up
            </Link>
          </p>
        </form>
        <div className="px-[64px] w-full py-[32px]">
          <p className="text-[14px] text-[#667085] font-[500] ">
            © Ashutosh zawar{" "}
          </p>
        </div>
      </div>
      <div>
        <img
          src="/images/home.jpg"
          className="w-full h-[1000px] hidden lg:block  rounded-tl-[30px] rounded-bl-[30px]"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
