import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Intro() {

  return (
    <div className="intro">
      <div className="intro__title">
        <img src="/logo2.png" alt="logo" />
        <h3 className="h3">Welcome to SolPay</h3>
        <p className="p">
          Trusted by people, SolPay is a secure wallet makeing the
          Decentralised payments accessible to all.
        </p>
      </div>

      <img src="/banner2.png" alt="intro" style="max-width: 10%;" />

      <Link href="/wallet-setup">
        <button className="butn butn--full">Get Started</button>
      </Link>
    </div>
  );
}
