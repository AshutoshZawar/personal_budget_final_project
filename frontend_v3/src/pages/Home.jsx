import { Link } from "react-router-dom";

import React, { useState } from "react";

const Home = () => {
  return (
    <div className="min-h-screen w-full ">
      <section className="    w-full bg-[#D5F7E6]">
        <div className="grid grid-cols-1  w-full h-full lg:grid-cols-2 items-center">
          <div className="pl-[16px] p-5 lg:pl-[50px]">
            <h1 className="text-[67px] text-pr font-[700] uppercase  lemon">
              Personal Budget
            </h1>
            <p className="text-pr">
              A personal-budget management web application.
            </p>
            <div className="flex">
              <Link
                to="/dashboard"
                className="text-[14px] mt-10 flex items-center gap-2 rounded-[8px] text-white bg-pr py-[10px] px-[16px]"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div>
            <img src="/images/hero.svg" className="w-full h-full " alt="" />
          </div>
        </div>
      </section>
      <section className="w-full  mt-10">
        <div className="container mx-auto py-5">
          <div
            className="text-center position-relative pb-3 mb-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-0 text-[32px] lg:text-[56px]">What We Do ?</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-[50px] w-full">
            <div className="service-item bg-[#D5F7E6] w-full rounded flex flex-col items-center justify-center text-center">
              <div className="service-icon ">
                {/* <i className="bi bi-amd text-white"></i> */}
                <i className="fa fa-chart-pie text-white"></i>
              </div>
              <h4 className="mb-3 font-[700] text-[18px]">Stay on Track</h4>
              <p className="m-0">
                Do you know where you are spending your money? If you really
                stop to track it down, you would get surprised!
              </p>
              <a className="btn btn-lg bg-dark btn-primary rounded" href="">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="service-item w-full bg-[#D5F7E6] rounded flex flex-col items-center justify-center text-center">
              <div className="service-icon">
                <i className="fa fa-bell text-white"></i>
              </div>
              <h4 className="mb-3 font-[700] text-[18px]">Alerts</h4>
              <p className="m-0">
                When you wii know how much is your income & how much you are
                spending then you will be more alert.
              </p>
              <a className="btn btn-lg btn-primary  bg-dark  rounded" href="">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="service-item bg-[#D5F7E6] rounded flex flex-col items-center justify-center text-center">
              <div className="service-icon">
                <i className="fa fa-chart-line text-white"></i>
              </div>
              <h4 className="mb-3 font-[700] text-[18px]">Growth</h4>
              <p className="m-0">
                When you have proper statistics of your daily life you will be
                aware of you growth.
              </p>
              <a className="btn btn-lg btn-primary  bg-dark  rounded" href="">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Empower />
      <div className="mt-20 bg-[#44B486] w-full py-[20px] ">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-[14px] text-white font-[500] ">© Ashutosh zawar</p>

          <p onClick={()=>{
            window.scrollTo(0,0)
          }} className="text-[14px] text-white font-[500] cursor-pointer ">Back To Top</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

const Empower = () => {
  const [hoverActive, setHoverActive] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const handleMouseLeave = () => {
    if (clicked) {
      setClicked(false);
    }
  };
  return (
    <div className=" container mx-auto  grid grid-cols-1  mt-20 lg:grid-cols-5">
      <div className="lg:col-span-2 relative p-[16px] lg:p-[40px] bg-[#D5F7E6]">
        <div className="relative z-20">
          <h1 className="text-txt onest text-[40px] lg:text-[48px] font-[500] leading-[40px] lg:leading-[48px]">
            Results & Benifits
          </h1>
          <p className="text-[18px] text-txt mt-[24px] leading-[24px]">
            People who stick to finantical plan, budgeting every expense, get
            out of debt faster! ALso, they to live happier lives since they
            expend without guild or fear.
          </p>
        </div>

        <div className=" lg:absolute mt-[24px] lg:mt-0 wtkwu w-full lg:w-auto right-[24px] z-30 bottom-[24px]">
          <Link
            to="/dashboard"
            onMouseOver={() => setHoverActive(true)}
            onMouseOut={() => setHoverActive(false)}
            onMouseDown={handleClick}
            onMouseUp={handleMouseLeave}
            className={`flex justify-center w-full border-[1px] lg:w-auto wtkwu uppercase items-center gap-2 px-[24px] py-[12px]    ${
              clicked
                ? "text-[#FCFAF2] bg-[#0B2217] border-[#0B2217]"
                : "text-[#193E2C] border-[#193E2C] hover:bg-[#193E2C] hover:text-white"
            }`}
          >
            Check it out
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13.477 9.16658L9.00698 4.69657L10.1855 3.51807L16.6673 9.99992L10.1855 16.4817L9.00698 15.3032L13.477 10.8332H3.33398V9.16658H13.477Z"
                fill={hoverActive ? "#fff" : "#193E2C"}
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="lg:col-span-3">
        <img
          alt="logo"
          src="/images/home.jpg"
          width={800}
          height={550}
          className="w-full object-cover h-[275px] lg:h-[550px]"
        />
      </div>
    </div>
  );
};

export default Home;
