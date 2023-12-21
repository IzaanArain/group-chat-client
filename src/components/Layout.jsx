import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Chats from "../pages/Chats";

const Layout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" excat element={<Home/>}/>
          <Route path="/chats" excat element={<Chats/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Layout;
