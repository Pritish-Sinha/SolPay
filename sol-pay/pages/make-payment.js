import { parseURL } from "@solana/pay";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineScan } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { MdArrowBackIos, MdGppGood } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { GlobalContext } from "../context";
import { getCustomerWallet, handleTransaction, updateBalance } from "../utils";

export default function MakePayment() {
  const { publicKey, balance, network } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [defUrl, setDefUrl] = useState(
    "solana:mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN?amount=0.01&reference=82ZJ7nbGpixjeDCmEhUcmwXYfvurzAgGdtSMuHnUgyny&label=Michael&message=Thanks%20for%20all%20the%20fish&memo=OrderId5678"
  );

  const { recipient, memo, amount, reference, label, message } =
    parseURL(defUrl);

  useEffect(() => {
    const url = localStorage.getItem("url");
    setDefUrl(url);
    console.log("url", url);
  }, []);

  const confirmTransaction = () => {
    setLoading(true);
    const signer = getCustomerWallet();

    const transactionDetails = {
      recipient,
      memo,
      amount,
      reference,
      signer,
      network,
      publicKey,
    };

    handleTransaction(transactionDetails)
      .then((res) => {
        setPaymentConfirm(true);
        console.log(res);
        localStorage.removeItem("url");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (paymentConfirm)
    (async () => {
      await updateBalance(network, publicKey);
    })();

  const copyAddress = () => {
    navigator.clipboard.writeText(merchantWalletAddress);
    toast.success("Address Copied to clipboard");
  };

  const merchantWalletAddress = `0x${recipient
    ?.toString()
    .slice(0, 6)}...${recipient?.toString().slice(-4)}`;

  return (
    <div className="wallet make-payment">
      <Toaster position="bottom-center" reverseOrder={false} />
      <nav className="nav">
        <Link href="/wallet">
          <div className="back">
            <MdArrowBackIos className="icon" /> Back
          </div>
        </Link>

        <h3>Confirm Transaction</h3>

        <Link href="/merchant/show-qr">
          <div className="network">
            <AiOutlineScan className="icon" />
          </div>
        </Link>
      </nav>

      <div className="make-payment__details">
        <div>
          <h1 className="h1">{label}</h1>
          <p>{message}</p>
          <h2 className="h2">{amount?.toNumber()} SOL</h2>
          <span className="address" onClick={copyAddress}>
            {merchantWalletAddress + "  -"} <BiCopy />
          </span>
          <p>{memo}</p>
        </div>
        <h3>In your wallet: {balance}</h3>
        {loading ? (
          <button className="btn" onClick={confirmTransaction}>
            <VscLoading className="icon loading" />
            Processing ..
          </button>
        ) : (
          <button className="btn" onClick={confirmTransaction}>
            <MdGppGood className="icon" />
            Confirm
          </button>
        )}
      </div>
    </div>
  );
}
