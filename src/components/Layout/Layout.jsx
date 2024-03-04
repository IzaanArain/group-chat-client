import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Chats from "../../pages/Chats";
import CompleteProfile from "../../pages/CompleteProfile";
import VerifyAccount from "../../pages/VerifyAccount";
import { useSelector } from "react-redux";
import { getUser, getUserStatus } from "../../features/slices/AuthSlice";
import Nav from "./Nav";
const Layout = () => {
  const user = useSelector(getUser);
  const status = useSelector(getUserStatus);
  // && status !== 401
  // user.isCompleteProfile !==1
  return (
    <>
      <BrowserRouter>
        {/* {user?.token ? ( 
          <Routes>
            <Route path="/completeProfile" excat element={<CompleteProfile />}/>
            <Route path="/chats" excat element={<Chats />} />
            <Route path="*" excat element={<Navigate to="/chats" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/home" excat element={<Home />} />
            <Route path="/verifyAccount" excat element={<VerifyAccount />} />
            <Route path="*" excat element={<Navigate to="/home" />} />
          </Routes>
        )} */}
        {
          user?.token && user?.isProfileCompleted===1 && status!==401 ? (<>
          <Nav/>
          <Routes>
            <Route path="/completeProfile" excat element={<CompleteProfile />}/>
            <Route path="/chats" excat element={<Chats />} />
            <Route path="*" excat element={<Navigate to="/chats" />} />
          </Routes>
          </>) : user?.token && user?.isProfileCompleted===0 ? (<>
            <Routes>
            <Route path="/completeProfile" excat element={<CompleteProfile />}/>
            <Route path="*" excat element={<Navigate to="/completeProfile" />} />
            </Routes>
          </>):(<>
            <Routes>
            <Route path="/home" excat element={<Home />} />
            <Route path="/verifyAccount" excat element={<VerifyAccount />} />
            <Route path="*" excat element={<Navigate to="/home" />} />
          </Routes>
          </>)
        }
      </BrowserRouter>
    </>
  );
};

export default Layout;
