import { useForm } from "react-hook-form"
import React from "react"

export default function Add() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) =>{
    reset()
    console.log(data);
    
  }




  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    
    <div className="md:w-[85vw] w-screen h-[80.8vh]  md:h-[89.9vh] overflow-x-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("Url")} />
      <input {...register("Username", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

 <input {...register("Password", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
    </div>
  )
}