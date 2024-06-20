import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ChatList from "../components/Chat/ChatList";
import ChatBox from "../components/Chat/ChatBox";
import ChatInfo from "../components/Chat/ChatInfo";

const Chats = () => {
  return (
    <>
      <div className="chat-page">
        <Container fluid >
          <Row>
            <Col sm={12} md={6} lg={3} className="mb-3">
              <ChatList />
            </Col>
            <Col sm={12} md={6} lg={6} className="mb-3">
              <ChatBox />
            </Col>
            <Col sm={12} md={12} lg={3} className="mb-3">
              <ChatInfo />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Chats;
