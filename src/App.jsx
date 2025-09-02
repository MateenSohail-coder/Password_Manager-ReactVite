import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { DataProvider } from './context/context'
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  const [data, setdata] = useState([])
  return (
    <>
    <DataProvider>
       <Navbar />
      <Main />
    </DataProvider>
       
   
    
    </>
  );
}

export default App;
