import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ChatList from "../components/Chat/ChatList";
import ChatBox from "../components/Chat/ChatBox";
import ChatInfo from "../components/Chat/ChatInfo";
const Chats = () => {
  return (
    <>
      <div>
        <Container fluid >
          <Row className="py-2">
            <Col md={3}>
              <ChatList />
            </Col>
            <Col md={6}>
              <ChatBox />
            </Col>
            <Col md={3}>
              <ChatInfo />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Chats;
