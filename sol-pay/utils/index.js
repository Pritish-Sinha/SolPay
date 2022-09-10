import { createTransaction } from "@solana/pay";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import Cookies from "js-cookie";
const CryptoJS = require("crypto-js");

export const updateBalance = async (network, publicKey) => {
  if (!publicKey) return;

  try {
    // Connect to the blockchain
    const connection = new Connection(clusterApiUrl(network), "confirmed");

    const myAddress = new PublicKey(publicKey);

    // get balance
    const balance = await connection.getBalance(myAddress);

    return balance / LAMPORTS_PER_SOL;
  } catch (err) {
    console.log("Balance is not updated", err.message);
  }
};

export const handleTransaction = async (transactionDetails) => {
  const { recipient, memo, amount, reference, signer, network, publicKey } =
    transactionDetails;

  const connection = new Connection(clusterApiUrl(network), "confirmed");

  const tx = await createTransaction(
    connection,
    new PublicKey(publicKey),
    recipient,
    amount,
    {
      reference,
      memo,
    }
  );

  return sendAndConfirmTransaction(connection, tx, [signer]);
};

export const handleAirdrop = async (network, publicKey) => {
  if (!publicKey) return;

  try {
    // Connect to the blockchain
    const connection = new Connection(clusterApiUrl(network), "confirmed");

    const myAddress = new PublicKey(publicKey);

    // Request for airdrop
    const confirmation = await connection.requestAirdrop(
      myAddress,
      LAMPORTS_PER_SOL
    );

    // confirm the transaction
    const result = await connection.confirmTransaction(
      confirmation,
      "confirmed"
    );

    return await updateBalance(network, publicKey);
  } catch (err) {
    console.log("AirDrop failed: ", err.message);
  }
};

export const sendToken = async (transactionDetails) => {
  const { fromPubKey, toPubKey, amount, signer, network } = transactionDetails;

  const connection = new Connection(clusterApiUrl(network), "confirmed");

  const instructions = SystemProgram.transfer({
    fromPubkey: fromPubKey,
    toPubkey: toPubKey,
    lamports: amount,
  });

  const transaction = new Transaction().add(instructions);

  const confirmation = await sendAndConfirmTransaction(
    connection,
    transaction,
    [signer]
  );

  await updateBalance(network, fromPubKey);

  return confirmation;
};

export const paymentHistory = async (publickey, network) => {
  if (!publickey) return;

  const connection = new Connection(clusterApiUrl(network), "confirmed");

  const transSignatures = await connection.getConfirmedSignaturesForAddress2(
    new PublicKey(publickey)
  );

  console.log(transSignatures);

  const transactions = [];

  for (let i = 0; i < transSignatures.length; i++) {
    const signature = transSignatures[i].signature;

    const customTransaction = {
      signature,
    };

    const confirmedTransaction = await connection.getConfirmedTransaction(
      signature
    );

    if (confirmedTransaction) {
      const { meta, transaction } = confirmedTransaction;

      customTransaction.feeAmount =
        confirmedTransaction?.meta?.fee / LAMPORTS_PER_SOL;
      customTransaction.amount =
        (meta.preBalances[0] - meta.postBalances[0]) / LAMPORTS_PER_SOL;
      customTransaction.sender =
        transaction.instructions[0].keys[0].pubkey.toBase58();
      customTransaction.senderBalance =
        meta?.postBalances[0] / LAMPORTS_PER_SOL;
      customTransaction.receiver =
        transaction.instructions[0].keys[1].pubkey.toBase58();
      customTransaction.receiverBalance =
        meta?.postBalances[1] / LAMPORTS_PER_SOL;

      customTransaction.transactionType =
        publickey === transaction.instructions[0].keys[0].pubkey.toBase58()
          ? "debit"
          : "credit";

      transactions.push(customTransaction);
    }
  }

  return transactions;
};

export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "my-secret-key-@123"
  ).toString();

  return encryptedData;
};

export const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, "my-secret-key-@123");

  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedData;
};

export const getCustomerWallet = () => {
  const esKey = Cookies.get("PrivateKey");

  const sKey = decryptData(esKey);

  const secKeyArray = Object.values(JSON.parse(sKey));

  const customerWallet = Keypair.fromSecretKey(Uint8Array.from(secKeyArray));

  return customerWallet;
};

export const parseCustomUrl = (url) => {
  const address = url?.split("?")[1].split("=")[1];
  return address;
};
