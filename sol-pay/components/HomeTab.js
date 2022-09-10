import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import Nfts from "./Nfts";
import Tokens from "./Tokens";

export default function HomeTab() {
  return (
    <div className="tab">
      <Tabs
        defaultActiveKey="token"
        id="uncontrolled-tab-example"
        className="home-tab"
      >
        <Tab eventKey="token" title="Tokens">
          <Tokens />
        </Tab>
        <Tab eventKey="nft" title="NFT's">
          <Nfts />
        </Tab>
      </Tabs>
    </div>
  );
}
