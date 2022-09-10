import { createContext, useContext, useEffect, useState } from "react";
import { PriceGetter } from "crypto-price-getter";
import Cookies from "js-cookie";
import { updateBalance } from "../utils";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [network, setNetwork] = useState("devnet");
  // User account state
  const [publicKey, setPublicKey] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const [balance, setBalance] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const pKey = Cookies.get("publicKey");
    console.log("global pkey", pKey);
    if (pKey) {
      setPublicKey(pKey);
      (async () => {
        try {
          // Connect to the blockchain
          const connection = new Connection(
            clusterApiUrl(network),
            "confirmed"
          );

          const myAddress = new PublicKey(pKey);

          // get balance
          const bal = await connection.getBalance(myAddress);

          const balInSol = bal / LAMPORTS_PER_SOL;

          setBalance(balInSol);
        } catch (err) {
          console.log("Balance is not updated", err.message);
        }
      })();
    }
  }, []);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=inr",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setPrice(data.solana.inr))
      .catch((err) => console.log(err));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        network,
        setNetwork,
        walletAddress,
        setWalletAddress,
        balance,
        setBalance,
        price,
        publicKey,
        setPublicKey,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
