import React, { useEffect, useRef, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { backendUri } from "../App";
import { toast } from "react-toastify";
import MyAreaChart from "../component/AreaChart";
import { useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ setAuthenticated }) => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true, // Fill area under the line
        backgroundColor: "rgba(75,192,192,0.2)", // Area color
        borderColor: "rgba(75,192,192,1)", // Line color
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [apRoute, setapRoute] = useState("income");
  const [incomeData, setIncomeData] = useState(null);
  const [expenceData, setexpenceData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [incomeDataforLine, setincomeDataforLine] = useState(null);
  const [expenceDataforLine, setexpenceDataforLine] = useState(null);

  const router = useNavigate();

  const [areaData, setAreaData] = useState([]);

  const getExpence = async () => {
    try {
      const response = await fetch(`${backendUri}/api/expence`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("pbg")}`,
        },
      });
      const data = await response.json();
      setexpenceDataforLine(data);
      let income = data?.expence;
      let demostate = {
        labels: [],
        datasets: [
          {
            label: "Usd",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };

      // console.log("areaData", areaData);
      if (income?.length > 0) {
        income?.map((item, ind) => {
          demostate.labels = [...demostate.labels, item?.title];
          demostate.datasets[0].data = [
            ...demostate.datasets?.[0].data,
            item?.value,
          ];
          demostate.datasets[0].backgroundColor = [
            ...demostate.datasets?.[0].backgroundColor,
            item?.bg_color,
          ];
          demostate.datasets[0].borderColor = [
            ...demostate.datasets?.[0].borderColor,
            item?.border_color,
          ];
        });
      }

      setexpenceData(demostate);
      // console.log("income", data);
    } catch (error) {
      console.log(error);
    }
  };
  const addIncome = async () => {
    try {
      const response = await fetch(`${backendUri}/api/income`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("pbg")}`,
        },
      });
      const data = await response.json();
      setincomeDataforLine(data);
      let income = data?.income;
      let demostate = {
        labels: [],
        datasets: [
          {
            label: "Usd",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };

      if (income?.length > 0) {
        income?.map((item, ind) => {
          demostate.labels = [...demostate.labels, item?.title];
          demostate.datasets[0].data = [
            ...demostate.datasets?.[0].data,
            item?.value,
          ];
          demostate.datasets[0].backgroundColor = [
            ...demostate.datasets?.[0].backgroundColor,
            item?.bg_color,
          ];
          demostate.datasets[0].borderColor = [
            ...demostate.datasets?.[0].borderColor,
            item?.border_color,
          ];
        });
      }

      setIncomeData(demostate);
    } catch (error) {
      console.log(error);
      // toast.error("Item Added Unsuccessful!", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };

  useEffect(() => {
    getExpence();
    addIncome();

    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (incomeDataforLine != null && expenceDataforLine !== null) {
      let data1 = expenceDataforLine;
      let data2 = incomeDataforLine;
      const mergedData = [];

      const maxLength = Math.max(
        data1?.expence?.length || 0,
        data2?.income?.length || 0
      );

      for (let i = 0; i < maxLength; i++) {
        const value1 =
          data1?.expence?.[i]?.value !== undefined ? data1.expence[i].value : 0;
        const value2 =
          data2?.income?.[i]?.value !== undefined ? data2.income[i].value : 0;

        mergedData.push({ name: "", usd: [value2, value1] });
      }

      setAreaData(mergedData);
    }
  }, [incomeDataforLine, expenceDataforLine]);

  // auto logout function;
  let autologout = true;

  // if autologout set to true then a popup will appear after 40 seconds, and then after 20 second user will be automatically logout;
  
  const [open2, setOpen2] = useState(false);
  useEffect(() => {
    if (autologout) {
      setTimeout(() => {
        setOpen2(true);
      }, 40000);
      setTimeout(() => {
        localStorage.removeItem("pbg");
        router("/");
        setAuthenticated(false);
      }, 60000);
    }
  }, []);

  return (
    <>
      <Popup
        setRefresh={setRefresh}
        apRoute={apRoute}
        open={open}
        setOpen={setOpen}
      />
      <PopupLogout open={open2} setOpen={setOpen2} />
      <section className="px-[20px] lg:px-[64px] pt-[32px] pb-[48px] bg-[#F9FAFB] min-h-screen">
        <h1 className="text-[30px] text-[#101828] font-[700] uppercase leading-[38px] lemon">
          Dashboard
        </h1>
        <p className="text-tbt text-[16px] font-[400] pt-1 pb-[32px]">
          Welcome back!
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] pb-[24px]">
          <Income
            setapRoute={setapRoute}
            incomeData={incomeData}
            setOpen={setOpen}
          />
          <Expences
            setapRoute={setapRoute}
            expenceData={expenceData}
            setOpen={setOpen}
          />
          <div className=" lg:col-span-2">
            {areaData?.length > 0 && <MyAreaChart data={areaData} />}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] xl:grid-cols-3">
          <div className="lg:col-span-2"></div>
        </div>
      </section>
    </>
  );
};

