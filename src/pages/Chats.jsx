import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ChatList from "../components/Chat/ChatList";
import ChatBox from "../components/Chat/ChatBox";
import ChatInfo from "../components/Chat/ChatInfo";
const Chats = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <Container fluid>
          <Row>
            <Col>
              <ChatList />
            </Col>
            <Col>
              <ChatBox />
            </Col>
            <Col>
              <ChatInfo />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Chats;
