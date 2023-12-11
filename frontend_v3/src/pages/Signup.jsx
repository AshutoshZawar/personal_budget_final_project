import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUri } from "../App";

const Signup = ({setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();
  const handleSignUp = async () => {
    try {
      const main_data = {
        name: username,
        email,
        password,
      };
      const response = await fetch(`${backendUri}/api/register`, {
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
      toast.success("Sign up Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setAuthenticated(true)
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
            handleSignUp();
          }}
          className="w-[350px] mt-10 lg:mt-0"
        >
          <h1 className="font-[800] text-[30px] lemon text-[#44B486]">
            SIGN UP
          </h1>
          <p className="text-[16px] text-[#667085] font-[400] pt-[12px] pb-[32px]">
            Get started{" "}
          </p>
          <p className="text-[14px] font-[600] text-[#344054] pb-1">Name*</p>
          <input
            required
            style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="border text-[16px] rounded-[8px] outline-none text-[#667085] border-[#D0D5DD] font-[400] px-[14px] w-full py-[10px]"
          />

          <p className="text-[14px] font-[600] pt-[20px] text-[#344054] pb-1">
            Email*
          </p>
          <input
            required
            style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border text-[16px] rounded-[8px] outline-none text-[#667085] border-[#D0D5DD] font-[400] px-[14px] w-full py-[10px]"
          />

          <p className="text-[14px] font-[600] pt-[20px] text-[#344054] pb-1">
            Password*
          </p>
          <input
            required
            style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="border text-[16px] rounded-[8px] outline-none text-[#667085] border-[#D0D5DD] font-[400] px-[14px] w-full py-[10px]"
          />

          <p className="text-[14px] text-[#667085] font-[400] pt-[6px] pb-[24px]">
            Must be at least 8 characters.
          </p>
          <button
            type="submit"
            className=" bg-pr text-white text-[16px] flex items-center justify-center py-[12px] w-full rounded-[8px]"
          >
            Get started
          </button>

          <p className="text-tbt text-[14px] text-center mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-pr font-[600]">
              Log in
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
          className="w-full hidden lg:block h-[1000px]  rounded-tl-[30px] rounded-bl-[30px]"
          alt=""
        />
      </div>
    </div>
  );
};

export default Signup;
