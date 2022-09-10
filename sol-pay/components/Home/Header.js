import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Header() {
  return (
    <div className="header">
      <Container fluid className="section section--big">
        <Row className="header__row">
          <Col sm={12} md={6} className="d-flex align-items-end">
            <div>
              <h1 className="header-h1 mb-3">
                Not just a<br /> <b>Crypto Wallet.</b>
              </h1>
              <p className="p mb-3">
                All in one crypto wallet for all your need. We make it safe &
                easy for you to store, buy, send, receive, swap tokens and
                collect NFTs on the Solana blockchain.
              </p>

              <div className="d-flex">
                <Link href="/intro">
                  <button className="butn butn--fill">Create Wallet</button>
                </Link>
                <button className="butn mx-3">
                  Explore
                </button>
              </div>
            </div>
          </Col>

          <Col
            sm={12}
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <img src="/banner2.png" alt="banner" width={"80%"} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
