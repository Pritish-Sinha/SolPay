import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoQrCodeOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import NavBar from "../../components/common/NavBar";
import MerchantTab from "../../components/MerchantTab";
import PoweredBy from "../../components/PoweredBy";
import withAuth from "../../HOC/withAuth";

function Merchant() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);

  const generateCode = () => {
    router.push({
      pathname: "/merchant/generate-qr",
      query: {
        requestAmount: amount,
      },
    });
  };

  return (
    <div className="merchant wallet">
      <NavBar
        firstLink="/wallet"
        title="Krishna Store"
        secondLink="/merchant/show-qr"
        secondIcon={<IoQrCodeOutline className="icon" />}
      />

      <div className="merchant__enter-amount">
        <p>Enter bill amount in SOL</p>
        <input
          type={"number"}
          placeholder="0"
          className="inp"
          onChange={(e) => setAmount(e.target.value)}
        />
        <PoweredBy />
      </div>

      <MerchantTab />

      <div className="s-pay">
        <button className="butn butn--fill mx-auto" onClick={generateCode}>
          <IoQrCodeOutline className="icon" /> Generate Payment Code{" "}
        </button>
      </div>
    </div>
  );
}

export default withAuth(Merchant);
