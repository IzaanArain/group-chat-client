import React from "react";
import Auth from "../components/Auth/Auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

const Home = () => {
  const [arr,setArr]=useState([1,2,3,4])
  return (
    <>
   
            <Auth />
        {/* <Row xs={1} md={2} lg={3} xl={3} xxl={4} className="b">
         {
          arr.map((ele,i)=>{
            return (
              <Col key={i}>
                <h1 className="bg-primary">{ele}</h1>
              </Col>
            );
          })
         }
        </Row> */}
    </>
  );
};

export default Home;
