import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GrFormNextLink } from "react-icons/gr";

function Card({ bgSrc, title }) {
  return (
    <div className="services__card">
      <div className="services__card__img-box">
        <img src={bgSrc} alt="bg" />
      </div>
      <p>{title}</p>
      <button className="butn butn--2">
        Learn More <GrFormNextLink />
      </button>
    </div>
  );
}

export default function Services() {
  return (
    <div className="services">
      <Container fluid className="section">
        <Row>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/human-hand-inserting-coin-piggybank_23-2147919267.jpg?w=1380"
              }
              title={"Earn Upto 17% Anuual intrest on your Crypto"}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/bitcoin-top-laptop-flat-lay_23-2148285311.jpg?w=1380"
              }
              title={"Borrow instantly Cryptocurrencies"}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-vector/business-candle-stick-graph-chart-stock-market_41981-1435.jpg?w=1380"
              }
              title={"Trade with your Crypto and Earn passive Income"}
            />
          </Col>

          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://nexo.io/media/pages/home/2b69e64c60-1645098285/banner-exchange-cashback.png"
              }
              title={"Buy, Sell, Swap & Earn up to 0.5% Cashback"}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://nexo.io/media/pages/home/dce956fce0-1645098285/banner-dynamic-interest.png"
              }
              title={"Borrow Against Your Crypto at Just 0% APR "}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/closeup-young-lady-use-cellphone-order-online-shopping-product-pay-bills-with-credit-card-living-room-interior-house_7861-3274.jpg?w=1480"
              }
              title={"Recharge your phone using CryptoPay wallet"}
            />
          </Col>

          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/businessman-successfully-transfered-money-by-online-banking-mobile-application_8087-3272.jpg?w=1380"
              }
              title={"Pay your rent and bills in few click with Crypto"}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/electric-pole-foggy-day_181624-21632.jpg?w=1380"
              }
              title={"Pay your electricity bill using Crypto with ease"}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/wide-angle-shot-white-satellite-dishes-roof-building_181624-11451.jpg?w=1380"
              }
              title={"Recharge your DTH using Crypto with ease"}
            />
          </Col>

          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-psd/grand-opening-event-ticket-mockup_439185-2.jpg?w=1060"
              }
              title={"Book Any types of tickets using crypto"}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/front-view-young-female-going-hiking-holding-ticket-white-background-trip-tourist-vacation-flight-air-mountain-forest_179666-39199.jpg?w=1380"
              }
              title={"Borrow Flight Ticket using your crypto assets"}
            />
          </Col>
          <Col sm={12} md={4}>
            <Card
              bgSrc={
                "https://img.freepik.com/free-photo/man-showing-illuminated-stock-exchange-cryptocurrency-candlestick-graph-his-hand-close-up-money-saving-investment-stock-cryptocurrency-wealth_120378-2124.jpg?w=1380"
              }
              title={"Invest in crypt with ease and Earn"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
