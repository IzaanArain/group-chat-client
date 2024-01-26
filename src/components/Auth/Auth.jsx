import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
  return (
    <>
      <section className="auth-section">
        <Container fluid="md">
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <Col lg={6}>
              <Card className="shadow my-5 text-center p-3">
                <Card.Title
                  className="display-6"
                  style={{ fontFamily: "Work sans" }}
                >
                  Group Chat
                </Card.Title>
              </Card>
            </Col>
            <Col lg={6} className="">
              <Card className="shadow">
                <Card.Body>
                  <Tabs variant="soft-rounded" colorScheme="blue">
                    <TabList>
                      <Tab width="50%">Login</Tab>
                      <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Login />
                      </TabPanel>
                      <TabPanel>
                        <SignUp />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Auth;
