import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Features() {
  return (
    <div className="features">
      <Container>
        <Row className="features__box sm-mb-5">
          <Col sm={12} md={6}>
            <h1 className="h1">Home for all your NFTs</h1>
            <p className="p">
              Buy,Mint and Sell your NFTs with just few clicks
            </p>
          </Col>

          <Col sm={12} md={6} className="features__box__img">
            <img src="/nft.webp" alt="nft" />
          </Col>
        </Row>

        <Row className="features__box sm-mb-5">
          <Col sm={12} md={6}>
            <h1 className="h1">Earn Cashbacks</h1>
            <p className="p">
              Save on gas charges in each transaction and receive cashback offers!!
            </p>
          </Col>

          <Col sm={12} md={6} className="features__box__img">
            <img src="/cashback.webp" alt="nft" />
          </Col>
        </Row>

        <Row className="features__box sm-mb-5">
          <Col sm={12} md={6}>
            <h1 className="h1">Swap with ease</h1>
            <p className="p">
              Connect your other crypto wallet and swap coins easily.
            </p>
          </Col>

          <Col sm={12} md={6} className="features__box__img">
            <img src="/swap.webp" alt="nft" />
          </Col>
        </Row>

        <Row className="features__box sm-mb-5">
          <Col sm={12} md={6}>
            <h1 className="h1">Access Dapps</h1>
            <p className="p">
              Running on peer-to-peer connection for easy connect.
            </p>
          </Col>

          <Col sm={12} md={6} className="features__box__img">
            <img src="/solana-dapps.webp" alt="nft" />
          </Col>
        </Row>

        <Row className="features__box sm-mb-5">
          <Col sm={12} md={6}>
            <h1 className="h1">Pay to Merchants</h1>
            <p className="p">
              Pay through scan Qr-Codes!!
            </p>
          </Col>

          <Col sm={12} md={6} className="features__box__img">
            <img src="/merchant.webp" alt="nft" />
          </Col>
        </Row>

        <Row className="features__box">
          <Col sm={12} md={6}>
            <h1 className="h1">Get Cash with ease</h1>
            <p className="p">
              Add cash using bank peers.
            </p>
          </Col>

          <Col sm={12} md={6} className="features__box__img">
            <img src="/cash.webp" alt="nft" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
