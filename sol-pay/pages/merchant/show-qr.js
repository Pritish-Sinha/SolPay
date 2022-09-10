import { encodeURL } from "@solana/pay";
import { Keypair, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { GiShare } from "react-icons/gi";
import { MdArrowBackIos } from "react-icons/md";
import { QRCode } from "react-qrcode-logo";
import NavBar from "../../components/common/NavBar";
import PoweredBy from "../../components/PoweredBy";
import { GlobalContext } from "../../context";
import withAuth from "../../HOC/withAuth";

function ShowQr() {
  const [url, setUrl] = useState("Hello");

  useEffect(() => {
    const publicKey = Cookies.get("publicKey");
    const urlData = `https://cpay.vercel.app/pay?address=${publicKey}`;
    setUrl(urlData);
  }, []);

  return (
    <div className="show-qr merchant-qr merchant wallet">

      <NavBar
        firstLink="/merchant"
        title="Krishna Store"
        secondLink="/merchant/show-qr"
        secondIcon={ <GiShare className="icon" />}
      />

      <div className="merchant-qr__qr-box">
        <div>
          <h3 className="h3">My Qr-Code</h3>
        </div>

        <div className="qr-code">
          <QRCode
            value={url}
            size={300}
            qrStyle={"dots"}
            eyeRadius={10}
            logoImage={"/icon.png"}
            logoOpacity={0.8}
            fgColor={"#333333"}
          />
          <PoweredBy />
        </div>

        <p>Scan this code with your CryptoPay Wallet</p>
      </div>
    </div>
  );
}

export default withAuth(ShowQr);
