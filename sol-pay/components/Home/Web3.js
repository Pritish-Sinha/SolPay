import Image from "next/image";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Web3() {
  return (
    <div className="web3">
      <Container fluid className="section">
        <h1 className="h1 mb-5">Access WEB3 with ease</h1>

        <Row>
          <Col>
            <Image
              src="/icons/chrome.svg"
              width={80}
              height={80}
              alt="chrome"
            />
            <div className="web3__browser">Chrome</div>
          </Col>

          <Col>
            <Image src="/icons/ie.svg" width={80} height={80} alt="chrome" />
            <div className="web3__browser">Edge </div>
          </Col>

          <Col>
            <Image src="/icons/brave.svg" width={80} height={80} alt="chrome" />
            <div className="web3__browser">Brave</div>
          </Col>

          <Col>
            <Image
              src="/icons/firefox.svg"
              width={80}
              height={80}
              alt="chrome"
            />
            <div className="web3__browser">FireFox</div>
          </Col>

        </Row>
      </Container>
    </div>
  );
}
