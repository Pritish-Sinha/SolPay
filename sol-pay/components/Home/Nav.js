import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Nav() {
  return (
    <div className="nav">
      <Container fluid className="section section--big">
        <Row className="align-items-center">
          <Col  className="text-center" >
            <img src="/logo2.png" alt="logo" width={"150px"}/>
          </Col>
          
        
        </Row>
      </Container>
    </div>
  );
}
