import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Chats from "../pages/Chats";
import CompleteProfile from "./Auth/CompleteProfile";

const Layout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" excat element={<Home/>}/>
          <Route path="/completeProfile" excat element={<CompleteProfile/>}/>
          <Route path="/chats" excat element={<Chats/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Layout;
