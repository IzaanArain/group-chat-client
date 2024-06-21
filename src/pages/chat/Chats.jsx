import {useState} from "react";
import "./chat.css";
import { Container, Col, Row } from "react-bootstrap";
import ChatList from "../../components/Chat/ChatList";
import ChatBox from "../../components/Chat/ChatBox";
import ChatInfo from "../../components/Chat/ChatInfo";

const Chats = () => {
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
            <div className="col-lg-3 col-md-6">
              {/* "d-none d-lg-block" on chat selection*/}
              <ChatList />
            </div>
            <div className="col-lg-6 col-md-6">
              {/* col-md-12 */}
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
