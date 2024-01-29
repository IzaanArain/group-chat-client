import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
const VerifyAccount = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);

   // Function to handle changes in the OTP input fields
   const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Function to focus on the next OTP input field
  const focusNextInput = (index) => {
    if (index < otpInputsRef.current.length - 1) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      // If backspace is pressed and the current input field is empty,
      // focus on the previous input field
      focusPreviousInput(index);
    }
  };
  return (
    <>
      <section className="otp-section">
        <Container>
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <Col lg={6}>
              <Card className="shadow my-5 text-center p-3">
                <Card.Title
                  className="display-6"
                  style={{ fontFamily: "Work sans" }}
                >
                  Verify Account
                </Card.Title>
              </Card>
            </Col>
            <Col lg={6} xl={6}>
              <Form className="d-flex justify-content-center align-items-center gap-2">
                {otp.map((ele,index) => {
                  return (
                    <Form.Group controlId="otpInput" key={index}>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="otpInput"
                          value={ele}
                          maxLength={1}
                          style={{ fontSize: "1.5rem" }}
                          className="shadow text-center"
                          onChange={(e) => {
                            handleOtpChange(index, e.target.value);
                            focusNextInput(index);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          ref={(input) => {
                            otpInputsRef.current[index] = input;
                          }}
                        />
                      </InputGroup>
                    </Form.Group>
                  );
                })}
              </Form>
            </Col>
            <Col >
              {/* <Button>Verify</Button> */}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default VerifyAccount;
