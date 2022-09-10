import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AiOutlineScan } from "react-icons/ai";
import { MdGppGood } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import NavBar from "../components/common/NavBar";
import Tokens from "../components/Tokens";
import { GlobalContext } from "../context";
import { getCustomerWallet, sendToken } from "../utils";

export default function Pay() {
  const router = useRouter();
  const { address } = router.query;
  const { publicKey, balance, network, price } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [amountInSol, setAmountInSol] = useState(0);

  const payingTo = `0x${address?.slice(0, 6)}...${address?.slice(-4)}`;

  const sendTransaction = async () => {
    setLoading(true);
    const signer = getCustomerWallet();

    const transactionDetails = {
      fromPubKey: new PublicKey(publicKey),
      toPubKey: new PublicKey(address),
      amount: LAMPORTS_PER_SOL * amountInSol,
      signer,
      network,
    };

    sendToken(transactionDetails)
      .then((res) => {
        setLoading(false);
        router.push({
          pathname: "/payment-success",
          query: {
            amount: amountInSol,
            to: address,
            time: Date.now(),
          },
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="merchant wallet">
      <NavBar
        firstLink="/wallet"
        title="Make Payment"
        secondLink="/scan-qr"
        secondIcon={<AiOutlineScan className="icon" />}
      />

      <div className="merchant__enter-amount">
        <p>Amount in SOL {amountInSol.toFixed(6)}</p>
        <input
          type={"number"}
          placeholder="₹0"
          className="inp"
          onChange={(e) => {
            setAmountInSol(e.target.value / price);
          }}
        />
      </div>

      <p className="p text-center">
        Available Balance: {balance.toFixed(3)} SOL
      </p>
      <Tokens />

      <div className="s-pay">
        <p className="p mb-3">
          Paying to{" "}
          <a
            className="link"
            href={`https://explorer.solana.com/address/${address}?cluster=devnet`}
          >
            {payingTo}
          </a>
        </p>
        {loading ? (
          <button className="butn mx-auto butn--fill">
            <VscLoading className="icon loading" />
            Processing ..
          </button>
        ) : (
          <button
            className="butn butn--full butn--fill"
            onClick={sendTransaction}
          >
            <MdGppGood className="icon" />
            Send
          </button>
        )}
      </div>
    </div>
  );
}
