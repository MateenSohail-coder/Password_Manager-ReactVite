import { useForm } from "react-hook-form";
import React from "react";
import { useRef, useState } from "react";
export default function Add() {
  const save = useRef(null);
  const message = useRef(null);
  const tick = useRef(null);
  const progress = useRef(null)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    save.current.classList.replace("-translate-y-[200%]", "translate-y-0");
    progress.current.classList.add("w-full");

    // Show tick + message after 1s
    setTimeout(() => {
      message.current.classList.replace("hidden", "block");
      tick.current.classList.replace("hidden", "block");
    }, 1000);

    // Hide everything after 3s
    setTimeout(() => {
      save.current.classList.replace("translate-y-0", "-translate-y-[200%]");
      message.current.classList.replace("block", "hidden");
      tick.current.classList.replace("block", "hidden");
      progress.current.classList.remove("w-full");
    }, 3500);

    reset();
  };

  return (
    <div className="md:w-[85vw] w-screen h-[80.8vh] md:h-[89.9vh] overflow-x-hidden relative">
      {/* ✅ Toast Notification */}
      <div
        ref={save}
        className="savesuccessfully transform -translate-y-[200%] transition-all duration-500 ease-out
                   absolute top-4 right-4 z-50 w-[320px] p-4
                   bg-[#1E1E1E] text-white rounded-lg shadow-lg flex items-center gap-3"
      >
        {/* Success Icon */}
        <svg
          ref={tick}
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-500 flex-shrink-0 hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>

        {/* Message */}
        <div ref={message} className="flex-1 hidden">
          <p className="font-semibold">Saved Successfully</p>
          <p className="text-sm text-gray-300">Your password have been created successfully.</p>
        </div>

        {/* Close Button */}
        <button
          className="text-gray-400 hover:text-gray-200"
          onClick={() => {
            save.current.classList.replace("translate-y-0", "-translate-y-[200%]");
          }}
        >
          ✕
        </button>

        {/* Progress bar */}
        <div className="absolute left-0 bottom-0 h-1 w-full bg-green-700/30 rounded-b-lg overflow-hidden">
          <div
            ref={progress}
            className="seek h-full bg-green-500 w-[1%] transition-all duration-[1000ms] ease-linear"
          ></div>
        </div>
      </div>

      <div className="flex flex-col w-[60%] md:w-[30%] justify-center items-center">
        <div className="md:h-25 h-20 w-70 md:w-90 flex ">
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
              fill="#9b9898"
            >
              PASS
            </text>
          </svg>
        </div>
        <p className=" text-[14px] font-semibold text-neutral-600">
          Your own Password manager
        </p>
      </div>
      <form
        className="mt-9 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className="bg-[#D9D9D9] p-5 text-[#625f5f] h-14 rounded-4xl mx-auto w-[90%] md:w-[70%] border-1 border-[#625F5F] focus:outline-neutral-700 focus:outline-1"
          placeholder="Enter a URL here"
          {...register("Url")}
        />
        <input
          className="bg-[#D9D9D9] p-5 text-[#625f5f] h-14 rounded-4xl mx-auto w-[90%] md:w-[70%] border-1 border-[#625F5F] focus:outline-neutral-700 focus:outline-1"
          placeholder="Enter Username here"
          {...register("Username", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <input
          className="bg-[#D9D9D9] p-5 text-[#625f5f] h-14 rounded-4xl mx-auto w-[90%] md:w-[70%] border-1 border-[#625F5F] focus:outline-neutral-700 focus:outline-1"
          placeholder="Enter a password here"
          {...register("Password", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <button
          className="bg-[#393E46] active:scale-[0.96] transform h-14 text-white cursor-pointer rounded-4xl mx-auto w-[40%] md:w-[16%] text-xl font-bold "
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
