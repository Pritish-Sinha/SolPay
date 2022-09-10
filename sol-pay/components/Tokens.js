import axios from "axios";
import React, { useContext } from "react";
import { GlobalContext } from "../context";

function Card(props) {
  return (
    <div className="token-card">
      <img src={props.logoSrc} alt="crypto" />

      <div className="token-card__name">
        <h3 className="h3">{props.coinName}</h3>
        <p>
          {props.balance} {props.symbol}
        </p>
      </div>

      <p>₹ {props.price}</p>
    </div>
  );
}

export default function Tokens() {
  const { balance, price } = useContext(GlobalContext);

  return (
    <div className="tokens">
      <Card
        logoSrc="https://tradingplatforms.com/wp-content/uploads/2021/11/solana_logo.png"
        coinName="Solana"
        balance={balance?.toFixed(3)}
        symbol="SOL"
        price={price}
      />
    </div>
  );
}
