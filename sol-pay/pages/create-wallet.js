import * as Bip39 from "bip39";
import React, { useContext, useState } from "react";
import { Keypair } from "@solana/web3.js";
import { GlobalContext } from "../context";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { encryptData } from "../utils";
const bs58 = require("bs58");
import Cookies from "js-cookie";

export default function CreateWallet() {
  const router = useRouter();
  const [phrase, setPhrase] = useState();
  const [copy, setCopy] = useState("Copy Phrase");
  const { setPublicKey } = useContext(GlobalContext);

  const generatePhrase = () => {
    // Generating mnemonic phrase
    const generatedMnemonic = Bip39.generateMnemonic();

    setPhrase(generatedMnemonic);
  };

  const createAccount = () => {
    // toast.loading("Creating Account..");
    // convert the mnemonic to seed bytes and making sure it is of 32-bytes
    const seed = Bip39.mnemonicToSeedSync(phrase).slice(0, 32); // return Uint8Array(32)

    // Generate new Keypair from seed ( new account )
    const keypair = Keypair.fromSeed(seed); // return keypair
    console.log("keypair", keypair);

    // Wallet Public key
    const pKey = bs58.encode(keypair.secretKey.slice(32));

    // setting public key as a cookies & state
    setPublicKey(pKey);
    Cookies.set("publicKey", pKey);

    // Wallet Private Key
    // const sKey = bs58.encode(keypair.secretKey);
    const sKey = keypair.secretKey;
    console.log(sKey);

    // encrypt private key
    const epKey = encryptData(sKey);
    console.log("epKey", epKey);

    // setting public key as a cookies
    Cookies.set("PrivateKey", epKey);

    router.push("/wallet");
  };

  const copyPhrase = () => {
    navigator.clipboard.writeText(phrase);
    toast.success("Phrase copied to clipboard");
  };

  return (
    <div className="intro create-wallet">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="intro__title">
        <img src="/logo2.png" alt="logo" />

        {!phrase ? (
          <div>
            <h3 className="h3">Create wallet</h3>
            <p className="p">
              {`Don't risk losing your funds. Protect your wallet by saving your
              Secret Recovery Phrase in a place you trust. It's the only way to
              recover your wallet if you get locked out of the app or get a new
              device.`}
            </p>
          </div>
        ) : (
          <div>
            <h3 className="h3">Secure your wallet</h3>
            <p className="p">
              Once you have stored this phrase somewhere safe, click finish to
              go to your wallet.
            </p>
          </div>
        )}
      </div>

      {phrase ? (
        <div className="secret-phrase-box">{phrase}</div>
      ) : (
        <img src="/banner2.png" alt="intro" />
      )}

      <div className="butns">
        {phrase && (
          <button className="butn butn--full" onClick={copyPhrase}>
            {copy}
          </button>
        )}

        {!phrase ? (
          <button className="butn butn--fill butn--full" onClick={generatePhrase}>
            Generate Phrase
          </button>
        ) : (
          <button className="butn butn--fill butn--full" onClick={createAccount}>
            Create Wallet
          </button>
        )}
      </div>
    </div>
  );
}
