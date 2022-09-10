import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import { GlobalContext } from "../context";

export default function PaymentSuccess() {
  const router = useRouter();
  const { amount, to, time } = router.query;
  const {  price } = useContext(GlobalContext);

  const toAddress = `0x${to?.slice(0, 6)}...${to?.slice(-4)}`;

  return (
    <div className="payment-success">
      <div className="payment-success__icon-box">
        <div>
          <img src="/success.png" className="icon mb-5" />
          <h4 className="mb-3 h4">Transaction Successful</h4>
          <h1 className="h1">₹ {(amount * price).toFixed(0)}</h1>
          <p>
            Paid to {" "}
            <a
                className="link"
              href={`https://explorer.solana.com/address/${to}?cluster=devnet`}
            >
              {toAddress}
            </a>{" "}
            at {time}
          </p>
        </div>
      </div>

      <Link href="/wallet">
        <button className="butn butn--fill">
          <IoChevronBack className="icon" />
          Back to Home
        </button>
      </Link>
    </div>
  );
}
