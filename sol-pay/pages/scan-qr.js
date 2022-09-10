import { parseURL } from "@solana/pay";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("modern-react-qr-reader"), {
  ssr: false,
});
import { FiRotateCcw } from "react-icons/fi";
import { parseCustomUrl } from "../utils";

export default function ScanQr() {
  const [facingMode, setFacingMode] = useState("environment");

  const router = useRouter();

  const readCode = (url) => {
    const address = parseCustomUrl(url);
    router.push(`/pay?address=${address}`);
  };

  const changeCam = () => {
    if (facingMode === "environment") {
      setFacingMode("user");
    } else {
      setFacingMode("environment");
    }
  };

  return (
    <div className="wallet qr-code">
      <nav className="nav">
        <Link href="/wallet">
          <div className="back">
            <MdArrowBackIos className="icon" /> Cancel
          </div>
        </Link>

        <h3>Scan Code</h3>

        <div className="network" onClick={changeCam}>
          <FiRotateCcw className="icon" />
        </div>
      </nav>

      {typeof window !== "undefined" && (
        <QrReader
          delay={500}
          onScan={(res) => {
            console.log(res);
            if (res) {
              readCode(res);
            }
          }}
          onError={(err) => console.log(err)}
          facingMode={facingMode}
          className="qr-code-cam"
        />
      )}
    </div>
  );
}
