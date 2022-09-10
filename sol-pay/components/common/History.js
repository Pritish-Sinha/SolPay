import React, { useContext, useEffect, useState } from "react";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { VscLoading } from "react-icons/vsc";
import { GlobalContext } from "../../context";
import { paymentHistory } from "../../utils";

const Card = ({
  signature,
  key,
  amount,
  transactionType,
  sender,
  receiver,
}) => {
  const senderAddress = `0x${sender?.slice(0, 6)}...${sender?.slice(-4)}`;
  const receiverAddress = `0x${receiver?.slice(0, 6)}...${receiver?.slice(-4)}`;

  return (
    <a
      key={key}
      href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
    >
      <div className="token-card history__card">
        <div className="history__card__box">
          {transactionType === "credit" ? (
            <FiArrowDownLeft className="icon" />
          ) : (
            <FiArrowUpRight className="icon" />
          )}
        </div>

        <div className="token-card__name">
          <h3 className="h3">
            {transactionType === "credit" ? "Received from" : "Send To"}
          </h3>
          <p className="p">
            {transactionType === "credit" ? senderAddress : receiverAddress}
          </p>
        </div>

        <p className="amount">
          ₹ {amount?.toFixed(2)}
        </p>
      </div>
    </a>
  );
};

export default function History() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { publicKey, network, price } = useContext(GlobalContext);

  const history = async () => {
    const res = await paymentHistory(publicKey, network);
    console.log(res);
    setLoading(false);
    setTransactions(res);
  };

  useEffect(() => {
    console.log("hi");
    (async () => {
      await history();
    })();
  }, [loading]);

  return (
    <div className="history">
      {loading && (
        <p className="text-center p-3">
          <VscLoading className="loading icon" />
          Loading..
        </p>
      )}

      {transactions?.map(
        ({
          feeAmount,
          amount,
          signature,
          sender,
          receiver,
          transactionType,
          key,
        }) => (
          <Card
            signature={signature}
            receiver={receiver}
            sender={sender}
            amount={(amount - feeAmount)*price}
            transactionType={transactionType}
            key={key}
          />
        )
      )}
    </div>
  );
}
