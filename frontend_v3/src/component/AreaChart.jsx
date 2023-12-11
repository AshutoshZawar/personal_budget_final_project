import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyAreaChart = ({ data }) => {
  // let data = []
  console.log("data", data)
  return (
    <div
      style={{
        boxShadow:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
      }}
      className="w-full border borer-[#EAECF0] p-5 rounded-[8px]  bg-white"
    >
      <div className="flex items-center pb-4 justify-end gap-[13px]">
     
    
        <div className="flex items-center gap-2 text-[#667085] text-[14px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#F04438" />
          </svg>
          Income
        </div>
        <div className="flex items-center gap-2 text-[#667085] text-[14px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#051A78" />
          </svg>
          Expence
        </div>
      </div>
      <div className="area-gradient" />
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeOpacity={0.3} strokeDasharray="1" />
          <XAxis
            stroke="1"
            fontSize={14}
            fontWeight={400}
            tick={{ fill: "#667085" }}
            dataKey="name"
          />
          <Area
            name="Income"
            type="monotone"
            dataKey="usd[0]"
            stroke="#F04438"
            strokeWidth={2}
            fill="url(#areaGradient3)" // Reference the gradient with ID areaGradient
          />
          <Tooltip />
          <defs>
            <linearGradient id="areaGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(240, 68, 56, 0.1)" />
              {/* <stop offset="50%" stopColor="rgba(240, 68, 56, 0.1)" />  */}
              <stop offset="100%" stopColor="rgba(240, 68, 56, 0)" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            name="Expence"
            dataKey="usd[1]"
            stroke="#051A78"
            strokeWidth={2}
            fill="url(#areaGradient2)" // Reference the gradient with ID areaGradient
          />
          <defs>
            <linearGradient id="areaGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(5, 26, 120, 0.1)" />
              {/* <stop offset="50%" stopColor="rgba(255, 191, 0, 0.1)" />  */}
              <stop offset="100%" stopColor="rgba(5, 26, 120, 0)" />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyAreaChart;
