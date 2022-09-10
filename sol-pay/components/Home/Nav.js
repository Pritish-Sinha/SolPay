import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
export default function Nav() {
  return (
    <div className="nav">
      <Container fluid className="section section--big">
        <Row className="align-items-center">
          <Col  className="text-center" >
            <img src="/logo2.png" alt="logo" width={"250px"}/>
          </Col>
          <Col className="hide-on-phone ">
            <div className="nav__links">
              <Link href="sol-pay/components/Home/Services.js">Services</Link>
            </div>
            <div className="nav__links">
              <Link href="sol-pay/components/Home/Features.js">Features</Link>
            </div>
            <div className="nav__links">
              <Link href="sol-pay/components/Home/Features.js">Security</Link>
            </div>
            <div className="nav__links">
              <Link href="sol-pay/components/Home/Web3.js">Web3.0</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
