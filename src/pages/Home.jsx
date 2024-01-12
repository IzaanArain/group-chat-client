import React from "react";
import Auth from "../components/Auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

const Home = () => {
  const [arr,setArr]=useState([1,2,3,4])
  return (
    <>
    <Container>
        <Row className="d-flex justify-content-center align-items-center p-md-5">
          <Col lg={6}>
            <Auth />
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
         {
          arr.map((ele,i)=>{
            return (
              <Col key={i} className="bg-primary m-2">
                <h1>{ele}</h1>
              </Col>
            );
          })
         }
        </Row>
      </Container>
    </>
  );
};

export default Home;