const Income = ({ setOpen, setapRoute, incomeData }) => {
  return (
    <div
      style={{
        boxShadow:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
      }}
      className="w-full border borer-[#EAECF0] rounded-[8px]  bg-white"
    >
      <div className="flex items-center justify-between p-[24px] border-b ">
        <p className="text-[18px] text-txt font-[600]">Income</p>
      </div>
      <div className="relative flex items-center justify-center">
        <div className=" w-[400px] flex items-center justify-center text-center h-[400px] ">
          {incomeData && incomeData?.labels?.length !== 0 ? (
            <Pie data={incomeData} />
          ) : (
            <p>No Data for Income, Please add by clicking add income</p>
          )}
        </div>
      </div>
      <div className="p-[12px] flex items-center justify-center">
        <button
          onClick={() => {
            setapRoute("income");
            setOpen(true);
          }}
          className="text-[14px] flex items-center gap-2 rounded-[8px] text-white bg-pr py-[10px] px-[16px]"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};
const Popup = ({ open, setOpen, apRoute, setRefresh }) => {
  const cancelButtonRef = useRef(null);
  const [name1, setName1] = useState("");
  const [amount1, setAmount1] = useState();

  const addIncome = async () => {
    try {
      const main_data = {
        title: name1,
        value: parseInt(amount1),
      };
      const response = await fetch(`${backendUri}/api/${apRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("pbg")}`,
        },
        body: JSON.stringify(main_data),
        // Add body data here if needed
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAmount1();
      setName1("");
      toast.success("Item Added Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        setRefresh(true);
        setOpen(false);
      }, 1000);
    } catch (error) {
      // console.log(error)
      toast.error("Item Added Unsuccessful!", {
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center w-full justify-center p-4 text-center  sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform w-full lg:w-auto z-[100] overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                <div className="bg-white relative z-50 lg:w-[590px] w-full p-[24px]">
                  <div className="absolute top-5 right-5 z-30">
                    <AiOutlineClose
                      onClick={() => setOpen(false)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center flex-col gap-3 justify-center w-full">
                    <div className="p-[12px] bg-[#F3CDC1] rounded-full border-[8px] border-[#FDEEEC]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2.50047 13H8.50047M15.5005 13H21.5005M12.0005 7V21M12.0005 7C13.3812 7 14.5005 5.88071 14.5005 4.5M12.0005 7C10.6198 7 9.50047 5.88071 9.50047 4.5M4.00047 21L20.0005 21M4.00047 4.50001L9.50047 4.5M9.50047 4.5C9.50047 3.11929 10.6198 2 12.0005 2C13.3812 2 14.5005 3.11929 14.5005 4.5M14.5005 4.5L20.0005 4.5M8.88091 14.3364C8.48022 15.8706 7.11858 17 5.50047 17C3.88237 17 2.52073 15.8706 2.12004 14.3364C2.0873 14.211 2.07093 14.1483 2.06935 13.8979C2.06838 13.7443 2.12544 13.3904 2.17459 13.2449C2.25478 13.0076 2.34158 12.8737 2.51519 12.6059L5.50047 8L8.48576 12.6059C8.65937 12.8737 8.74617 13.0076 8.82636 13.2449C8.87551 13.3904 8.93257 13.7443 8.9316 13.8979C8.93002 14.1483 8.91365 14.211 8.88091 14.3364ZM21.8809 14.3364C21.4802 15.8706 20.1186 17 18.5005 17C16.8824 17 15.5207 15.8706 15.12 14.3364C15.0873 14.211 15.0709 14.1483 15.0693 13.8979C15.0684 13.7443 15.1254 13.3904 15.1746 13.2449C15.2548 13.0076 15.3416 12.8737 15.5152 12.6059L18.5005 8L21.4858 12.6059C21.6594 12.8737 21.7462 13.0076 21.8264 13.2449C21.8755 13.3904 21.9326 13.7443 21.9316 13.8979C21.93 14.1483 21.9137 14.211 21.8809 14.3364Z"
                          stroke="#E65B40"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="int text-[18px] text-center font-[500] text-txt">
                      Add {apRoute}
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addIncome();
                    }}
                  >
                    <div className=" w-full">
                      <p className="int text-[14px] font-[500] text-txt">
                        Name
                      </p>
                      <div
                        style={{
                          boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                        }}
                        className="px-[14px] text-[16px] w-full mt-[8px] outline-none rounded-[8px] flex items-center gap-2 border-[#D0D5DD] border font-[500] text-txt py-[10px]"
                      >
                        <input
                          type="text"
                          required
                          placeholder=""
                          value={name1}
                          onChange={(e) => setName1(e.target.value)}
                          className="outline-none w-full"
                        />
                      </div>
                    </div>
                    <div className="pt-[20px] w-full">
                      <p className="int text-[14px] font-[500] text-txt">
                        Amount
                      </p>
                      <div
                        style={{
                          boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                        }}
                        className="px-[14px] text-[16px] w-full mt-[8px] outline-none rounded-[8px] flex items-center gap-2 border-[#D0D5DD] border font-[500] text-txt py-[10px]"
                      >
                        <div className=" cursor-pointer text-tbt">$</div>
                        <input
                          type="number"
                          required
                          placeholder="0"
                          value={amount1}
                          onChange={(e) => setAmount1(e.target.value)}
                          className="outline-none w-full"
                        />
                        <div className=" cursor-pointer text-txt">USD</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-full  mt-[32px] gap-[12px]">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="border-[1px] w-full text-[#344054] rounded-[8px] text-[16px] px-[18px] py-[10px] "
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="bg-[#051A78] border-[1px] w-full text-white rounded-[8px] border-[#7F56D9] text-[16px] px-[18px] py-[10px] "
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
const PopupLogout = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center w-full justify-center p-4 text-center  sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform w-full lg:w-auto z-[100] overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                <div className="bg-white relative z-50 lg:w-[590px] w-full p-[24px]">
                  <div className="flex items-center flex-col gap-3 justify-center w-full">
                    <div className="p-[12px] bg-[#F3CDC1] rounded-full border-[8px] border-[#FDEEEC]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2.50047 13H8.50047M15.5005 13H21.5005M12.0005 7V21M12.0005 7C13.3812 7 14.5005 5.88071 14.5005 4.5M12.0005 7C10.6198 7 9.50047 5.88071 9.50047 4.5M4.00047 21L20.0005 21M4.00047 4.50001L9.50047 4.5M9.50047 4.5C9.50047 3.11929 10.6198 2 12.0005 2C13.3812 2 14.5005 3.11929 14.5005 4.5M14.5005 4.5L20.0005 4.5M8.88091 14.3364C8.48022 15.8706 7.11858 17 5.50047 17C3.88237 17 2.52073 15.8706 2.12004 14.3364C2.0873 14.211 2.07093 14.1483 2.06935 13.8979C2.06838 13.7443 2.12544 13.3904 2.17459 13.2449C2.25478 13.0076 2.34158 12.8737 2.51519 12.6059L5.50047 8L8.48576 12.6059C8.65937 12.8737 8.74617 13.0076 8.82636 13.2449C8.87551 13.3904 8.93257 13.7443 8.9316 13.8979C8.93002 14.1483 8.91365 14.211 8.88091 14.3364ZM21.8809 14.3364C21.4802 15.8706 20.1186 17 18.5005 17C16.8824 17 15.5207 15.8706 15.12 14.3364C15.0873 14.211 15.0709 14.1483 15.0693 13.8979C15.0684 13.7443 15.1254 13.3904 15.1746 13.2449C15.2548 13.0076 15.3416 12.8737 15.5152 12.6059L18.5005 8L21.4858 12.6059C21.6594 12.8737 21.7462 13.0076 21.8264 13.2449C21.8755 13.3904 21.9326 13.7443 21.9316 13.8979C21.93 14.1483 21.9137 14.211 21.8809 14.3364Z"
                          stroke="#E65B40"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="int text-[18px] text-center font-[500] text-txt">
                      You have only 20 seconds left. After 20 seconds you will
                      be logout automatically.
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const Expences = ({ setOpen, setapRoute, expenceData }) => {
  // console.log("expenceData", expenceData);
  return (
    <div
      style={{
        boxShadow:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
      }}
      className="w-full border borer-[#EAECF0] rounded-[8px]  bg-white"
    >
      <div className="flex items-center justify-between p-[24px] border-b ">
        <p className="text-[18px] text-txt font-[600]">Expences</p>
      </div>
      <div className="relative flex items-center justify-center">
        <div className=" w-[400px] h-[400px] flex items-center justify-center text-center ">
          {expenceData && expenceData?.labels?.length !== 0 ? (
            <Pie data={expenceData} />
          ) : (
            <p>No Data for Expence, Please add by clicking add expence</p>
          )}
        </div>
      </div>
      <div className="p-[12px] flex items-center justify-center">
        <button
          onClick={() => {
            setapRoute("expence");
            setOpen(true);
          }}
          className="text-[14px] flex items-center gap-2 rounded-[8px] text-white bg-pr py-[10px] px-[16px]"
        >
          Add Expences
        </button>
      </div>
    </div>
  );
};

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 278 },
  { name: "May", uv: 189 },
  { name: "Jun", uv: 400 },
  { name: "Jul", uv: 300 },
  { name: "Aug", uv: 200 },
  { name: "Sep", uv: 278 },
  { name: "Oct", uv: 189 },
  { name: "Nov", uv: 189 },
  { name: "Dec", uv: 189 },
];

export default Dashboard;
