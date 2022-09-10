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
              <Link href="#">Start</Link>
            </div>
            <div className="nav__links">
              <Link href="#">Services</Link>
            </div>
            <div className="nav__links">
              <Link href="#">Features</Link>
            </div>
            <div className="nav__links">
              <Link href="#">Security</Link>
            </div>
            <div className="nav__links">
              <Link href="#">Web3.0</Link>
            </div>
            <div className="nav__links">
              <Link href="#">Merchant</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
