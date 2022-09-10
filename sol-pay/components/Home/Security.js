import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GrFormNextLink } from "react-icons/gr";

function Card() {
  return (
    <div className="security__card">
      <img src={props.bgSrc} alt="bg" className="security__card__image" />
      <p>{title}</p>
      <button>Learn More</button>
    </div>
  );
}

export default function Security() {
  return (
    <div className="security">
      <Container fluid className="section">
        <Row className="security__row1">
          <Col
            sm={12}
            md={6}
            className="d-flex align-items-center justify-content-center sm-mb-5"
          >
            <img src="/secure.png" alt="guard" width={"300px"} />
          </Col>
          <Col sm={12} md={6} className="d-flex align-items-center">
            <div>
              <h1 className="h1 mb-5">
                Most <b>Secure</b> Crypto Wallet
              </h1>
              <p className="p mb-5">
                CryptoPay generates passwords and keys on your device, so only
                you have access to your accounts and data. You always choose
                what to share and what to keep private.CryptoPay makes it safe &
                easy for you to store, buy, send, receive, swap tokens and
                collect NFTs on the Solana blockchain.
              </p>

              <button className="butn butn--2">
                Learn More <GrFormNextLink />
              </button>
            </div>
          </Col>
        </Row>

        <Row className="security__row2">
          <Col sm={12} md={3} className="safety__card sm-mb-5">
            <Image src="/key.webp" width={80} height={80} />
            <h5>Non-Custodial</h5>
            <p className="p">
              We never have access to any of your data or funds. Ever
            </p>
          </Col>
          <Col sm={12} md={3} className="safety__card sm-mb-5">
            <Image src="/wallet.webp" width={80} height={80} />
            <h5>Ledger Support</h5>
            <p className="p">
              For additional security you can connect your hardware wallet.{" "}
            </p>
          </Col>
          <Col sm={12} md={3} className="safety__card sm-mb-5">
            <Image src="/lock.webp" width={80} height={80} />
            <h5>Privacy</h5>
            <p className="p">
              We never track any personal identifiable information, your account
              addresses, or asset balances.
            </p>
          </Col>
          <Col sm={12} md={3} className="safety__card sm-mb-5">
            <Image src="/biometric.webp" width={80} height={80} />
            <h5>Biometric authentication</h5>
            <p className="p">
              Protect your assets on the go with the convenience you expect.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
