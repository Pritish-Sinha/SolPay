import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import toast, { Toaster } from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import Link from "next/link";
import {
  encodeURL,
  findTransactionSignature,
  FindTransactionSignatureError,
  validateTransactionSignature,
} from "@solana/pay";
import { QRCode } from "react-qrcode-logo";
import withAuth from "../../HOC/withAuth";
import { useRouter } from "next/router";
import NavBar from "../../components/common/NavBar";

function MerchantQr() {
  const [paymentStatus, setPaymentStatus] = useState();
  const [url, setUrl] = useState("Hello");

  const router = useRouter();
  const { requestAmount } = router.query;

  // console.log(requestAmount)

  const initiatePayment = async () => {
    // Step 1:- Connecting to the network
    toast.success("Network Connected");
    console.log("1. ✅ Establish connection to the network");
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Step 2:- Simulating a customer checkout
    console.log("2. 🛍 Simulate a customer checkout \n");
    const recipient = new PublicKey(
      "4Swbos81KdH2HcAaZccXBWEk8aDWcARXyFmji4m2vsww"
    );
    const amount = new BigNumber(amount);
    const reference = new Keypair().publicKey;
    const label = "Krishna Store";
    const message = "General store - all you need";
    const memo = "INV#10001";

    // Step 3:- Create a payment request link
    console.log("3. 💰 Create a payment request link \n");
    const url = encodeURL({
      recipient,
      amount,
      reference,
      label,
      message,
      memo,
    });
    setUrl(url);

    // Step 4:- Check for payment status
    console.log("4. 🔐 Simulate wallet interaction \n");
    // simulateWalletInteraction(connection, url);
    setPaymentStatus("Pending..");

    console.log("\n5. Find the transaction");
    let signatureInfo;
    const { signature } = await new Promise((resolve, reject) => {
      // Recheck payment status until conformed
      const interval = setInterval(async () => {
        // toast.loading("Checking for transaction...");
        console.count("Checking for transaction...");
        try {
          signatureInfo = await findTransactionSignature(
            connection,
            reference,
            undefined,
            "confirmed"
          );
          toast.success("Signature Found!");
          clearInterval(interval);
          resolve(signatureInfo);
        } catch (error) {
          if (!(error instanceof FindTransactionSignatureError)) {
            console.log(error);
            clearInterval(interval);
            reject(error);
          }
        }
      });
    }, 1000);

    setPaymentStatus("Transaction Confirmed");
    // Step 6:- Validating Transaction
    console.log("\n6. 🔗 Validate transaction \n");
    try {
      await validateTransactionSignature(
        connection,
        signature,
        MERCHANT_WALLET,
        amount,
        undefined,
        reference
      );
      setPaymentStatus("Transaction Validated");
      toast.success("Ship orer to Customer");
    } catch (err) {
      console.log("Payment failed", err);
    }
  };

  async function main() {
    // Connecting to devnet for this example
    console.log("1. ✅ Establish connection to the network");
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log(connection, "connection");

    console.log("2. 🛍 Simulate a customer checkout \n");

    const recipient = new PublicKey(
      "4Swbos81KdH2HcAaZccXBWEk8aDWcARXyFmji4m2vsww"
    );

    console.log("requestAmount", requestAmount);
    const amount = new BigNumber(requestAmount);
    const reference = new Keypair().publicKey;
    const label = "Krishna Store";
    const message = "General store - all you need";
    const memo = "JC#4098";

    console.log("3. 💰 Create a payment request link \n");
    const url = encodeURL({
      recipient,
      amount,
      reference,
      label,
      message,
      memo,
    });

    console.log("url", url);
    setUrl(url);

    console.log("4. 🔐 Simulate wallet interaction \n");
    // simulateWalletInteraction(connection, url);
    // Update payment status
    setPaymentStatus("pending");

    console.log("\n5. Find the transaction");
    let signatureInfo;

    const { signature } = await new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        console.count("Checking for transaction...");
        try {
          signatureInfo = await findTransactionSignature(
            connection,
            reference,
            undefined,
            "confirmed"
          );
          console.log("\n 🖌  Signature found: ", signatureInfo.signature);
          clearInterval(interval);
          resolve(signatureInfo);
        } catch (error) {
          if (!(error instanceof FindTransactionSignatureError)) {
            console.error(error);
            clearInterval(interval);
            reject(error);
          }
        }
      }, 1000);
    });

    // Update payment status
    setPaymentStatus("confirmed");

    console.log("\n6. 🔗 Validate transaction \n");

    try {
      await validateTransactionSignature(
        connection,
        signature,
        MERCHANT_WALLET,
        amount,
        undefined,
        reference
      );

      // Update payment status
      setPaymentStatus("validated");
      console.log("✅ Payment validated");
      console.log("📦 Ship order to customer");
    } catch (error) {
      console.error("❌ Payment failed", error);
    }
  }

  useEffect(() => {
    if (requestAmount) main();
  }, []);

  return (
    <div className="merchant-qr wallet">
     

      <NavBar
        firstLink="/merchant"
        title="Krishna Store"
        secondLink="/merchant/generate-qr"
        secondIcon={<VscLoading className="loading icon" />}
      />

      <div className="merchant-qr__qr-box">
        <div>
          <h1 className="h1">{requestAmount}</h1>
          <h3 className="h3">SOL</h3>
        </div>

        <div className="merchant-qr__qr-code">
          <QRCode
            value={url}
            size={300}
            qrStyle={"dots"}
            eyeRadius={10}
            logoImage={"/icon.png"}
            logoOpacity={0.8}
            fgColor={"#333333"}
          />
        </div>

        <p>
          <b>Scan this code with your CryptoPay Wallet</b>
          <br />
          {` You'll be asked to approve the transaction`}
          <p className="status">{paymentStatus}</p>
        </p>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default withAuth(MerchantQr);
