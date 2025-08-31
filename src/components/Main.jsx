import React from "react";
import { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Add from "./Add";
export default function Main() {
  const defaultColor = "primary:#545454,secondary:#848484";
  const goldColor = "primary:gold,secondary:gold";
  const clipboard = useRef();
  const [bookmarkColor, setBookmarkColor] = useState(defaultColor); //#endregion
  const toggleBookmarkColor = () => {
    setBookmarkColor((prev) =>
      prev === defaultColor ? goldColor : defaultColor
    );
  };
  const Copytoclipboard = () => {
    clipboard.current.classList.remove("-translate-y-[200%]");
    clipboard.current.classList.add("translate-y-[0%]");
    setTimeout(() => {
      clipboard.current.classList.remove("translate-y-[0%]");
      clipboard.current.classList.add("-translate-y-[200%]");
    }, 1500);
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col md:flex-row">
            <div
              ref={clipboard}
              className="clipboard transition-all duration-500 delay-100 absolute h-10 w-[200px] bg-[#222831] text-white transform -translate-y-[200%] font-bold top-1 left-1 flex items-center justify-center"
            >
              Copied to Clipboard !
            </div>
            <Sidebar />

            <main className="md:w-[85vw] w-screen h-[80.8vh]  md:h-[89.9vh] overflow-x-hidden">
              <div className="overflow-x-hidden">
                <table className="min-w-full border bg-[#6E89B1]/21  rounded-lg shadow-md overflow-x-hidden">
                  <thead className="bg-[#5F6877]">
                    <tr className="text-white">
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Site
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Password
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=" border-b-1 text-[#222831] border-b-[#000000]/26 font-sans text-[16px] font-medium">
                      <td className="px-6 py-4 max-w-xs break-words">
                        <span>mateen@example.com</span>
                        <span className="ml-2 inline-block align-middle">
                          <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:#545454,secondary:green"
                            className="w-5 h-5"
                            onClick={Copytoclipboard}
                          ></lord-icon>
                        </span>
                      </td>

                      <td className="px-6 py-4 ">
                        <span>mateen</span>
                        <span>
                          <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:#545454,secondary:green"
                            className="w-5 h-5"
                            onClick={Copytoclipboard}
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span>.........</span>
                        <span>
                          <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:#545454,secondary:green"
                            className="w-5 h-5"
                            onClick={Copytoclipboard}
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="px-6 py-4  space-x-2">
                        <button className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:blue,secondary:blue"
                            className="w-7 h-7"
                          ></lord-icon>
                        </button>
                        <button className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:red,secondary:red"
                            className="w-7 h-7"
                          ></lord-icon>
                        </button>
                        <button className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/rrbmabsx.json"
                            trigger="click"
                            stroke="bold"
                            colors={bookmarkColor}
                            onClick={toggleBookmarkColor}
                            className="w-7 h-7"
                          ></lord-icon>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        }
      />
      <Route
        path="/Favourite"
        element={
          <div className="flex flex-col md:flex-row">
            <div
              ref={clipboard}
              className="clipboard transition-all duration-500 delay-100 absolute h-10 w-[200px] bg-[#222831] text-green-500 transform -translate-y-[200%] font-bold top-1 left-1 flex items-center justify-center"
            >
              Copied to Clipboard !
            </div>
            <Sidebar />
            <main className="md:w-[85vw] w-screen h-[80.8vh]  md:h-[89.9vh] overflow-x-hidden">
              <div className="overflow-x-hidden">
                <table className="min-w-full border bg-[#6E89B1]/21  rounded-lg shadow-md overflow-x-hidden">
                  <thead className="bg-amber-300">
                    <tr className="text-white">
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Site
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Password
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=" border-b-1 text-[#222831] border-b-[#000000]/26 font-sans text-[16px] font-medium">
                      <td className="px-6 py-4 max-w-xs break-words">
                        <span>mateen@example.com</span>
                        <span className="ml-2 inline-block align-middle">
                          <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:#545454,secondary:green"
                            className="w-5 h-5"
                            onClick={Copytoclipboard}
                          ></lord-icon>
                        </span>
                      </td>

                      <td className="px-6 py-4 ">
                        <span>mateen</span>
                        <span>
                          <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:#545454,secondary:green"
                            className="w-5 h-5"
                            onClick={Copytoclipboard}
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span>.........</span>
                        <span>
                          <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:#545454,secondary:green"
                            className="w-5 h-5"
                            onClick={Copytoclipboard}
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="px-6 py-4  space-x-2">
                        <button className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:blue,secondary:blue"
                            className="w-7 h-7"
                          ></lord-icon>
                        </button>
                        <button className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="click"
                            stroke="bold"
                            colors="primary:red,secondary:red"
                            className="w-7 h-7"
                          ></lord-icon>
                        </button>
                        <button className="cursor-pointer">
                          <lord-icon
                            src="https://cdn.lordicon.com/rrbmabsx.json"
                            trigger="click"
                            stroke="bold"
                            colors={bookmarkColor}
                            onClick={toggleBookmarkColor}
                            className="w-7 h-7"
                          ></lord-icon>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>

            
          </div>
        }
      />
      <Route path="/Add" element={
        <div className="flex flex-col md:flex-row">
        <Sidebar />
        <Add />
        </div>
      } />
    </Routes>
  );
}
