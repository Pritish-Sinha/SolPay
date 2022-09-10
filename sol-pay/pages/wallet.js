import React, { useContext, useEffect, useState } from "react";
import { BsMenuApp, BsCreditCard2Back } from "react-icons/bs";
import { ImArrowDownLeft2, ImArrowUpRight2 } from "react-icons/im";
import { AiOutlineLoading, AiOutlineScan } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { FaParachuteBox } from "react-icons/fa";
import HomeTab from "../components/HomeTab";
import { MdHistory } from "react-icons/md";
import { GlobalContext } from "../context";
import { handleAirdrop, updateBalance } from "../utils";
import { BiCopy } from "react-icons/bi";
import { useRouter } from "next/router";
import withAuth from "../HOC/withAuth";
import Menu from "../components/Menu";
import Link from "next/link";

function Wallet() {
  const { publicKey, balance, setBalance, network, price } =
    useContext(GlobalContext);
  const [airdropLoading, setAirdropLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const walletAddress = `0x${publicKey?.slice(0, 6)}...${publicKey?.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Address Copied to clipboard");
  };

  const airdrop = async () => {
    setAirdropLoading(true);
    const res = await handleAirdrop(network, publicKey);

    if (typeof res === "number") {
      setBalance(res);
    }

    setAirdropLoading(false);

    console.log(res);
  };

  useEffect(() => {
    updateBalance(network, publicKey)
      .then((res) => setBalance(res))
      .catch((err) => console.log(err));
  }, [balance, setBalance]);

  return (
    <div className="wallet">
      <Toaster position="bottom-center" reverseOrder={false} />

      {menuOpen && (
        <div className="navigation__menu">
          <div className="navigation__menu__content">
            <Menu />
          </div>
          <div
            className="navigation__menu__close"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}

      <nav className="nav">
        <div className="menu" onClick={() => setMenuOpen(true)}>
          <BsMenuApp className="icon" />
        </div>

        <h4>Wallet</h4>

        {/* <div className="network">
          <select className="section">
            <option>Devnet</option>
            <option>Testnet</option>
            <option>Mainnet</option>
          </select>
        </div> */}
        <Link href="/history">
          <MdHistory className="icon" />
        </Link>
      </nav>

      <div className="wallet__profile">
        <div className="wallet__profile-img">
          <img src="/profile.png" alt="profile" />
        </div>
        <div>
          <h3 className="h3 mb-3">Account 1</h3>
          <p className="p balance mb-3">
            ₹ {(price * balance).toFixed(2)}
          </p>
          <span className="address" onClick={copyAddress}>
            {walletAddress + "  -"} <BiCopy />
          </span>
        </div>

        <div className="btns">
          <Link href="/merchant/show-qr">
            <div>
              <span className="b">
                <ImArrowDownLeft2 />
              </span>
              <p className="p">Receive</p>
            </div>
          </Link>
          <div>
            <span className="b">
              <BsCreditCard2Back />
            </span>
            <p className="p">Buy</p>
          </div>
          <Link href="/send-token">
            <div>
              <span className="b">
                <ImArrowUpRight2 />
              </span>
              <p className="p">Send</p>
            </div>
          </Link>
          <div>
            <span className="b" onClick={airdrop}>
              {airdropLoading ? (
                <AiOutlineLoading className="loading" />
              ) : (
                <FaParachuteBox />
              )}
            </span>
            <p className="p">Airdrop</p>
          </div>
        </div>
      </div>

      <HomeTab />

      <div className="s-pay">
        <Link href="/scan-qr">
          <button className="butn butn--fill mx-auto">
            <AiOutlineScan className="icon" /> Scan and Pay
          </button>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(Wallet);
