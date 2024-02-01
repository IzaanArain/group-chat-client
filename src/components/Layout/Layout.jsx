import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Chats from "../../pages/Chats";
import CompleteProfile from "../../pages/CompleteProfile";
import VerifyAccount from "../../pages/VerifyAccount";
import { useSelector } from "react-redux";
import { getUser, getUserStatus } from "../../features/slices/AuthSlice";

const Layout = () => {
  const user = useSelector(getUser);
  const status = useSelector(getUserStatus);
  return (
    <>
      <BrowserRouter>
        {user?.token? ( //&& status !== 401
          <Routes>
            {user?.isCompleteProfile !== 1 ? (
              <Route path="/completeProfile" excat element={<CompleteProfile />}/>
            ) : (
              <>
                <Route path="/chats" excat element={<Chats />} />
                <Route path="*" excat element={<Navigate to="/chats" />} />
              </>
            )}
          </Routes>
        ) : (
          <Routes>
            <Route path="/home" excat element={<Home />} />
            <Route path="/verifyAccount" excat element={<VerifyAccount />} />
            <Route path="*" excat element={<Navigate to="/home" />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default Layout;
