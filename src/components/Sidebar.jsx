import React from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <section className="sidebar  h-15 md:h-[89.9vh] w-screen md:w-[15vw] bg-[#222831] text-white">
      <div className="flex flex-row md:flex-col md:h-auto h-full gap-[1px] md:gap-0 text-white font-bold text-1xl lg:text-xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `md:w-full md:h-auto h-full w-[33.3%] p-2.5 transition-colors flex items-center justify-center md:justify-start duration-200  ${
              isActive ? "bg-[#6283C0]" : ""
            }`
          }
        >
          All
        </NavLink>{" "}
        <NavLink
          to="/Favourite"
          className={({ isActive }) =>
            `md:w-full md:h-auto h-full w-[33.3%] p-2.5 transition-colors duration-200 justify-between flex items-center   ${
              isActive ? "bg-[#6283C0]" : ""
            }`
          }
        >
          <span>Favourite</span>
          <lord-icon
            src="https://cdn.lordicon.com/rrbmabsx.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#b4b4b4"
            className="w-8 h-8"
          ></lord-icon>
        </NavLink>
        <NavLink
          to="/Add"
          className={({ isActive }) =>
            `md:w-full md:h-auto h-full w-[33.3%] p-2.5 transition-colors duration-200 flex items-center justify-between gap-1.5 ${
              isActive ? "bg-[#6283C0]" : ""
            }`
          }
        >
          <span>Add</span>{" "}
          <lord-icon
            src="https://cdn.lordicon.com/vjgknpfx.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#b4b4b4"
            className="w-8 h-8"
          ></lord-icon>
        </NavLink>
      </div>
    </section>
  );
}
