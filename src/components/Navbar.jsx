import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="h-17 w-full bg-[#393E46] text-white flex mx-0 items-center justify-between px-10 gap-4">
        <div className="h-20 w-70 flex ">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 300"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <polyline
              points="200,150 400,50 400,250"
              fill="none"
              stroke="#222427"
              strokeWidth="20"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <polyline
              points="1000,150 800,50 800,250"
              fill="none"
              stroke="#222427"
              strokeWidth="20"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <text
              x="420"
              y="190"
              fontFamily="Limelight, sans-serif"
              fontSize="120"
              fontWeight="bold"
              fill="#222427"
            >
              Am
            </text>
            <text
              x="600"
              y="190"
              fontFamily="Arial Black, sans-serif"
              fontSize="90"
              fontWeight="bold"
              fill="#f0f0f0"
            >
              PASS
            </text>
          </svg>
        </div>
        <div>
        <a href="https://github.com/MateenSohail-coder/Password_Manager-ReactVite.git" target="_blank" rel="noopener noreferrer">
  <button
    className=" p-1.5 border-2 text-neutral-200 font-bold cursor-pointer border-neutral-200 bg-[#222427] rounded-4xl flex items-center justify-center gap-2 hover:bg-neutral-700 active:scale-[0.96] transform transition-all "
  >
    <lord-icon
      src="https://cdn.lordicon.com/jjxzcivr.json"
      trigger="boomerang"
      stroke="bold"
      colors="primary:#ffffff,secondary:#ffffff"
      className="md:h-8 h-6 w-6 md:w-8 fill-neutral-200"
    ></lord-icon>
    <span className="hidden md:inline">Github</span>
  </button>
</a>
        </div>
      </nav>
    </div>
  );
}
