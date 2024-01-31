import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Chats from "../../pages/Chats";
import CompleteProfile from "../Auth/CompleteProfile";
import VerifyAccount from "../Auth/VerifyAccount";
import { useSelector } from "react-redux";
import { getUserToken, getUserStatus } from "../../features/slices/AuthSlice";
import EditProfile from "../../pages/EditProfile";
const Layout = () => {
  const token = useSelector(getUserToken);
  const status = useSelector(getUserStatus);
  return (
    <>
      <BrowserRouter>
        {token  ?  ( //editProfile
          <Routes>
            <Route path="/chats" excat element={<Chats />} />
            <Route path='/editProfile' excat element={<EditProfile/>}/>
            <Route path="*" excat element={<Chats />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/home" excat element={<Home />} />
            <Route path="/verifyAccount" excat element={<VerifyAccount />} />
            <Route path="/completeProfile" excat element={<CompleteProfile />}/>
            <Route path="*" element={<Home />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default Layout;
