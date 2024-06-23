import {useState} from "react";
import "./chat.css";
import { Container, Col, Row } from "react-bootstrap";
import ChatList from "../../components/Chat/ChatList";
import ChatBox from "../../components/Chat/ChatBox";
import ChatInfo from "../../components/Chat/ChatInfo";
import { getSelectedChat } from "../../features/slices/ChatSlice";
import { useSelector } from "react-redux";
const Chats = () => {
  const selectedChat = useSelector(getSelectedChat);
// console.log("selectedChat",selectedChat);
// console.log("col-lg-6"+(selectedChat ?  "" : " d-none d-lg-block" ));
  return (
    <>
      {/* <div className="chat-page">
        <ChatList/>
        <ChatBox/>
        <ChatInfo/>
      </div> */}
      <div className="container-fluid">
        <div className="chat-page">
          <div className="row  gy-3">
            <div className={"col-lg-3"+(selectedChat ? " d-none d-lg-block" : "" )} >
              <ChatList />
            </div>
            <div className={"col-lg-6"+(selectedChat ?  "" : " d-none d-lg-block" )}>
              <ChatBox />
            </div>
            <div className="col-lg-3 d-none d-lg-block">
              <ChatInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
