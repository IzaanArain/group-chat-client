import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import defaultImage from "../../assets/default-image.jpg";
import { getUser } from "../../features/slices/AuthSlice";
import { useSelector } from "react-redux";
const ChatListItem = ({ chat: { _id, users, groupImage,isGroupChat,groupName,latestMessage } }) => {
  const user = useSelector(getUser);
  const receiver = isGroupChat === 0 ? users?.find((ele)=>ele._id !== user._id) : null;
  return (
    <>
      <div className="chat-item">
      <Card style={{height:"100%",width:"100%"}}>
        <Container fluid>
          <Row>
            <Col sm={3} className="d-flex align-items-center">
             <div 
             style={{width:"50px", height:"50px"}}
             >
             <Card.Img
                className="rounded-circle"
                style={{ height: '100%', width: '100%' }}
                src={
                  groupImage ? `${import.meta.env.VITE_API_URL}/${groupImage}`
                    : receiver?.profileImage ? `${import.meta.env.VITE_API_URL}/${receiver.profileImage}`
                    : defaultImage
                }
              />
             </div>
            </Col>
            <Col sm={9} className="d-flex align-items-center">
              <Card.Body>
                {receiver ? (
                  <>
                  <Card.Title>{receiver.name}</Card.Title>
                  <Card.Text>{latestMessage ? latestMessage : "no message"}</Card.Text>
                 </>
               ) : (
                <>
                <Card.Title>{groupName}</Card.Title>
                <Card.Text>{latestMessage ? latestMessage : "no message"}</Card.Text>
               </>
               )}
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Card>
      </div>
    </>
  );
};

export default ChatListItem;
