import { useForm } from "react-hook-form";
import React from "react";
import { useRef } from "react";
export default function Add() {
  const save = useRef()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
  
    console.log(data);
  
  reset();


  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <div ref={save}  className="md:w-[85vw] w-screen h-[80.8vh]  md:h-[89.9vh] overflow-x-hidden">
      <div className="savesuccessfully text-xl font-bold transform -translate-y-[200%] transition-all text-green-600 p-5 w-[290px] top-1.5 right-1.5 bg-[#222831] absolute flex items-center justify-center">
        <span>Saved Successfully !</span>
        <div className="seek h-1 absolute w-full bottom-0 bg-green-600"></div>
      </div>
      <div className="flex flex-col w-[50%] md:w-[30%] justify-center items-center">
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
          className="bg-[#393E46] border-[#625F5F] border-1 h-14 text-white cursor-pointer rounded-4xl mx-auto w-[40%] md:w-[16%] text-2xl font-bold "
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
