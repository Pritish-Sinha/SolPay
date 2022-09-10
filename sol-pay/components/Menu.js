import React, { useContext } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import { IoWalletOutline } from "react-icons/io5";
import { RiHistoryLine, RiStore2Line } from "react-icons/ri";
import { GiShare } from "react-icons/gi";
import { MdTravelExplore } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FiArrowUpRight, FiArrowDownLeft, FiSettings } from "react-icons/fi";
import { GlobalContext } from "../context";
import { useRouter } from "next/router";

export default function Menu() {
  const { publicKey } = useContext(GlobalContext);
  const router = useRouter();

  const logOut = () => {
    Cookies.remove("publicKey");
    Cookies.remove("PrivateKey");
    router.push("/");
  };

  return (
    <div className="menu hide-on-pc">
      <div className="menu__logo">
        <img src="/logo2.png" alt="logo" />
      </div>

      <div className="menu__butns px-3">
        <button className="butn butn--full">
          Send
          <FiArrowUpRight className="icon" />
        </button>
        <button className="butn butn--fill butn--full">
          Add Fund <FiArrowDownLeft className="icon" />
        </button>
      </div>

      <div className="menu__top">
        <Link href="/about">
          <a className="menu__link">
            <IoWalletOutline className="icon" /> Wallet
          </a>
        </Link>
        <Link href="/history">
          <a className="menu__link">
            <RiHistoryLine className="icon" /> Transaction History
          </a>
        </Link>
        <Link href="/services">
          <a className="menu__link">
            <GiShare className="icon" /> Share my Public Address
          </a>
        </Link>
        <Link
          href={`https://explorer.solana.com/address/${publicKey}?cluster=devnet`}
        >
          <a className="menu__link" target={"_blank"}>
            <MdTravelExplore className="icon" /> View on solana explorer
          </a>
        </Link>
        <Link href="/merchant">
          <a className="menu__link">
            <RiStore2Line className="icon" /> Merchant
          </a>
        </Link>
        <div className="menu__link" onClick={logOut}>
          <HiOutlineLogout className="icon" /> Log Out
        </div>
        <Link href="/setting">
          <a className="menu__link">
            <FiSettings className="icon" /> Staking
          </a>
        </Link>
        {/* <Link href="/setting">
          <a className="menu__link">
            <FiSettings className="icon" /> Setting
          </a>
        </Link> */}
      </div>
    </div>
  );
}
