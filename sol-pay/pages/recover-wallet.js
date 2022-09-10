import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as Bip39 from "bip39";
const bs58 = require("bs58");
import { Keypair } from "@solana/web3.js";
import { GlobalContext } from "../context";
import { VscLoading } from "react-icons/vsc";
import { encryptData } from "../utils";

export default function RecoverWallet() {
  const router = useRouter();
  const pKey = Cookies.get("publicKey");
  const [phrase, setPhrase] = useState();
  const [loading, setLoading] = useState(false);
  const { setPublicKey } = useContext(GlobalContext);

  useEffect(() => {
    if (pKey) {
      router.push("/wallet");
    }
  }, [pKey, router]);

  const handleChange = (e) => {
    const mnemonic = e.target?.value.trim().toLowerCase();
    setPhrase(mnemonic);
  };

  const recoverWallet = async () => {
    setLoading(true);

    const seed = Bip39.mnemonicToSeedSync(phrase).slice(0, 32);

    // Import keypair from seed
    const keypair = Keypair.fromSeed(seed);

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

    setLoading(false);

    router.push("/wallet");
  };

  console.log(loading)

  return (
    <div className="intro wallet-setup">
      <div className="intro__title">
        <img src="/logo2.png" alt="logo" />

        <div>
          <h3 className="h3">Import wallet</h3>
          <p className="p">
            {`Enter your secret recovery phrase here to restore your wallet.`}
          </p>
        </div>
      </div>

      <textarea
        className="textarea inp"
        placeholder="Enter your secret recovery"
        rows={"5"}
        onChange={handleChange}
      />

      <div className="butns">
        {loading ? (
          <button className="butn">
            <VscLoading className="loading icon" /> Recovering...
          </button>
        ) : (
          <button className="butn butn--full" onClick={recoverWallet}>
            Recover Wallet
          </button>
        )}
      </div>
    </div>
  );
}
