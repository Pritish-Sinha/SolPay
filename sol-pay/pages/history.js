import React, { useContext, useEffect, useState } from "react";
import { IoQrCodeOutline } from "react-icons/io5";
import History from "../components/common/History";
import NavBar from "../components/common/NavBar";
import { GlobalContext } from "../context";
import { paymentHistory } from "../utils";

export default function HistoryPage() {
  return (
    <div className="history wallet">
      <NavBar
        firstLink="/wallet"
        title="Payment History"
        secondLink="/merchant/show-qr"
        secondIcon={<IoQrCodeOutline className="icon" />}
      />

      <History />
    </div>
  );
}
