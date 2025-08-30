import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import { createBrowserRouter,RouterProvider,Routes ,Route } from "react-router-dom";
function App() {

  return (
    <>
  <Navbar />
  <Main />
    </>
  )
}

export default App
