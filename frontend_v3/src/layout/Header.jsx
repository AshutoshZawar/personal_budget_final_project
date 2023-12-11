import React, { useState } from "react";
import { NavLink, redirect } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = ({ authenticated, setAuthenticated }) => {
  const [toggle, setToggle] = useState(false);

  const logout = () => {
    localStorage.removeItem("pbg");
    setAuthenticated(false);
  };
  return (
    <div className="bg-[#44B486] px-[20px] lg:px-[64px] py-[15px] flex items-center justify-between w-full ">
      <div>
        <h1 className="text-white ">PERSONAL BUDGET</h1>
      </div>
      {authenticated  ? (
        <div
          className={`fixed z-20 lg:relative flex-col lg:flex-row ${
            toggle ? "flex" : "hidden lg:flex"
          } w-full lg:w-auto items-center gap-5 justify-center h-full bg-[#44B486] top-0 left-0 lg:bg-transparent lg:gap-[32px]`}
        >
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-[#ffffff] border-b border-[#ffffff] text-[16px] leading-[24px] "
                : "text-white text-[16px] leading-[24px] "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-[#ffffff] border-b border-[#ffffff] text-[16px] leading-[24px] "
                : "text-white text-[16px] leading-[24px] "
            }
          >
            Dashboard
          </NavLink>

          <button className="text-white" onClick={logout}>
            Logout
          </button>

          <AiOutlineClose
            onClick={() => setToggle(false)}
            className="w-6 h-6 absolute lg:hidden cursor-pointer top-3 right-3 z-20 text-white"
          />
        </div>
      ) : (
        <div
          className={`fixed z-20 lg:relative flex-col lg:flex-row ${
            toggle ? "flex" : "hidden lg:flex"
          } w-full lg:w-auto items-center gap-5 justify-center h-full bg-[#44B486] top-0 left-0 lg:bg-transparent lg:gap-[32px]`}
        >
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-[#ffffff] border-b border-[#ffffff] text-[16px] leading-[24px] "
                : "text-white text-[16px] leading-[24px] "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-[#ffffff] border-b border-[#ffffff] text-[16px] leading-[24px] "
                : "text-white text-[16px] leading-[24px] "
            }
          >
            Login
          </NavLink>
        </div>
      )}

      <FaBars
        onClick={() => setToggle(true)}
        className="w-6 h-6 cursor-pointer lg:hidden  text-white "
      />
    </div>
  );
};

export default Header;
